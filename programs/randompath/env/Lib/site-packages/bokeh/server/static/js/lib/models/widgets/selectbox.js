import { select, option, optgroup } from "../../core/dom";
import { isString, isArray } from "../../core/util/types";
import { logger } from "../../core/logging";
import * as p from "../../core/properties";
import { InputWidget, InputWidgetView } from "./input_widget";
import { bk_input } from "../../styles/widgets/inputs";
export class SelectView extends InputWidgetView {
    connect_signals() {
        super.connect_signals();
        this.connect(this.model.change, () => this.render());
    }
    build_options(values) {
        return values.map((el) => {
            let value, _label;
            if (isString(el))
                value = _label = el;
            else
                [value, _label] = el;
            const selected = this.model.value == value;
            return option({ selected, value }, _label);
        });
    }
    render() {
        super.render();
        let contents;
        if (isArray(this.model.options))
            contents = this.build_options(this.model.options);
        else {
            contents = [];
            const options = this.model.options;
            for (const key in options) {
                const value = options[key];
                contents.push(optgroup({ label: key }, this.build_options(value)));
            }
        }
        this.select_el = select({
            class: bk_input,
            id: this.model.id,
            name: this.model.name,
            disabled: this.model.disabled
        }, contents);
        this.select_el.addEventListener("change", () => this.change_input());
        this.group_el.appendChild(this.select_el);
    }
    change_input() {
        const value = this.select_el.value;
        logger.debug(`selectbox: value = ${value}`);
        this.model.value = value;
        super.change_input();
    }
}
SelectView.__name__ = "SelectView";
export class Select extends InputWidget {
    constructor(attrs) {
        super(attrs);
    }
    static init_Select() {
        this.prototype.default_view = SelectView;
        this.define({
            value: [p.String, ''],
            options: [p.Any, []],
        });
    }
}
Select.__name__ = "Select";
Select.init_Select();
//# sourceMappingURL=selectbox.js.map