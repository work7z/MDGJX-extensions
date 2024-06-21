"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isJSON = void 0;
const media_typer_1 = __importDefault(require("media-typer"));
const content_type_1 = __importDefault(require("content-type"));
function isJSON(contentTypeHeader) {
    if (contentTypeHeader) {
        const ct = content_type_1.default.parse(contentTypeHeader);
        const mediaType = media_typer_1.default.parse(ct.type);
        if (mediaType.subtype === "json") {
            return true;
        }
        if (mediaType.suffix === "json") {
            return true;
        }
        if (mediaType.suffix && /\bjson\b/i.test(mediaType.suffix)) {
            return true;
        }
        if (mediaType.subtype && /\bjson\b/i.test(mediaType.subtype)) {
            return true;
        }
    }
    return false;
}
exports.isJSON = isJSON;
