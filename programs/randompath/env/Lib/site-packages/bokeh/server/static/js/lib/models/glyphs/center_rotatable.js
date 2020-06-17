import { XYGlyph, XYGlyphView } from "./xy_glyph";
import * as p from "../../core/properties";
export class CenterRotatableView extends XYGlyphView {
}
CenterRotatableView.__name__ = "CenterRotatableView";
export class CenterRotatable extends XYGlyph {
    constructor(attrs) {
        super(attrs);
    }
    static init_CenterRotatable() {
        this.mixins(['line', 'fill']);
        this.define({
            angle: [p.AngleSpec, 0],
            width: [p.DistanceSpec],
            height: [p.DistanceSpec],
        });
    }
}
CenterRotatable.__name__ = "CenterRotatable";
CenterRotatable.init_CenterRotatable();
//# sourceMappingURL=center_rotatable.js.map