"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useFetch = void 0;
const react_1 = require("react");
const object_hash_1 = __importDefault(require("object-hash"));
const useCachedPromise_1 = require("./useCachedPromise");
const useLatest_1 = require("./useLatest");
const cross_fetch_1 = require("cross-fetch");
const fetch_utils_1 = require("./fetch-utils");
async function defaultParsing(response) {
    if (!response.ok) {
        throw new Error(response.statusText);
    }
    const contentTypeHeader = response.headers.get("content-type");
    if (contentTypeHeader && (0, fetch_utils_1.isJSON)(contentTypeHeader)) {
        return await response.json();
    }
    return await response.text();
}
function defaultMapping(result) {
    return { data: result, hasMore: false };
}
function useFetch(url, options) {
    const { parseResponse, mapResult, initialData, execute, keepPreviousData, onError, onData, onWillExecute, failureToastOptions, ...fetchOptions } = options || {};
    const useCachedPromiseOptions = {
        initialData,
        execute,
        keepPreviousData,
        onError,
        onData,
        onWillExecute,
        failureToastOptions,
    };
    const parseResponseRef = (0, useLatest_1.useLatest)(parseResponse || defaultParsing);
    const mapResultRef = (0, useLatest_1.useLatest)(mapResult || defaultMapping);
    const urlRef = (0, react_1.useRef)();
    const firstPageUrlRef = (0, react_1.useRef)();
    const firstPageUrl = typeof url === "function" ? url({ page: 0 }) : undefined;
    /**
     * When paginating, `url` is a `PaginatedRequestInfo`, so we only want to update the ref when the `firstPageUrl` changes.
     * When not paginating, `url` is a `RequestInfo`, so we want to update the ref whenever `url` changes.
     */
    if (!urlRef.current || typeof firstPageUrlRef.current === "undefined" || firstPageUrlRef.current !== firstPageUrl) {
        urlRef.current = url;
    }
    firstPageUrlRef.current = firstPageUrl;
    const abortable = (0, react_1.useRef)();
    const paginatedFn = (0, react_1.useCallback)((url, options) => async (pagination) => {
        const res = await (0, cross_fetch_1.fetch)(url(pagination), { signal: abortable.current?.signal, ...options });
        const parsed = (await parseResponseRef.current(res));
        return mapResultRef.current?.(parsed);
    }, [parseResponseRef, mapResultRef]);
    const fn = (0, react_1.useCallback)(async (url, options) => {
        const res = await (0, cross_fetch_1.fetch)(url, { signal: abortable.current?.signal, ...options });
        const parsed = (await parseResponseRef.current(res));
        const mapped = mapResultRef.current(parsed);
        return mapped?.data;
    }, [parseResponseRef, mapResultRef]);
    const promise = (0, react_1.useMemo)(() => {
        if (firstPageUrlRef.current) {
            return paginatedFn;
        }
        return fn;
    }, [firstPageUrlRef, fn, paginatedFn]);
    // @ts-expect-error lastItem can't be inferred properly
    return (0, useCachedPromise_1.useCachedPromise)(promise, [urlRef.current, fetchOptions], {
        ...useCachedPromiseOptions,
        internal_cacheKeySuffix: firstPageUrlRef.current + (0, object_hash_1.default)(mapResultRef.current) + (0, object_hash_1.default)(parseResponseRef.current),
        abortable,
    });
}
exports.useFetch = useFetch;
