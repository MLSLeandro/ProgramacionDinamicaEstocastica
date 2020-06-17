import { Signal0, Signal, Signalable } from "./signaling";
import * as enums from "./enums";
import { includes, repeat } from "./util/array";
import { map } from "./util/arrayable";
import { is_color } from "./util/color";
import { isBoolean, isNumber, isString, isArray, isPlainObject } from "./util/types";
import { settings } from "./settings";
// XXX: silence TS, because `Signal` appears in declarations due to Signalable
Signal; // lgtm [js/useless-expression]
function valueToString(value) {
    try {
        return JSON.stringify(value);
    }
    catch (_a) {
        return value.toString();
    }
}
export function isSpec(obj) {
    return isPlainObject(obj) &&
        ((obj.value === undefined ? 0 : 1) +
            (obj.field === undefined ? 0 : 1) +
            (obj.expr === undefined ? 0 : 1) == 1); // garbage JS XOR
}
export class Property extends Signalable() {
    constructor(obj, attr, default_value) {
        super();
        this.obj = obj;
        this.attr = attr;
        this.default_value = default_value;
        this.optional = false;
        this.change = new Signal0(this.obj, "change");
        this._init();
        this.connect(this.change, () => this._init());
    }
    update() {
        this._init();
    }
    // ----- customizable policies
    init() { }
    transform(values) {
        return values;
    }
    validate(value) {
        if (!this.valid(value))
            throw new Error(`${this.obj.type}.${this.attr} given invalid value: ${valueToString(value)}`);
    }
    valid(_value) {
        return true;
    }
    // ----- property accessors
    value(do_spec_transform = true) {
        if (this.spec.value === undefined)
            throw new Error("attempted to retrieve property value for property without value specification");
        let ret = this.transform([this.spec.value])[0];
        if (this.spec.transform != null && do_spec_transform)
            ret = this.spec.transform.compute(ret);
        return ret;
    }
    // ----- private methods
    /*protected*/ _init() {
        const obj = this.obj;
        const attr = this.attr;
        let attr_value = obj.getv(attr);
        if (attr_value === undefined) {
            const default_value = this.default_value;
            if (this._default_override != null)
                attr_value = this._default_override();
            else if (default_value !== undefined)
                attr_value = default_value(obj);
            else
                attr_value = null;
            obj.setv({ [attr]: attr_value }, { silent: true, defaults: true });
        }
        if (isArray(attr_value))
            this.spec = { value: attr_value };
        else if (isSpec(attr_value))
            this.spec = attr_value;
        else
            this.spec = { value: attr_value };
        //if (this.dataspec && this.spec.field != null && !isString(this.spec.field))
        //  throw new Error(`field value for property '${attr}' is not a string`)
        if (this.spec.value != null)
            this.validate(this.spec.value);
        this.init();
    }
    toString() {
        /*${this.name}*/
        return `Prop(${this.obj}.${this.attr}, spec: ${valueToString(this.spec)})`;
    }
}
Property.__name__ = "Property";
//
// Primitive Properties
//
export class Any extends Property {
}
Any.__name__ = "Any";
export class Array extends Property {
    valid(value) {
        return isArray(value) || value instanceof Float64Array;
    }
}
Array.__name__ = "Array";
export class Boolean extends Property {
    valid(value) {
        return isBoolean(value);
    }
}
Boolean.__name__ = "Boolean";
export class Color extends Property {
    valid(value) {
        return isString(value) && is_color(value);
    }
}
Color.__name__ = "Color";
export class Instance extends Property {
}
Instance.__name__ = "Instance";
export class Number extends Property {
    valid(value) {
        return isNumber(value);
    }
}
Number.__name__ = "Number";
export class Int extends Number {
    valid(value) {
        return isNumber(value) && (value | 0) == value;
    }
}
Int.__name__ = "Int";
export class Angle extends Number {
}
Angle.__name__ = "Angle";
export class Percent extends Number {
    valid(value) {
        return isNumber(value) && 0 <= value && value <= 1.0;
    }
}
Percent.__name__ = "Percent";
export class String extends Property {
    valid(value) {
        return isString(value);
    }
}
String.__name__ = "String";
export class FontSize extends String {
}
FontSize.__name__ = "FontSize";
export class Font extends String {
    constructor() {
        super(...arguments);
        this._default_override = settings.dev ? () => "Bokeh" : undefined;
    }
}
Font.__name__ = "Font";
//
// Enum properties
//
export class EnumProperty extends Property {
    valid(value) {
        return isString(value) && includes(this.enum_values, value);
    }
}
EnumProperty.__name__ = "EnumProperty";
export function Enum(values) {
    return class extends EnumProperty {
        get enum_values() {
            return values;
        }
    };
}
export class Direction extends EnumProperty {
    get enum_values() {
        return enums.Direction;
    }
    transform(values) {
        const result = new Uint8Array(values.length);
        for (let i = 0; i < values.length; i++) {
            switch (values[i]) {
                case "clock":
                    result[i] = 0;
                    break;
                case "anticlock":
                    result[i] = 1;
                    break;
            }
        }
        return result;
    }
}
Direction.__name__ = "Direction";
export const Anchor = Enum(enums.Anchor);
export const AngleUnits = Enum(enums.AngleUnits);
export const BoxOrigin = Enum(enums.BoxOrigin);
export const ButtonType = Enum(enums.ButtonType);
export const CalendarPosition = Enum(enums.CalendarPosition);
export const Dimension = Enum(enums.Dimension);
export const Dimensions = Enum(enums.Dimensions);
export const Distribution = Enum(enums.Distribution);
export const FontStyle = Enum(enums.FontStyle);
export const HatchPatternType = Enum(enums.HatchPatternType);
export const HTTPMethod = Enum(enums.HTTPMethod);
export const HexTileOrientation = Enum(enums.HexTileOrientation);
export const HoverMode = Enum(enums.HoverMode);
export const LatLon = Enum(enums.LatLon);
export const LegendClickPolicy = Enum(enums.LegendClickPolicy);
export const LegendLocation = Enum(enums.LegendLocation);
export const LineCap = Enum(enums.LineCap);
export const LineJoin = Enum(enums.LineJoin);
export const LinePolicy = Enum(enums.LinePolicy);
export const Location = Enum(enums.Location);
export const Logo = Enum(enums.Logo);
export const MarkerType = Enum(enums.MarkerType);
export const MutedPolicy = Enum(enums.MutedPolicy);
export const Orientation = Enum(enums.Orientation);
export const OutputBackend = Enum(enums.OutputBackend);
export const PaddingUnits = Enum(enums.PaddingUnits);
export const Place = Enum(enums.Place);
export const PointPolicy = Enum(enums.PointPolicy);
export const RadiusDimension = Enum(enums.RadiusDimension);
export const RenderLevel = Enum(enums.RenderLevel);
export const RenderMode = Enum(enums.RenderMode);
export const ResetPolicy = Enum(enums.ResetPolicy);
export const RoundingFunction = Enum(enums.RoundingFunction);
export const Side = Enum(enums.Side);
export const SizingMode = Enum(enums.SizingMode);
export const Sort = Enum(enums.Sort);
export const SpatialUnits = Enum(enums.SpatialUnits);
export const StartEnd = Enum(enums.StartEnd);
export const StepMode = Enum(enums.StepMode);
export const TapBehavior = Enum(enums.TapBehavior);
export const TextAlign = Enum(enums.TextAlign);
export const TextBaseline = Enum(enums.TextBaseline);
export const TextureRepetition = Enum(enums.TextureRepetition);
export const TickLabelOrientation = Enum(enums.TickLabelOrientation);
export const TooltipAttachment = Enum(enums.TooltipAttachment);
export const UpdateMode = Enum(enums.UpdateMode);
export const VerticalAlign = Enum(enums.VerticalAlign);
//
// DataSpec properties
//
export class ScalarSpec extends Property {
}
ScalarSpec.__name__ = "ScalarSpec";
export class VectorSpec extends Property {
    array(source) {
        let ret;
        if (this.spec.field != null) {
            ret = this.transform(source.get_column(this.spec.field));
            if (ret == null)
                throw new Error(`attempted to retrieve property array for nonexistent field '${this.spec.field}'`);
        }
        else if (this.spec.expr != null) {
            ret = this.transform(this.spec.expr.v_compute(source));
        }
        else {
            let length = source.get_length();
            if (length == null)
                length = 1;
            const value = this.value(false); // don't apply any spec transform
            ret = repeat(value, length);
        }
        if (this.spec.transform != null)
            ret = this.spec.transform.v_compute(ret);
        return ret;
    }
}
VectorSpec.__name__ = "VectorSpec";
export class DataSpec extends VectorSpec {
}
DataSpec.__name__ = "DataSpec";
export class UnitsSpec extends VectorSpec {
    init() {
        if (this.spec.units == null)
            this.spec.units = this.default_units;
        const units = this.spec.units;
        if (!includes(this.valid_units, units))
            throw new Error(`units must be one of ${this.valid_units.join(", ")}; got: ${units}`);
    }
    get units() {
        return this.spec.units;
    }
    set units(units) {
        this.spec.units = units;
    }
}
UnitsSpec.__name__ = "UnitsSpec";
export class AngleSpec extends UnitsSpec {
    get default_units() { return "rad"; }
    get valid_units() { return enums.AngleUnits; }
    transform(values) {
        if (this.spec.units == "deg")
            values = map(values, (x) => x * Math.PI / 180.0);
        values = map(values, (x) => -x);
        return super.transform(values);
    }
}
AngleSpec.__name__ = "AngleSpec";
export class BooleanSpec extends DataSpec {
}
BooleanSpec.__name__ = "BooleanSpec";
export class ColorSpec extends DataSpec {
}
ColorSpec.__name__ = "ColorSpec";
export class CoordinateSpec extends DataSpec {
}
CoordinateSpec.__name__ = "CoordinateSpec";
export class CoordinateSeqSpec extends DataSpec {
}
CoordinateSeqSpec.__name__ = "CoordinateSeqSpec";
export class DistanceSpec extends UnitsSpec {
    get default_units() { return "data"; }
    get valid_units() { return enums.SpatialUnits; }
}
DistanceSpec.__name__ = "DistanceSpec";
export class FontSizeSpec extends DataSpec {
}
FontSizeSpec.__name__ = "FontSizeSpec";
export class MarkerSpec extends DataSpec {
}
MarkerSpec.__name__ = "MarkerSpec";
export class NumberSpec extends DataSpec {
}
NumberSpec.__name__ = "NumberSpec";
export class StringSpec extends DataSpec {
}
StringSpec.__name__ = "StringSpec";
export class NullStringSpec extends DataSpec {
}
NullStringSpec.__name__ = "NullStringSpec";
//# sourceMappingURL=properties.js.map