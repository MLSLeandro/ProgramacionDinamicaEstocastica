import flatpickr from "flatpickr";
import { InputWidget, InputWidgetView } from "./input_widget";
import { CalendarPosition } from "../../core/enums";
import * as p from "../../core/properties";
import "../../styles/widgets/flatpickr";
declare type Date = string;
declare type DatesList = (Date | [Date, Date])[];
export declare class DatePickerView extends InputWidgetView {
    model: DatePicker;
    protected input_el: HTMLInputElement;
    private _picker;
    connect_signals(): void;
    render(): void;
    _on_change(_selected_dates: any, date_string: string, _instance: flatpickr.Instance): void;
}
export declare namespace DatePicker {
    type Attrs = p.AttrsOf<Props>;
    type Props = InputWidget.Props & {
        value: p.Property<string>;
        min_date: p.Property<string>;
        max_date: p.Property<string>;
        disabled_dates: p.Property<DatesList>;
        enabled_dates: p.Property<DatesList>;
        position: p.Property<CalendarPosition>;
        inline: p.Property<boolean>;
    };
}
export interface DatePicker extends DatePicker.Attrs {
}
export declare class DatePicker extends InputWidget {
    properties: DatePicker.Props;
    constructor(attrs?: Partial<DatePicker.Attrs>);
    static init_DatePicker(): void;
}
export {};
