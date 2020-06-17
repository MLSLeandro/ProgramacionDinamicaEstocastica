import { VariadicBox } from "../../core/layout";
import { div } from "../../core/dom";
import * as p from "../../core/properties";
import { Widget, WidgetView } from "./widget";
import { bk_clearfix } from "../../styles/clearfix";
export class MarkupView extends WidgetView {
    connect_signals() {
        super.connect_signals();
        this.connect(this.model.change, () => {
            this.render();
            this.root.compute_layout(); // XXX: invalidate_layout?
        });
    }
    _update_layout() {
        this.layout = new VariadicBox(this.el);
        this.layout.set_sizing(this.box_sizing());
    }
    render() {
        super.render();
        const style = Object.assign(Object.assign({}, this.model.style), { display: "inline-block" });
        this.markup_el = div({ class: bk_clearfix, style });
        this.el.appendChild(this.markup_el);
    }
}
MarkupView.__name__ = "MarkupView";
export class Markup extends Widget {
    constructor(attrs) {
        super(attrs);
    }
    static init_Markup() {
        this.define({
            text: [p.String, ''],
            style: [p.Any, {}],
        });
    }
}
Markup.__name__ = "Markup";
Markup.init_Markup();
//# sourceMappingURL=markup.js.map