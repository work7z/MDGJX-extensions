"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usePromise = void 0;
const react_1 = require("react");
const api_1 = require("@raycast/api");
const useDeepMemo_1 = require("./useDeepMemo");
const useLatest_1 = require("./useLatest");
const showFailureToast_1 = require("./showFailureToast");
function usePromise(fn, args, options) {
    const lastCallId = (0, react_1.useRef)(0);
    const [state, set] = (0, react_1.useState)({ isLoading: true });
    const fnRef = (0, useLatest_1.useLatest)(fn);
    const latestAbortable = (0, useLatest_1.useLatest)(options?.abortable);
    const latestArgs = (0, useLatest_1.useLatest)(args || []);
    const latestOnError = (0, useLatest_1.useLatest)(options?.onError);
    const latestOnData = (0, useLatest_1.useLatest)(options?.onData);
    const latestOnWillExecute = (0, useLatest_1.useLatest)(options?.onWillExecute);
    const latestValue = (0, useLatest_1.useLatest)(state.data);
    const latestCallback = (0, react_1.useRef)();
    const paginationArgsRef = (0, react_1.useRef)({ page: 0 });
    const usePaginationRef = (0, react_1.useRef)(false);
    const hasMoreRef = (0, react_1.useRef)(true);
    const pageSizeRef = (0, react_1.useRef)(50);
    const callback = (0, react_1.useCallback)((...args) => {
        const callId = ++lastCallId.current;
        if (latestAbortable.current) {
            latestAbortable.current.current?.abort();
            latestAbortable.current.current = new AbortController();
        }
        latestOnWillExecute.current?.(args);
        set((prevState) => ({ ...prevState, isLoading: true }));
        const promiseOrPaginatedPromise = bindPromiseIfNeeded(fnRef.current)(...args);
        function handleError(error) {
            if (error.name == "AbortError") {
                return error;
            }
            if (callId === lastCallId.current) {
                // handle errors
                if (latestOnError.current) {
                    latestOnError.current(error);
                }
                else {
                    if (api_1.environment.launchType !== api_1.LaunchType.Background) {
                        (0, showFailureToast_1.showFailureToast)(error, {
                            title: "Failed to fetch latest data",
                            primaryAction: {
                                title: "Retry",
                                onAction(toast) {
                                    toast.hide();
                                    latestCallback.current?.(...(latestArgs.current || []));
                                },
                            },
                            ...options?.failureToastOptions,
                        });
                    }
                }
                set({ error, isLoading: false });
            }
            return error;
        }
        if (typeof promiseOrPaginatedPromise === "function") {
            usePaginationRef.current = true;
            return promiseOrPaginatedPromise(paginationArgsRef.current).then(
            // @ts-expect-error too complicated for TS
            ({ data, hasMore, cursor }) => {
                if (callId === lastCallId.current) {
                    if (paginationArgsRef.current) {
                        paginationArgsRef.current.cursor = cursor;
                        paginationArgsRef.current.lastItem = data?.[data.length - 1];
                    }
                    if (latestOnData.current) {
                        latestOnData.current(data, paginationArgsRef.current);
                    }
                    if (hasMore) {
                        pageSizeRef.current = data.length;
                    }
                    hasMoreRef.current = hasMore;
                    set((previousData) => {
                        if (paginationArgsRef.current.page === 0) {
                            return { data, isLoading: false };
                        }
                        // @ts-expect-error we know it's an array here
                        return { data: (previousData.data || [])?.concat(data), isLoading: false };
                    });
                }
                return data;
            }, (error) => {
                hasMoreRef.current = false;
                return handleError(error);
            });
        }
        usePaginationRef.current = false;
        return promiseOrPaginatedPromise.then((data) => {
            if (callId === lastCallId.current) {
                if (latestOnData.current) {
                    latestOnData.current(data);
                }
                set({ data, isLoading: false });
            }
            return data;
        }, handleError);
    }, [
        latestAbortable,
        latestOnData,
        latestOnError,
        latestArgs,
        fnRef,
        set,
        latestCallback,
        latestOnWillExecute,
        paginationArgsRef,
    ]);
    latestCallback.current = callback;
    const revalidate = (0, react_1.useCallback)(() => {
        // reset the pagination
        paginationArgsRef.current = { page: 0 };
        const args = (latestArgs.current || []);
        return callback(...args);
    }, [callback, latestArgs]);
    const mutate = (0, react_1.useCallback)(async (asyncUpdate, options) => {
        let dataBeforeOptimisticUpdate;
        try {
            if (options?.optimisticUpdate) {
                if (typeof options?.rollbackOnError !== "function" && options?.rollbackOnError !== false) {
                    // keep track of the data before the optimistic update,
                    // but only if we need it (eg. only when we want to automatically rollback after)
                    dataBeforeOptimisticUpdate = structuredClone(latestValue.current?.value);
                }
                const update = options.optimisticUpdate;
                set((prevState) => ({ ...prevState, data: update(prevState.data) }));
            }
            return await asyncUpdate;
        }
        catch (err) {
            if (typeof options?.rollbackOnError === "function") {
                const update = options.rollbackOnError;
                set((prevState) => ({ ...prevState, data: update(prevState.data) }));
            }
            else if (options?.optimisticUpdate && options?.rollbackOnError !== false) {
                set((prevState) => ({ ...prevState, data: dataBeforeOptimisticUpdate }));
            }
            throw err;
        }
        finally {
            if (options?.shouldRevalidateAfter !== false) {
                if (api_1.environment.launchType === api_1.LaunchType.Background || api_1.environment.commandMode === "menu-bar") {
                    // when in the background or in a menu bar, we are going to await the revalidation
                    // to make sure we get the right data at the end of the mutation
                    await revalidate();
                }
                else {
                    revalidate();
                }
            }
        }
    }, [revalidate, latestValue, set]);
    const onLoadMore = (0, react_1.useCallback)(() => {
        paginationArgsRef.current.page += 1;
        const args = (latestArgs.current || []);
        callback(...args);
    }, [paginationArgsRef, latestValue, latestArgs, callback]);
    // revalidate when the args change
    (0, react_1.useEffect)(() => {
        // reset the pagination
        paginationArgsRef.current = { page: 0 };
        if (options?.execute !== false) {
            callback(...(args || []));
        }
        else {
            // cancel the previous request if we don't want to execute anymore
            if (latestAbortable.current) {
                latestAbortable.current.current?.abort();
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [(0, useDeepMemo_1.useDeepMemo)([args, options?.execute, callback]), latestAbortable, paginationArgsRef]);
    // abort request when unmounting
    (0, react_1.useEffect)(() => {
        return () => {
            if (latestAbortable.current) {
                // eslint-disable-next-line react-hooks/exhaustive-deps
                latestAbortable.current.current?.abort();
            }
        };
    }, [latestAbortable]);
    // we only want to show the loading indicator if the promise is executing
    const isLoading = options?.execute !== false ? state.isLoading : false;
    // @ts-expect-error loading is has some fixed value in the enum which
    const stateWithLoadingFixed = { ...state, isLoading };
    const pagination = usePaginationRef.current
        ? {
            pageSize: pageSizeRef.current,
            hasMore: hasMoreRef.current,
            onLoadMore,
        }
        : undefined;
    return { ...stateWithLoadingFixed, revalidate, mutate, pagination };
}
exports.usePromise = usePromise;
/** Bind the fn if it's a Promise method */
function bindPromiseIfNeeded(fn) {
    if (fn === Promise.all) {
        // @ts-expect-error this is fine
        return fn.bind(Promise);
    }
    if (fn === Promise.race) {
        // @ts-expect-error this is fine
        return fn.bind(Promise);
    }
    if (fn === Promise.resolve) {
        // @ts-expect-error this is fine
        return fn.bind(Promise);
    }
    if (fn === Promise.reject) {
        // @ts-expect-error this is fine
        return fn.bind(Promise);
    }
    return fn;
}
