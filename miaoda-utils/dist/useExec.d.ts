/// <reference types="node" />
/// <reference types="node" />
import { CachedPromiseOptions } from "../src/useCachedPromise";
import { UseCachedPromiseReturnType } from "../src/types";
import { ParseExecOutputHandler } from "../src/exec-utils";
type ExecOptions = {
    /**
     * If `true`, runs the command inside of a shell. Uses `/bin/sh`. A different shell can be specified as a string. The shell should understand the `-c` switch.
     *
     * We recommend against using this option since it is:
     * - not cross-platform, encouraging shell-specific syntax.
     * - slower, because of the additional shell interpretation.
     * - unsafe, potentially allowing command injection.
     *
     * @default false
     */
    shell?: boolean | string;
    /**
     * Strip the final newline character from the output.
     * @default true
     */
    stripFinalNewline?: boolean;
    /**
     * Current working directory of the child process.
     * @default process.cwd()
     */
    cwd?: string;
    /**
     * Environment key-value pairs. Extends automatically from `process.env`.
     * @default process.env
     */
    env?: NodeJS.ProcessEnv;
    /**
     * Specify the character encoding used to decode the stdout and stderr output. If set to `"buffer"`, then stdout and stderr will be a Buffer instead of a string.
     *
     * @default "utf8"
     */
    encoding?: BufferEncoding | "buffer";
    /**
     * Write some input to the `stdin` of your binary.
     */
    input?: string | Buffer;
    /** If timeout is greater than `0`, the parent will send the signal `SIGTERM` if the child runs longer than timeout milliseconds.
     *
     * @default 10000
     */
    timeout?: number;
};
type ExecCachedPromiseOptions<T, U> = Omit<CachedPromiseOptions<(_command: string, _args: string[], _options?: ExecOptions, input?: string | Buffer) => Promise<T>, U>, "abortable">;
/**
 * Executes a command and returns the {@link AsyncState} corresponding to the execution of the command. The last value will be kept between command runs.
 *
 * @remark When specifying the arguments via the `command` string, if the file or an argument of the command contains spaces, they must be escaped with backslashes. This matters especially if `command` is not a constant but a variable, for example with `__dirname` or `process.cwd()`. Except for spaces, no escaping/quoting is needed.
 *
 * The `shell` option must be used if the command uses shell-specific features (for example, `&&` or `||`), as opposed to being a simple file followed by its arguments.
 *
 * @example
 * ```
 * import { useExec } from '@raycast/utils';
 *
 * export default function Command() {
 *   const { isLoading, data, revalidate } = useExec("brew", ["info", "--json=v2", "--installed"]);
 *   const results = useMemo<{}[]>(() => JSON.parse(data || "[]"), [data]);
 *
 *   return (
 *     <List isLoading={isLoading}>
 *      {(data || []).map((item) => (
 *        <List.Item key={item.id} title={item.name} />
 *      ))}
 *    </List>
 *   );
 * };
 * ```
 */
export declare function useExec<T = Buffer, U = undefined>(command: string, options: {
    parseOutput?: ParseExecOutputHandler<T, Buffer, ExecOptions>;
} & ExecOptions & {
    encoding: "buffer";
} & ExecCachedPromiseOptions<T, U>): UseCachedPromiseReturnType<T, U>;
export declare function useExec<T = string, U = undefined>(command: string, options?: {
    parseOutput?: ParseExecOutputHandler<T, string, ExecOptions>;
} & ExecOptions & {
    encoding?: BufferEncoding;
} & ExecCachedPromiseOptions<T, U>): UseCachedPromiseReturnType<T, U>;
export declare function useExec<T = Buffer, U = undefined>(file: string, 
/**
 * The arguments to pass to the file. No escaping/quoting is needed.
 *
 * If defined, the commands needs to be a file to execute. If undefined, the arguments will be parsed from the command.
 */
args: string[], options: {
    parseOutput?: ParseExecOutputHandler<T, Buffer, ExecOptions>;
} & ExecOptions & {
    encoding: "buffer";
} & ExecCachedPromiseOptions<T, U>): UseCachedPromiseReturnType<T, U>;
export declare function useExec<T = string, U = undefined>(file: string, 
/**
 * The arguments to pass to the file. No escaping/quoting is needed.
 *
 * If defined, the commands needs to be a file to execute. If undefined, the arguments will be parsed from the command.
 */
args: string[], options?: {
    parseOutput?: ParseExecOutputHandler<T, string, ExecOptions>;
} & ExecOptions & {
    encoding?: BufferEncoding;
} & ExecCachedPromiseOptions<T, U>): UseCachedPromiseReturnType<T, U>;
export {};
//# sourceMappingURL=useExec.d.ts.map