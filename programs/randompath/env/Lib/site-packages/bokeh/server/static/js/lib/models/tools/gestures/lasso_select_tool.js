import { SelectTool, SelectToolView } from "./select_tool";
import { PolyAnnotation } from "../../annotations/poly_annotation";
import { Keys } from "../../../core/dom";
import * as p from "../../../core/properties";
import { bk_tool_icon_lasso_select } from "../../../styles/icons";
export class LassoSelectToolView extends SelectToolView {
    initialize() {
        super.initialize();
        this.data = null;
    }
    connect_signals() {
        super.connect_signals();
        this.connect(this.model.properties.active.change, () => this._active_change());
    }
    _active_change() {
        if (!this.model.active)
            this._clear_overlay();
    }
    _keyup(ev) {
        if (ev.keyCode == Keys.Enter)
            this._clear_overlay();
    }
    _pan_start(ev) {
        const { sx, sy } = ev;
        this.data = { sx: [sx], sy: [sy] };
    }
    _pan(ev) {
        const { sx: _sx, sy: _sy } = ev;
        const [sx, sy] = this.plot_view.frame.bbox.clip(_sx, _sy);
        this.data.sx.push(sx);
        this.data.sy.push(sy);
        const overlay = this.model.overlay;
        overlay.update({ xs: this.data.sx, ys: this.data.sy });
        if (this.model.select_every_mousemove) {
            const append = ev.shiftKey;
            this._do_select(this.data.sx, this.data.sy, false, append);
        }
    }
    _pan_end(ev) {
        this._clear_overlay();
        const append = ev.shiftKey;
        this._do_select(this.data.sx, this.data.sy, true, append);
        this.plot_view.push_state('lasso_select', { selection: this.plot_view.get_selection() });
    }
    _clear_overlay() {
        this.model.overlay.update({ xs: [], ys: [] });
    }
    _do_select(sx, sy, final, append) {
        const geometry = { type: 'poly', sx, sy };
        this._select(geometry, final, append);
    }
}
LassoSelectToolView.__name__ = "LassoSelectToolView";
const DEFAULT_POLY_OVERLAY = () => {
    return new PolyAnnotation({
        level: "overlay",
        xs_units: "screen",
        ys_units: "screen",
        fill_color: { value: "lightgrey" },
        fill_alpha: { value: 0.5 },
        line_color: { value: "black" },
        line_alpha: { value: 1.0 },
        line_width: { value: 2 },
        line_dash: { value: [4, 4] },
    });
};
export class LassoSelectTool extends SelectTool {
    constructor(attrs) {
        super(attrs);
        this.tool_name = "Lasso Select";
        this.icon = bk_tool_icon_lasso_select;
        this.event_type = "pan";
        this.default_order = 12;
    }
    static init_LassoSelectTool() {
        this.prototype.default_view = LassoSelectToolView;
        this.define({
            select_every_mousemove: [p.Boolean, true],
            overlay: [p.Instance, DEFAULT_POLY_OVERLAY],
        });
        this.register_alias("lasso_select", () => new LassoSelectTool());
    }
}
LassoSelectTool.__name__ = "LassoSelectTool";
LassoSelectTool.init_LassoSelectTool();
//# sourceMappingURL=lasso_select_tool.js.map