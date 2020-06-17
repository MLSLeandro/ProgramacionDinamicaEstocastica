import { Row, Column, GridBox, ToolbarBox, ProxyToolbar, Plot } from "./models";
function or_else(value, default_value) {
    if (value === undefined)
        return default_value;
    else
        return value;
}
export function gridplot(children, opts = {}) {
    const toolbar_location = or_else(opts.toolbar_location, "above");
    const merge_tools = or_else(opts.merge_tools, true);
    const sizing_mode = or_else(opts.sizing_mode, null);
    const toolbars = [];
    const items = [];
    for (let y = 0; y < children.length; y++) {
        const row = children[y];
        for (let x = 0; x < row.length; x++) {
            const item = row[x];
            if (item == null)
                continue;
            else {
                if (item instanceof Plot) { // XXX: semantics differ
                    if (merge_tools) {
                        toolbars.push(item.toolbar);
                        item.toolbar_location = null;
                    }
                    if (opts.plot_width != null)
                        item.plot_width = opts.plot_width;
                    if (opts.plot_height != null)
                        item.plot_height = opts.plot_height;
                }
                items.push([item, y, x]);
            }
        }
    }
    if (!merge_tools || toolbar_location == null)
        return new GridBox({ children: items, sizing_mode });
    const grid = new GridBox({ children: items, sizing_mode });
    const tools = [];
    for (const toolbar of toolbars) {
        tools.push(...toolbar.tools);
    }
    const toolbar = new ToolbarBox({
        toolbar: new ProxyToolbar({ toolbars, tools }),
        toolbar_location,
    });
    switch (toolbar_location) {
        case "above":
            return new Column({ children: [toolbar, grid], sizing_mode });
        case "below":
            return new Column({ children: [grid, toolbar], sizing_mode });
        case "left":
            return new Row({ children: [toolbar, grid], sizing_mode });
        case "right":
            return new Row({ children: [grid, toolbar], sizing_mode });
        default:
            throw new Error("unexpected");
    }
}
//# sourceMappingURL=gridplot.js.map