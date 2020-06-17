import { concat, union } from "./array";
export const { keys, assign: extend } = Object;
export const values = (() => {
    if (typeof Object.values !== "undefined")
        return Object.values;
    else {
        return (object) => {
            const keys = Object.keys(object);
            const length = keys.length;
            const values = new Array(length);
            for (let i = 0; i < length; i++) {
                values[i] = object[keys[i]];
            }
            return values;
        };
    }
})();
export function clone(obj) {
    return Object.assign({}, obj);
}
export function merge(obj1, obj2) {
    /*
     * Returns an object with the array values for obj1 and obj2 unioned by key.
     */
    const result = Object.create(Object.prototype);
    const keys = concat([Object.keys(obj1), Object.keys(obj2)]);
    for (const key of keys) {
        const arr1 = obj1.hasOwnProperty(key) ? obj1[key] : [];
        const arr2 = obj2.hasOwnProperty(key) ? obj2[key] : [];
        result[key] = union(arr1, arr2);
    }
    return result;
}
export function size(obj) {
    return Object.keys(obj).length;
}
export function isEmpty(obj) {
    return size(obj) === 0;
}
//# sourceMappingURL=object.js.map