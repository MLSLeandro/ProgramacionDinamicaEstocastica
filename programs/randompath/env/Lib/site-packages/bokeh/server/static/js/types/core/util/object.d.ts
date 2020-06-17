export declare const keys: {
    (o: object): string[];
    (o: {}): string[];
}, extend: {
    <T, U>(target: T, source: U): T & U;
    <T_1, U_1, V>(target: T_1, source1: U_1, source2: V): T_1 & U_1 & V;
    <T_2, U_2, V_1, W>(target: T_2, source1: U_2, source2: V_1, source3: W): T_2 & U_2 & V_1 & W;
    (target: object, ...sources: any[]): any;
};
export declare const values: <T>(object: {
    [key: string]: T;
}) => T[];
export declare function clone<T extends object>(obj: T): T;
export declare function merge<T>(obj1: {
    [key: string]: T[];
}, obj2: {
    [key: string]: T[];
}): {
    [key: string]: T[];
};
export declare function size<T>(obj: T): number;
export declare function isEmpty<T>(obj: T): boolean;
