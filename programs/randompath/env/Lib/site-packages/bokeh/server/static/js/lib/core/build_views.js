import { difference } from "./util/array";
async function _build_view(view_cls, model, options) {
    const view = new view_cls(Object.assign(Object.assign({}, options), { model }));
    view.initialize();
    await view.lazy_initialize();
    return view;
}
export async function build_view(model, options = { parent: null }, cls = (model) => model.default_view) {
    const view = await _build_view(cls(model), model, options);
    view.connect_signals();
    return view;
}
export async function build_views(view_storage, models, options = { parent: null }, cls = (model) => model.default_view) {
    const to_remove = difference(Object.keys(view_storage), models.map((model) => model.id));
    for (const model_id of to_remove) {
        view_storage[model_id].remove();
        delete view_storage[model_id];
    }
    const created_views = [];
    const new_models = models.filter((model) => view_storage[model.id] == null);
    for (const model of new_models) {
        const view = await _build_view(cls(model), model, options);
        view_storage[model.id] = view;
        created_views.push(view);
    }
    for (const view of created_views)
        view.connect_signals();
    return created_views;
}
export function remove_views(view_storage) {
    for (const id in view_storage) {
        view_storage[id].remove();
        delete view_storage[id];
    }
}
//# sourceMappingURL=build_views.js.map