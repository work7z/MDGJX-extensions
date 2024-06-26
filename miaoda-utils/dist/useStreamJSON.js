"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useStreamJSON = void 0;
const api_1 = require("@raycast/api");
const cross_fetch_1 = __importDefault(require("cross-fetch"));
const node_fs_1 = require("node:fs");
const promises_1 = require("node:fs/promises");
const node_path_1 = require("node:path");
const promises_2 = require("node:stream/promises");
const react_1 = require("react");
const stream_chain_1 = __importDefault(require("stream-chain"));
const stream_json_1 = require("stream-json");
const Pick_1 = __importDefault(require("stream-json/filters/Pick"));
const StreamArray_1 = __importDefault(require("stream-json/streamers/StreamArray"));
const fetch_utils_1 = require("./fetch-utils");
const useCachedPromise_1 = require("./useCachedPromise");
const object_hash_1 = __importDefault(require("object-hash"));
async function cache(url, destination, fetchOptions) {
    if (typeof url === "object" || url.startsWith("http://") || url.startsWith("https://")) {
        return await cacheURL(url, destination, fetchOptions);
    }
    else if (url.startsWith("file://")) {
        return await cacheFile((0, node_path_1.normalize)(decodeURIComponent(new URL(url).pathname)), destination, fetchOptions?.signal ? fetchOptions.signal : undefined);
    }
    else {
        throw new Error("Only HTTP(S) or file URLs are supported");
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
    await (0, promises_2.pipeline)(response.body, (0, node_fs_1.createWriteStream)(destination), fetchOptions?.signal ? { signal: fetchOptions.signal } : undefined);
}
async function cacheFile(source, destination, abortSignal) {
    await (0, promises_2.pipeline)((0, node_fs_1.createReadStream)(source), (0, node_fs_1.createWriteStream)(destination), abortSignal ? { signal: abortSignal } : undefined);
}
async function cacheURLIfNecessary(url, folder, fileName, forceUpdate, fetchOptions) {
    const destination = (0, node_path_1.join)(folder, fileName);
    try {
        await (0, promises_1.stat)(folder);
    }
    catch (e) {
        (0, node_fs_1.mkdirSync)(folder, { recursive: true });
        await cache(url, destination, fetchOptions);
        return;
    }
    if (forceUpdate) {
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
        if (stats.size === 0 || Number.isNaN(lastModified) || lastModified > stats.mtimeMs) {
            await cache(url, destination, fetchOptions);
            return;
        }
    }
    else if (url.startsWith("file://")) {
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
        throw new Error("Only HTTP(S) or file URLs are supported");
    }
}
async function* streamJsonFile(filePath, pageSize, abortSignal, dataPath, filterFn, transformFn) {
    let page = [];
    const pipeline = new stream_chain_1.default([
        (0, node_fs_1.createReadStream)(filePath),
        dataPath ? Pick_1.default.withParser({ filter: dataPath }) : (0, stream_json_1.parser)(),
        new StreamArray_1.default(),
        (data) => transformFn?.(data.value) ?? data.value,
    ]);
    abortSignal?.addEventListener("abort", () => {
        pipeline.destroy();
    });
    try {
        for await (const data of pipeline) {
            if (abortSignal?.aborted) {
                return [];
            }
            if (!filterFn || filterFn(data)) {
                page.push(data);
            }
            if (page.length >= pageSize) {
                yield page;
                page = [];
            }
        }
    }
    catch (e) {
        pipeline.destroy();
        throw e;
    }
    if (page.length > 0) {
        yield page;
    }
    return [];
}
function useStreamJSON(url, options) {
    const { initialData, execute, keepPreviousData, onError, onData, onWillExecute, dataPath, filter, transform, pageSize = 20, ...fetchOptions } = options ?? {};
    const previousUrl = (0, react_1.useRef)();
    const previousDestination = (0, react_1.useRef)();
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
    return (0, useCachedPromise_1.useCachedPromise)((url, pageSize, fetchOptions, dataPath, filter, transform) => async ({ page }) => {
        const fileName = (0, object_hash_1.default)(url) + ".json";
        const folder = api_1.environment.supportPath;
        if (page === 0) {
            controllerRef.current?.abort();
            controllerRef.current = new AbortController();
            const destination = (0, node_path_1.join)(folder, fileName);
            /**
             * Force update the cache when the URL changes but the cache destination does not.
             */
            const forceCacheUpdate = Boolean(previousUrl.current &&
                previousUrl.current !== url &&
                previousDestination.current &&
                previousDestination.current === destination);
            previousUrl.current = url;
            previousDestination.current = destination;
            await cacheURLIfNecessary(url, folder, fileName, forceCacheUpdate, {
                ...fetchOptions,
                signal: controllerRef.current?.signal,
            });
            generatorRef.current = streamJsonFile(destination, pageSize, controllerRef.current?.signal, dataPath, filter, transform);
        }
        if (!generatorRef.current) {
            return { hasMore: hasMoreRef.current, data: [] };
        }
        const { value: newData, done } = await generatorRef.current.next();
        hasMoreRef.current = !done;
        return { hasMore: hasMoreRef.current, data: (newData ?? []) };
    }, [url, pageSize, fetchOptions, dataPath, filter, transform], useCachedPromiseOptions);
}
exports.useStreamJSON = useStreamJSON;
