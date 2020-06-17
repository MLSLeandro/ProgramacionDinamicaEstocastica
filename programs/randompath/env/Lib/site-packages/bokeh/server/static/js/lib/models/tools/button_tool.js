import { DOMView } from "../../core/dom_view";
import { Tool, ToolView } from "./tool";
import { empty } from "../../core/dom";
import * as p from "../../core/properties";
import { startsWith } from "../../core/util/string";
import { isString } from "../../core/util/types";
import { bk_toolbar_button } from "../../styles/toolbar";
export class ButtonToolButtonView extends DOMView {
    initialize() {
        super.initialize();
        this.connect(this.model.change, () => this.render());
        this.el.addEventListener("click", () => this._clicked());
        this.render(); // XXX: this isn't governed by layout, for now
    }
    css_classes() {
        return super.css_classes().concat(bk_toolbar_button);
    }
    render() {
        empty(this.el);
        const icon = this.model.computed_icon;
        if (isString(icon)) {
            if (startsWith(icon, "data:image"))
                this.el.style.backgroundImage = "url('" + icon + "')";
            else
                this.el.classList.add(icon);
        }
        this.el.title = this.model.tooltip;
    }
}
ButtonToolButtonView.__name__ = "ButtonToolButtonView";
export class ButtonToolView extends ToolView {
}
ButtonToolView.__name__ = "ButtonToolView";
export class ButtonTool extends Tool {
    constructor(attrs) {
        super(attrs);
    }
    static init_ButtonTool() {
        this.internal({
            disabled: [p.Boolean, false],
        });
    }
    get tooltip() {
        return this.tool_name;
    }
    get computed_icon() {
        return this.icon;
    }
}
ButtonTool.__name__ = "ButtonTool";
ButtonTool.init_ButtonTool();
//# sourceMappingURL=button_tool.js.map