import { TextInput, TextInputView } from "./text_input";
import { empty, display, undisplay, div, Keys } from "../../core/dom";
import * as p from "../../core/properties";
import { clamp } from "../../core/util/math";
import { bk_below, bk_active } from "../../styles/mixins";
import { bk_menu } from "../../styles/menus";
export class AutocompleteInputView extends TextInputView {
    constructor() {
        super(...arguments);
        this._open = false;
        this._last_value = "";
        this._hover_index = 0;
    }
    render() {
        super.render();
        this.input_el.addEventListener("keydown", (event) => this._keydown(event));
        this.input_el.addEventListener("keyup", (event) => this._keyup(event));
        this.menu = div({ class: [bk_menu, bk_below] });
        this.menu.addEventListener("click", (event) => this._menu_click(event));
        this.menu.addEventListener("mouseover", (event) => this._menu_hover(event));
        this.el.appendChild(this.menu);
        undisplay(this.menu);
    }
    change_input() {
        if (this._open && this.menu.children.length > 0) {
            this.model.value = this.menu.children[this._hover_index].textContent;
            this.input_el.focus();
            this._hide_menu();
        }
    }
    _update_completions(completions) {
        empty(this.menu);
        for (const text of completions) {
            const item = div({}, text);
            this.menu.appendChild(item);
        }
        if (completions.length > 0)
            this.menu.children[0].classList.add(bk_active);
    }
    _show_menu() {
        if (!this._open) {
            this._open = true;
            this._hover_index = 0;
            this._last_value = this.model.value;
            display(this.menu);
            const listener = (event) => {
                const { target } = event;
                if (target instanceof HTMLElement && !this.el.contains(target)) {
                    document.removeEventListener("click", listener);
                    this._hide_menu();
                }
            };
            document.addEventListener("click", listener);
        }
    }
    _hide_menu() {
        if (this._open) {
            this._open = false;
            undisplay(this.menu);
        }
    }
    _menu_click(event) {
        if (event.target != event.currentTarget && event.target instanceof Element) {
            this.model.value = event.target.textContent;
            this.input_el.focus();
            this._hide_menu();
        }
    }
    _menu_hover(event) {
        if (event.target != event.currentTarget && event.target instanceof Element) {
            let i = 0;
            for (i = 0; i < this.menu.children.length; i++) {
                if (this.menu.children[i].textContent == event.target.textContent)
                    break;
            }
            this._bump_hover(i);
        }
    }
    _bump_hover(new_index) {
        const n_children = this.menu.children.length;
        if (this._open && n_children > 0) {
            this.menu.children[this._hover_index].classList.remove(bk_active);
            this._hover_index = clamp(new_index, 0, n_children - 1);
            this.menu.children[this._hover_index].classList.add(bk_active);
        }
    }
    _keydown(_event) { }
    _keyup(event) {
        switch (event.keyCode) {
            case Keys.Enter: {
                this.change_input();
                break;
            }
            case Keys.Esc: {
                this._hide_menu();
                break;
            }
            case Keys.Up: {
                this._bump_hover(this._hover_index - 1);
                break;
            }
            case Keys.Down: {
                this._bump_hover(this._hover_index + 1);
                break;
            }
            default: {
                const value = this.input_el.value;
                if (value.length < this.model.min_characters) {
                    this._hide_menu();
                    return;
                }
                const completions = [];
                for (const text of this.model.completions) {
                    if (text.startsWith(value))
                        completions.push(text);
                }
                this._update_completions(completions);
                if (completions.length == 0)
                    this._hide_menu();
                else
                    this._show_menu();
            }
        }
    }
}
AutocompleteInputView.__name__ = "AutocompleteInputView";
export class AutocompleteInput extends TextInput {
    constructor(attrs) {
        super(attrs);
    }
    static init_AutocompleteInput() {
        this.prototype.default_view = AutocompleteInputView;
        this.define({
            completions: [p.Array, []],
            min_characters: [p.Int, 2],
        });
    }
}
AutocompleteInput.__name__ = "AutocompleteInput";
AutocompleteInput.init_AutocompleteInput();
//# sourceMappingURL=autocomplete_input.js.map