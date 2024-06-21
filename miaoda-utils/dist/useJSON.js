"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useJSON = void 0;
const api_1 = require("@raycast/api");
const cross_fetch_1 = __importDefault(require("cross-fetch"));
const node_fs_1 = require("node:fs");
const promises_1 = require("node:fs/promises");
const node_path_1 = require("node:path");
const promises_2 = require("node:stream/promises");
const react_1 = require("react");
const stream_chain_1 = __importDefault(require("stream-chain"));
const stream_json_1 = require("stream-json");
const StreamArray_1 = __importDefault(require("stream-json/streamers/StreamArray"));
const fetch_utils_1 = require("./fetch-utils");
const useCachedPromise_1 = require("./useCachedPromise");
async function cache(url, destination, fetchOptions) {
    if (typeof url === "object" || url.startsWith("http://") || url.startsWith("https://")) {
        return await cacheURL(url, destination, fetchOptions);
    }
    else if (url.startsWith("file://") && url.endsWith(".json")) {
        return await cacheFile((0, node_path_1.normalize)(decodeURIComponent(new URL(url).pathname)), destination);
    }
    else {
        throw new Error("Only HTTP(S) or file URLs with the 'json' extension  are supported");
    }
}
async function cacheURL(url, destination, fetchOptions) {
    const response = await (0, cross_fetch_1.default)(url, fetchOptions);
    if (!response.ok) {
        throw new Error("Failed to fetch URL");
    }
    if (!(0, fetch_utils_1.isJSON)(response.headers.get("content-type"))) {
        throw new Error("URL does not return JSON");
    }
    if (!response.body) {
        throw new Error("Failed to retrieve expected JSON content: Response body is missing or inaccessible.");
    }
    await (0, promises_2.pipeline)(response.body, (0, node_fs_1.createWriteStream)(destination));
}
async function cacheFile(source, destination) {
    await (0, promises_2.pipeline)((0, node_fs_1.createReadStream)(source), (0, node_fs_1.createWriteStream)(destination));
}
async function cacheURLIfNecessary(url, folder, fileName, fetchOptions) {
    const destination = (0, node_path_1.join)(folder, fileName);
    try {
        await (0, promises_1.stat)(folder);
    }
    catch (e) {
        (0, node_fs_1.mkdirSync)(folder, { recursive: true });
        await cache(url, destination, fetchOptions);
        return;
    }
    let stats = undefined;
    try {
        stats = await (0, promises_1.stat)(destination);
    }
    catch (e) {
        await cache(url, destination, fetchOptions);
        return;
    }
    if (typeof url === "object" || url.startsWith("http://") || url.startsWith("https://")) {
        const headResponse = await (0, cross_fetch_1.default)(url, { ...fetchOptions, method: "HEAD" });
        if (!headResponse.ok) {
            throw new Error("Could not fetch URL");
        }
        if (!(0, fetch_utils_1.isJSON)(headResponse.headers.get("content-type"))) {
            throw new Error("URL does not return JSON");
        }
        const lastModified = Date.parse(headResponse.headers.get("last-modified") ?? "");
        if (stats.size === 0 || isNaN(lastModified) || lastModified > stats.mtimeMs) {
            await cache(url, destination, fetchOptions);
            return;
        }
    }
    else if (url.startsWith("file://") && url.endsWith(".json")) {
        try {
            const sourceStats = await (0, promises_1.stat)((0, node_path_1.normalize)(decodeURIComponent(new URL(url).pathname)));
            if (sourceStats.mtimeMs > stats.mtimeMs) {
                await cache(url, destination, fetchOptions);
            }
        }
        catch (e) {
            throw new Error("Source file could not be read");
        }
    }
    else {
        throw new Error("Only HTTP(S) or file URLs with the 'json' extension  are supported");
    }
}
async function* streamJsonFile(filePath, pageSize, abortSignal, filterFn) {
    let page = [];
    const fileStream = (0, node_fs_1.createReadStream)(filePath);
    const jsonParser = (0, stream_json_1.parser)();
    const arrayParser = new StreamArray_1.default();
    const pipeline = new stream_chain_1.default([fileStream, jsonParser, arrayParser]);
    fileStream.on("error", (_error) => {
        pipeline.destroy();
    });
    jsonParser.on("error", (_error) => {
        pipeline.destroy();
    });
    arrayParser.on("error", (_error) => {
        pipeline.destroy();
    });
    abortSignal?.addEventListener("abort", () => {
        pipeline.destroy();
    });
    try {
        for await (const data of pipeline) {
            if (abortSignal?.aborted) {
                break;
            }
            if (!filterFn || filterFn(data.value)) {
                page.push(data.value);
            }
            if (page.length >= pageSize) {
                yield page;
                page = [];
            }
        }
        if (page.length > 0) {
            yield page;
        }
    }
    catch (e) {
        pipeline.destroy();
    }
}
function useJSON(url, options) {
    const { initialData, execute, keepPreviousData, onError, onData, onWillExecute, fileName, filter, folder = api_1.environment.supportPath, pageSize = 20, ...fetchOptions } = options ?? {};
    const useCachedPromiseOptions = {
        initialData,
        execute,
        keepPreviousData,
        onError,
        onData,
        onWillExecute,
    };
    const generatorRef = (0, react_1.useRef)(null);
    const controllerRef = (0, react_1.useRef)(null);
    const hasMoreRef = (0, react_1.useRef)(false);
    return (0, useCachedPromise_1.useCachedPromise)((url, pageSize, folder, fileName, fetchOptions, filter) => async ({ page }) => {
        if (page === 0) {
            controllerRef.current?.abort();
            controllerRef.current = new AbortController();
            await cacheURLIfNecessary(url, folder, fileName, fetchOptions);
            const destination = (0, node_path_1.join)(folder, fileName);
            generatorRef.current = streamJsonFile(destination, pageSize, controllerRef.current?.signal, filter);
        }
        if (!generatorRef.current) {
            return { hasMore: hasMoreRef.current, data: [] };
        }
        const { value: newData, done } = await generatorRef.current.next();
        hasMoreRef.current = !done;
        return { hasMore: hasMoreRef.current, data: (newData ?? []) };
    }, [url, pageSize, folder, `${fileName?.replace(/\.json$/, "") ?? "cache"}.json`, fetchOptions, filter], useCachedPromiseOptions);
}
exports.useJSON = useJSON;
