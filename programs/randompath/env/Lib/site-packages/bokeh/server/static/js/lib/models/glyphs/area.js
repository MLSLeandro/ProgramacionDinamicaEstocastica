import { Glyph, GlyphView } from "./glyph";
import { generic_area_legend } from "./utils";
export class AreaView extends GlyphView {
    draw_legend_for_index(ctx, bbox, index) {
        generic_area_legend(this.visuals, ctx, bbox, index);
    }
}
AreaView.__name__ = "AreaView";
export class Area extends Glyph {
    constructor(attrs) {
        super(attrs);
    }
    static init_Area() {
        this.mixins(['fill', 'hatch']);
    }
}
Area.__name__ = "Area";
Area.init_Area();
//# sourceMappingURL=area.js.map