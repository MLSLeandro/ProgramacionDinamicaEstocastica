import { Control, ControlView } from "./control";
export class InputGroupView extends ControlView {
    connect_signals() {
        super.connect_signals();
        this.connect(this.model.change, () => this.render());
    }
}
InputGroupView.__name__ = "InputGroupView";
export class InputGroup extends Control {
    constructor(attrs) {
        super(attrs);
    }
}
InputGroup.__name__ = "InputGroup";
//# sourceMappingURL=input_group.js.map