import { HasProps } from "./has_props";
import { View } from "./view";
export declare type ViewStorage = {
    [key: string]: View;
};
export declare type Options = {
    parent: View | null;
};
export declare type ViewOf<T extends HasProps> = InstanceType<T["default_view"]>;
export declare function build_view<T extends HasProps>(model: T, options?: Options, cls?: (model: T) => T["default_view"]): Promise<ViewOf<T>>;
export declare function build_views<T extends HasProps>(view_storage: ViewStorage, models: T[], options?: Options, cls?: (model: T) => T["default_view"]): Promise<ViewOf<T>[]>;
export declare function remove_views(view_storage: ViewStorage): void;
