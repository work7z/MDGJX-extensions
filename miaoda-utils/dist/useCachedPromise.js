"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useCachedPromise = void 0;
const react_1 = require("react");
const object_hash_1 = __importDefault(require("object-hash"));
const useCachedState_1 = require("./useCachedState");
const usePromise_1 = require("./usePromise");
const useLatest_1 = require("./useLatest");
// Symbol to differentiate an empty cache from `undefined`
const emptyCache = Symbol();
function useCachedPromise(fn, args, options) {
    /**
     * The hook generates a cache key from the promise it receives & its arguments.
     * Sometimes that's not enough to guarantee uniqueness, so hooks that build on top of `useCachedPromise` can
     * use an `internal_cacheKeySuffix` to help it.
     *
     * @remark For internal use only.
     */
    const { initialData, keepPreviousData, internal_cacheKeySuffix, ...usePromiseOptions } = options || {};
    const lastUpdateFrom = (0, react_1.useRef)();
    const [cachedData, mutateCache] = (0, useCachedState_1.useCachedState)((0, object_hash_1.default)(args || []) + internal_cacheKeySuffix ?? "", emptyCache, {
        cacheNamespace: (0, object_hash_1.default)(fn),
    });
    // Use a ref to store previous returned data. Use the inital data as its inital value from the cache.
    const laggyDataRef = (0, react_1.useRef)(cachedData !== emptyCache ? cachedData : initialData);
    const paginationArgsRef = (0, react_1.useRef)(undefined);
    const { mutate: _mutate, revalidate, ...state
    // @ts-expect-error fn has the same signature in both usePromise and useCachedPromise
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
     } = (0, usePromise_1.usePromise)(fn, args || [], {
        ...usePromiseOptions,
        onData(data, pagination) {
            paginationArgsRef.current = pagination;
            if (usePromiseOptions.onData) {
                usePromiseOptions.onData(data, pagination);
            }
            if (pagination && pagination.page > 0) {
                // don't cache beyond the first page
                return;
            }
            lastUpdateFrom.current = "promise";
            laggyDataRef.current = data;
            mutateCache(data);
        },
    });
    let returnedData;
    const pagination = state.pagination;
    // when paginating, only the first page gets cached, so we return the data we get from `usePromise`, because
    // it will be accumulated.
    if (paginationArgsRef.current && paginationArgsRef.current.page > 0 && state.data) {
        returnedData = state.data;
        // if the latest update if from the Promise, we keep it
    }
    else if (lastUpdateFrom.current === "promise") {
        returnedData = laggyDataRef.current;
    }
    else if (keepPreviousData && cachedData !== emptyCache) {
        // if we want to keep the latest data, we pick the cache but only if it's not empty
        returnedData = cachedData;
        if (pagination) {
            pagination.hasMore = true;
            pagination.pageSize = cachedData.length;
        }
    }
    else if (keepPreviousData && cachedData === emptyCache) {
        // if the cache is empty, we will return the previous data
        returnedData = laggyDataRef.current;
        // there are no special cases, so either return the cache or initial data
    }
    else if (cachedData !== emptyCache) {
        returnedData = cachedData;
        if (pagination) {
            pagination.hasMore = true;
            pagination.pageSize = cachedData.length;
        }
    }
    else {
        returnedData = initialData;
    }
    const latestData = (0, useLatest_1.useLatest)(returnedData);
    // we rewrite the mutate function to update the cache instead
    const mutate = (0, react_1.useCallback)(async (asyncUpdate, options) => {
        let dataBeforeOptimisticUpdate;
        try {
            if (options?.optimisticUpdate) {
                if (typeof options?.rollbackOnError !== "function" && options?.rollbackOnError !== false) {
                    // keep track of the data before the optimistic update,
                    // but only if we need it (eg. only when we want to automatically rollback after)
                    dataBeforeOptimisticUpdate = structuredClone(latestData.current);
                }
                const data = options.optimisticUpdate(latestData.current);
                lastUpdateFrom.current = "cache";
                laggyDataRef.current = data;
                mutateCache(data);
            }
            return await _mutate(asyncUpdate, { shouldRevalidateAfter: options?.shouldRevalidateAfter });
        }
        catch (err) {
            if (typeof options?.rollbackOnError === "function") {
                const data = options.rollbackOnError(latestData.current);
                lastUpdateFrom.current = "cache";
                laggyDataRef.current = data;
                mutateCache(data);
            }
            else if (options?.optimisticUpdate && options?.rollbackOnError !== false) {
                lastUpdateFrom.current = "cache";
                // @ts-expect-error when undefined, it's expected
                laggyDataRef.current = dataBeforeOptimisticUpdate;
                // @ts-expect-error when undefined, it's expected
                mutateCache(dataBeforeOptimisticUpdate);
            }
            throw err;
        }
    }, [mutateCache, _mutate, latestData, laggyDataRef, lastUpdateFrom]);
    (0, react_1.useEffect)(() => {
        if (cachedData !== emptyCache) {
            lastUpdateFrom.current = "cache";
            laggyDataRef.current = cachedData;
        }
    }, [cachedData]);
    return {
        data: returnedData,
        isLoading: state.isLoading,
        error: state.error,
        mutate: paginationArgsRef.current && paginationArgsRef.current.page > 0 ? _mutate : mutate,
        pagination,
        revalidate,
    };
}
exports.useCachedPromise = useCachedPromise;
