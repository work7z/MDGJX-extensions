"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reviver = exports.replacer = void 0;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function replacer(key, _value) {
    const value = this[key];
    if (value instanceof Date) {
        return `__raycast_cached_date__${value.toString()}`;
    }
    if (Buffer.isBuffer(value)) {
        return `__raycast_cached_buffer__${value.toString("base64")}`;
    }
    return _value;
}
exports.replacer = replacer;
function reviver(_key, value) {
    if (typeof value === "string" && value.startsWith("__raycast_cached_date__")) {
        return new Date(value.replace("__raycast_cached_date__", ""));
    }
    if (typeof value === "string" && value.startsWith("__raycast_cached_buffer__")) {
        return Buffer.from(value.replace("__raycast_cached_buffer__", ""), "base64");
    }
    return value;
}
exports.reviver = reviver;
