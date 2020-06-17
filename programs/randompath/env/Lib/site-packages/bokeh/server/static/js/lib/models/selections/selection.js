import { Model } from "../../model";
import * as p from "../../core/properties";
import { union, intersection } from "../../core/util/array";
import { merge } from "../../core/util/object";
export class Selection extends Model {
    constructor(attrs) {
        super(attrs);
    }
    static init_Selection() {
        this.define({
            indices: [p.Array, []],
            line_indices: [p.Array, []],
            multiline_indices: [p.Any, {}],
        });
        this.internal({
            final: [p.Boolean],
            selected_glyphs: [p.Array, []],
            get_view: [p.Any],
            image_indices: [p.Array, []],
        });
    }
    initialize() {
        super.initialize();
        this.get_view = () => null;
    }
    get selected_glyph() {
        return this.selected_glyphs.length > 0 ? this.selected_glyphs[0] : null;
    }
    add_to_selected_glyphs(glyph) {
        this.selected_glyphs.push(glyph);
    }
    update(selection, final, append) {
        this.final = final;
        if (append)
            this.update_through_union(selection);
        else {
            this.indices = selection.indices;
            this.line_indices = selection.line_indices;
            this.selected_glyphs = selection.selected_glyphs;
            this.get_view = selection.get_view;
            this.multiline_indices = selection.multiline_indices;
            this.image_indices = selection.image_indices;
        }
    }
    clear() {
        this.final = true;
        this.indices = [];
        this.line_indices = [];
        this.multiline_indices = {};
        this.get_view = () => null;
        this.selected_glyphs = [];
    }
    is_empty() {
        return this.indices.length == 0 && this.line_indices.length == 0 && this.image_indices.length == 0;
    }
    update_through_union(other) {
        this.indices = union(other.indices, this.indices);
        this.selected_glyphs = union(other.selected_glyphs, this.selected_glyphs);
        this.line_indices = union(other.line_indices, this.line_indices);
        if (!this.get_view())
            this.get_view = other.get_view;
        this.multiline_indices = merge(other.multiline_indices, this.multiline_indices);
    }
    update_through_intersection(other) {
        this.indices = intersection(other.indices, this.indices);
        // TODO: think through and fix any logic below
        this.selected_glyphs = union(other.selected_glyphs, this.selected_glyphs);
        this.line_indices = union(other.line_indices, this.line_indices);
        if (!this.get_view())
            this.get_view = other.get_view;
        this.multiline_indices = merge(other.multiline_indices, this.multiline_indices);
    }
}
Selection.__name__ = "Selection";
Selection.init_Selection();
//# sourceMappingURL=selection.js.map