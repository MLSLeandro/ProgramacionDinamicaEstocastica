import { Widget, WidgetView } from "./widget";
export class ControlView extends WidgetView {
    connect_signals() {
        super.connect_signals();
        const p = this.model.properties;
        this.on_change(p.disabled, () => this.render());
    }
}
ControlView.__name__ = "ControlView";
export class Control extends Widget {
    constructor(attrs) {
        super(attrs);
    }
}
Control.__name__ = "Control";
//# sourceMappingURL=control.js.map