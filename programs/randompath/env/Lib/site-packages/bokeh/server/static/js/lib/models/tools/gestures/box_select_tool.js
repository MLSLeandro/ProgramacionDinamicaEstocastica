import { SelectTool, SelectToolView } from "./select_tool";
import { BoxAnnotation } from "../../annotations/box_annotation";
import * as p from "../../../core/properties";
import { bk_tool_icon_box_select } from "../../../styles/icons";
export class BoxSelectToolView extends SelectToolView {
    _compute_limits(curpoint) {
        const frame = this.plot_view.frame;
        const dims = this.model.dimensions;
        let base_point = this._base_point;
        if (this.model.origin == "center") {
            const [cx, cy] = base_point;
            const [dx, dy] = curpoint;
            base_point = [cx - (dx - cx), cy - (dy - cy)];
        }
        return this.model._get_dim_limits(base_point, curpoint, frame, dims);
    }
    _pan_start(ev) {
        const { sx, sy } = ev;
        this._base_point = [sx, sy];
    }
    _pan(ev) {
        const { sx, sy } = ev;
        const curpoint = [sx, sy];
        const [sxlim, sylim] = this._compute_limits(curpoint);
        this.model.overlay.update({ left: sxlim[0], right: sxlim[1], top: sylim[0], bottom: sylim[1] });
        if (this.model.select_every_mousemove) {
            const append = ev.shiftKey;
            this._do_select(sxlim, sylim, false, append);
        }
    }
    _pan_end(ev) {
        const { sx, sy } = ev;
        const curpoint = [sx, sy];
        const [sxlim, sylim] = this._compute_limits(curpoint);
        const append = ev.shiftKey;
        this._do_select(sxlim, sylim, true, append);
        this.model.overlay.update({ left: null, right: null, top: null, bottom: null });
        this._base_point = null;
        this.plot_view.push_state('box_select', { selection: this.plot_view.get_selection() });
    }
    _do_select([sx0, sx1], [sy0, sy1], final, append = false) {
        const geometry = { type: 'rect', sx0, sx1, sy0, sy1 };
        this._select(geometry, final, append);
    }
}
BoxSelectToolView.__name__ = "BoxSelectToolView";
const DEFAULT_BOX_OVERLAY = () => {
    return new BoxAnnotation({
        level: "overlay",
        render_mode: "css",
        top_units: "screen",
        left_units: "screen",
        bottom_units: "screen",
        right_units: "screen",
        fill_color: { value: "lightgrey" },
        fill_alpha: { value: 0.5 },
        line_color: { value: "black" },
        line_alpha: { value: 1.0 },
        line_width: { value: 2 },
        line_dash: { value: [4, 4] },
    });
};
export class BoxSelectTool extends SelectTool {
    constructor(attrs) {
        super(attrs);
        this.tool_name = "Box Select";
        this.icon = bk_tool_icon_box_select;
        this.event_type = "pan";
        this.default_order = 30;
    }
    static init_BoxSelectTool() {
        this.prototype.default_view = BoxSelectToolView;
        this.define({
            dimensions: [p.Dimensions, "both"],
            select_every_mousemove: [p.Boolean, false],
            overlay: [p.Instance, DEFAULT_BOX_OVERLAY],
            origin: [p.BoxOrigin, "corner"],
        });
        this.register_alias("box_select", () => new BoxSelectTool());
        this.register_alias("xbox_select", () => new BoxSelectTool({ dimensions: 'width' }));
        this.register_alias("ybox_select", () => new BoxSelectTool({ dimensions: 'height' }));
    }
    get tooltip() {
        return this._get_dim_tooltip(this.tool_name, this.dimensions);
    }
}
BoxSelectTool.__name__ = "BoxSelectTool";
BoxSelectTool.init_BoxSelectTool();
//# sourceMappingURL=box_select_tool.js.map