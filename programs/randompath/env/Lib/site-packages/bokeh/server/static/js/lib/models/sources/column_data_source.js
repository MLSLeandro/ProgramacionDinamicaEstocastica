import { ColumnarDataSource } from "./columnar_data_source";
import { HasProps } from "../../core/has_props";
import * as p from "../../core/properties";
import { Set } from "../../core/util/data_structures";
import { encode_column_data, decode_column_data } from "../../core/util/serialization";
import { isTypedArray, isArray, isNumber, isPlainObject } from "../../core/util/types";
import * as typed_array from "../../core/util/typed_array";
import { keys } from "../../core/util/object";
import { ColumnsPatchedEvent, ColumnsStreamedEvent } from "../../document/events";
//exported for testing
export function stream_to_column(col, new_col, rollover) {
    if (isArray(col)) {
        const result = col.concat(new_col);
        if (rollover != null && result.length > rollover)
            return result.slice(-rollover);
        else
            return result;
    }
    else if (isTypedArray(col)) {
        const total_len = col.length + new_col.length;
        // handle rollover case for typed arrays
        if (rollover != null && total_len > rollover) {
            const start = total_len - rollover;
            const end = col.length;
            // resize col if it is shorter than the rollover length
            let result;
            if (col.length < rollover) {
                result = new col.constructor(rollover);
                result.set(col, 0);
            }
            else
                result = col;
            // shift values in original col to accommodate new_col
            for (let i = start, endi = end; i < endi; i++) {
                result[i - start] = result[i];
            }
            // update end values in col with new_col
            for (let i = 0, endi = new_col.length; i < endi; i++) {
                result[i + (end - start)] = new_col[i];
            }
            return result;
        }
        else {
            const tmp = new col.constructor(new_col);
            return typed_array.concat(col, tmp);
        }
    }
    else
        throw new Error("unsupported array types");
}
// exported for testing
export function slice(ind, length) {
    let start, step, stop;
    if (isNumber(ind)) {
        start = ind;
        stop = ind + 1;
        step = 1;
    }
    else {
        start = ind.start != null ? ind.start : 0;
        stop = ind.stop != null ? ind.stop : length;
        step = ind.step != null ? ind.step : 1;
    }
    return [start, stop, step];
}
// exported for testing
export function patch_to_column(col, patch, shapes) {
    const patched = new Set();
    let patched_range = false;
    for (const [ind, val] of patch) {
        // make the single index case look like the length-3 multi-index case
        let item, shape;
        let index;
        let value;
        if (isArray(ind)) {
            const [i] = ind;
            patched.add(i);
            shape = shapes[i];
            item = col[i];
            value = val;
            // this is basically like NumPy's "newaxis", inserting an empty dimension
            // makes length 2 and 3 multi-index cases uniform, so that the same code
            // can handle both
            if (ind.length === 2) {
                shape = [1, shape[0]];
                index = [ind[0], 0, ind[1]];
            }
            else
                index = ind;
        }
        else {
            if (isNumber(ind)) {
                value = [val];
                patched.add(ind);
            }
            else {
                value = val;
                patched_range = true;
            }
            index = [0, 0, ind];
            shape = [1, col.length];
            item = col;
        }
        // now this one nested loop handles all cases
        let flat_index = 0;
        const [istart, istop, istep] = slice(index[1], shape[0]);
        const [jstart, jstop, jstep] = slice(index[2], shape[1]);
        for (let i = istart; i < istop; i += istep) {
            for (let j = jstart; j < jstop; j += jstep) {
                if (patched_range) {
                    patched.add(j);
                }
                item[(i * shape[1]) + j] = value[flat_index];
                flat_index++;
            }
        }
    }
    return patched;
}
export class ColumnDataSource extends ColumnarDataSource {
    constructor(attrs) {
        super(attrs);
    }
    static init_ColumnDataSource() {
        this.define({
            data: [p.Any, {}],
        });
    }
    initialize() {
        super.initialize();
        [this.data, this._shapes] = decode_column_data(this.data);
    }
    attributes_as_json(include_defaults = true, value_to_json = ColumnDataSource._value_to_json) {
        const attrs = {};
        const obj = this.serializable_attributes();
        for (const key of keys(obj)) {
            let value = obj[key];
            if (key === 'data')
                value = encode_column_data(value, this._shapes);
            if (include_defaults)
                attrs[key] = value;
            else if (key in this._set_after_defaults)
                attrs[key] = value;
        }
        return value_to_json("attributes", attrs, this);
    }
    static _value_to_json(key, value, optional_parent_object) {
        if (isPlainObject(value) && key === 'data')
            return encode_column_data(value, optional_parent_object._shapes); // XXX: unknown vs. any
        else
            return HasProps._value_to_json(key, value, optional_parent_object);
    }
    stream(new_data, rollover, setter_id) {
        const { data } = this;
        for (const k in new_data) {
            data[k] = stream_to_column(data[k], new_data[k], rollover);
        }
        this.setv({ data }, { silent: true });
        this.streaming.emit();
        if (this.document != null) {
            const hint = new ColumnsStreamedEvent(this.document, this.ref(), new_data, rollover);
            this.document._notify_change(this, 'data', null, null, { setter_id, hint });
        }
    }
    patch(patches, setter_id) {
        const { data } = this;
        let patched = new Set();
        for (const k in patches) {
            const patch = patches[k];
            patched = patched.union(patch_to_column(data[k], patch, this._shapes[k]));
        }
        this.setv({ data }, { silent: true });
        this.patching.emit(patched.values);
        if (this.document != null) {
            const hint = new ColumnsPatchedEvent(this.document, this.ref(), patches);
            this.document._notify_change(this, 'data', null, null, { setter_id, hint });
        }
    }
}
ColumnDataSource.__name__ = "ColumnDataSource";
ColumnDataSource.init_ColumnDataSource();
//# sourceMappingURL=column_data_source.js.map