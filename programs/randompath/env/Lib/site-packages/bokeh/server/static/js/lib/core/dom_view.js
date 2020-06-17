import { View } from "./view";
import * as DOM from "./dom";
import { bk_root } from "../styles/root";
export class DOMView extends View {
    initialize() {
        super.initialize();
        this._has_finished = false;
        this.el = this._createElement();
    }
    remove() {
        DOM.removeElement(this.el);
        super.remove();
    }
    css_classes() {
        return [];
    }
    cursor(_sx, _sy) {
        return null;
    }
    render() { }
    renderTo(element) {
        element.appendChild(this.el);
        this.render();
    }
    has_finished() {
        return this._has_finished;
    }
    get _root_element() {
        return DOM.parent(this.el, `.${bk_root}`) || document.body;
    }
    get is_idle() {
        return this.has_finished();
    }
    _createElement() {
        return DOM.createElement(this.tagName, { class: this.css_classes() });
    }
}
DOMView.__name__ = "DOMView";
DOMView.prototype.tagName = "div";
//# sourceMappingURL=dom_view.js.map