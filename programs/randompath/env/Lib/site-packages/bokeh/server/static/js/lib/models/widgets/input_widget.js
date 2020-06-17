import { Control, ControlView } from "./control";
import { div, label } from "../../core/dom";
import * as p from "../../core/properties";
import { bk_input_group } from "../../styles/widgets/inputs";
export class InputWidgetView extends ControlView {
    connect_signals() {
        super.connect_signals();
        this.connect(this.model.properties.title.change, () => {
            this.label_el.textContent = this.model.title;
        });
    }
    render() {
        super.render();
        const { title } = this.model;
        this.label_el = label({ style: { display: title.length == 0 ? "none" : "" } }, title);
        this.group_el = div({ class: bk_input_group }, this.label_el);
        this.el.appendChild(this.group_el);
    }
    change_input() { }
}
InputWidgetView.__name__ = "InputWidgetView";
export class InputWidget extends Control {
    constructor(attrs) {
        super(attrs);
    }
    static init_InputWidget() {
        this.define({
            title: [p.String, ""],
        });
    }
}
InputWidget.__name__ = "InputWidget";
InputWidget.init_InputWidget();
//# sourceMappingURL=input_widget.js.map