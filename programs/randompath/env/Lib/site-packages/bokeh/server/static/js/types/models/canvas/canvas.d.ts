import { HasProps } from "../../core/has_props";
import { DOMView } from "../../core/dom_view";
import * as p from "../../core/properties";
import { OutputBackend } from "../../core/enums";
import { BBox } from "../../core/util/bbox";
import { Context2d } from "../../core/util/canvas";
export declare type WebGLState = {
    readonly canvas: HTMLCanvasElement;
    readonly gl: WebGLRenderingContext;
};
export declare class CanvasView extends DOMView {
    model: Canvas;
    bbox: BBox;
    webgl?: WebGLState;
    private _ctx;
    get ctx(): Context2d;
    protected underlays_el: HTMLElement;
    protected canvas_el: HTMLCanvasElement | SVGSVGElement;
    protected overlays_el: HTMLElement;
    events_el: HTMLElement;
    initialize(): void;
    add_underlay(el: HTMLElement): void;
    add_overlay(el: HTMLElement): void;
    add_event(el: HTMLElement): void;
    prepare_canvas(width: number, height: number): void;
    save(name: string): void;
}
export declare namespace Canvas {
    type Attrs = p.AttrsOf<Props>;
    type Props = HasProps.Props & {
        use_hidpi: p.Property<boolean>;
        pixel_ratio: p.Property<number>;
        output_backend: p.Property<OutputBackend>;
    };
}
export interface Canvas extends Canvas.Attrs {
}
export declare class Canvas extends HasProps {
    properties: Canvas.Props;
    default_view: typeof CanvasView;
    constructor(attrs?: Partial<Canvas.Attrs>);
    static init_Canvas(): void;
}
