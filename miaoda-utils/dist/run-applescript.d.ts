import { ParseExecOutputHandler } from "../src/exec-utils";
type AppleScriptOptions = {
    /**
     * By default, `runAppleScript` returns its results in human-readable form: strings do not have quotes around them, characters are not escaped, braces for lists and records are omitted, etc. This is generally more useful, but can introduce ambiguities. For example, the lists `{"foo", "bar"}` and `{{"foo", {"bar"}}}` would both be displayed as ‘foo, bar’. To see the results in an unambiguous form that could be recompiled into the same value, set `humanReadableOutput` to `false`.
     *
     * @default true
     */
    humanReadableOutput?: boolean;
    /**
     * Whether the script is using [`AppleScript`](https://developer.apple.com/library/archive/documentation/AppleScript/Conceptual/AppleScriptLangGuide/introduction/ASLR_intro.html#//apple_ref/doc/uid/TP40000983) or [`JavaScript`](https://developer.apple.com/library/archive/releasenotes/InterapplicationCommunication/RN-JavaScriptForAutomation/Articles/Introduction.html#//apple_ref/doc/uid/TP40014508-CH111-SW1).
     *
     * @default "AppleScript"
     */
    language?: "AppleScript" | "JavaScript";
    /**
     * A Signal object that allows you to abort the request if required via an AbortController object.
     */
    signal?: AbortSignal;
    /** If timeout is greater than `0`, the parent will send the signal `SIGTERM` if the child runs longer than timeout milliseconds.
     *
     * @default 10000
     */
    timeout?: number;
};
/**
 * Executes an AppleScript script.
 *
 * @example
 * ```typescript
 * import { showHUD } from "@raycast/api";
 * import { runAppleScript, showFailureToast } from "@raycast/utils";
 *
 * export default async function () {
 *   try {
 *     const res = await runAppleScript(
 *       `
 *       on run argv
 *         return "hello, " & item 1 of argv & "."
 *       end run
 *       `,
 *       ["world"]
 *     );
 *     await showHUD(res);
 *   } catch (error) {
 *     showFailureToast(error, { title: "Could not run AppleScript" });
 *   }
 * }
 * ```
 */
export declare function runAppleScript<T = string>(script: string, options?: AppleScriptOptions & {
    parseOutput?: ParseExecOutputHandler<T, string, AppleScriptOptions>;
}): Promise<string>;
export declare function runAppleScript<T = string>(script: string, 
/**
 * The arguments to pass to the script.
 */
args: string[], options?: AppleScriptOptions & {
    parseOutput?: ParseExecOutputHandler<T, string, AppleScriptOptions>;
}): Promise<string>;
export {};
//# sourceMappingURL=run-applescript.d.ts.map