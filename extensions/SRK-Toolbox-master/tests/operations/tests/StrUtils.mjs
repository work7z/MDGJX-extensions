/**
 * StrUtils tests.
 *
 * @author n1474335 [n1474335@gmail.com]
 * @copyright Crown Copyright 2017
 * @license Apache-2.0
 *
 * Modified by Raka-loah@github for zh-CN i18n
 */
import TestRegister from "../../lib/TestRegister.mjs";

TestRegister.addTests([
    {
        name: "Diff, basic usage",
        input: "testing23\n\ntesting123",
        expectedOutput: "testing<ins>1</ins>23",
        recipeConfig: [
            {
                "op": "Diff",
                "args": ["\\n\\n", "字符", true, true, false, false]
            }
        ],
    },
    {
        name: "Diff added with subtraction, basic usage",
        input: "testing23\n\ntesting123",
        expectedOutput: "<ins>1</ins>",
        recipeConfig: [
            {
                "op": "Diff",
                "args": ["\\n\\n", "字符", true, true, true, false]
            }
        ],
    },
    {
        name: "Diff removed with subtraction, basic usage",
        input: "testing123\n\ntesting3",
        expectedOutput: "<del>12</del>",
        recipeConfig: [
            {
                "op": "Diff",
                "args": ["\\n\\n", "字符", true, true, true, false]
            }
        ],
    },
    {
        name: "Head 0",
        input: [1, 2, 3, 4, 5, 6].join("\n"),
        expectedOutput: [].join("\n"),
        recipeConfig: [
            {
                "op": "Head",
                "args": ["换行", 0]
            }
        ],
    },
    {
        name: "Head 1",
        input: [1, 2, 3, 4, 5, 6].join("\n"),
        expectedOutput: [1].join("\n"),
        recipeConfig: [
            {
                "op": "Head",
                "args": ["换行", 1]
            }
        ],
    },
    {
        name: "Head 2",
        input: [1, 2, 3, 4, 5, 6].join("\n"),
        expectedOutput: [1, 2].join("\n"),
        recipeConfig: [
            {
                "op": "Head",
                "args": ["换行", 2]
            }
        ],
    },
    {
        name: "Head 6",
        input: [1, 2, 3, 4, 5, 6].join("\n"),
        expectedOutput: [1, 2, 3, 4, 5, 6].join("\n"),
        recipeConfig: [
            {
                "op": "Head",
                "args": ["换行", 6]
            }
        ],
    },
    {
        name: "Head big",
        input: [1, 2, 3, 4, 5, 6].join("\n"),
        expectedOutput: [1, 2, 3, 4, 5, 6].join("\n"),
        recipeConfig: [
            {
                "op": "Head",
                "args": ["换行", 100]
            }
        ],
    },
    {
        name: "Head all but 1",
        input: [1, 2, 3, 4, 5, 6].join("\n"),
        expectedOutput: [1, 2, 3, 4, 5].join("\n"),
        recipeConfig: [
            {
                "op": "Head",
                "args": ["换行", -1]
            }
        ],
    },
    {
        name: "Head all but 2",
        input: [1, 2, 3, 4, 5, 6].join("\n"),
        expectedOutput: [1, 2, 3, 4].join("\n"),
        recipeConfig: [
            {
                "op": "Head",
                "args": ["换行", -2]
            }
        ],
    },
    {
        name: "Head all but 6",
        input: [1, 2, 3, 4, 5, 6].join("\n"),
        expectedOutput: [].join("\n"),
        recipeConfig: [
            {
                "op": "Head",
                "args": ["换行", -6]
            }
        ],
    },
    {
        name: "Head all but big",
        input: [1, 2, 3, 4, 5, 6].join("\n"),
        expectedOutput: [].join("\n"),
        recipeConfig: [
            {
                "op": "Head",
                "args": ["换行", -100]
            }
        ],
    },
    {
        name: "Tail 0",
        input: [1, 2, 3, 4, 5, 6].join("\n"),
        expectedOutput: [].join("\n"),
        recipeConfig: [
            {
                "op": "Tail",
                "args": ["换行", 0]
            }
        ],
    },
    {
        name: "Tail 1",
        input: [1, 2, 3, 4, 5, 6].join("\n"),
        expectedOutput: [6].join("\n"),
        recipeConfig: [
            {
                "op": "Tail",
                "args": ["换行", 1]
            }
        ],
    },
    {
        name: "Tail 2",
        input: [1, 2, 3, 4, 5, 6].join("\n"),
        expectedOutput: [5, 6].join("\n"),
        recipeConfig: [
            {
                "op": "Tail",
                "args": ["换行", 2]
            }
        ],
    },
    {
        name: "Tail 6",
        input: [1, 2, 3, 4, 5, 6].join("\n"),
        expectedOutput: [1, 2, 3, 4, 5, 6].join("\n"),
        recipeConfig: [
            {
                "op": "Tail",
                "args": ["换行", 6]
            }
        ],
    },
    {
        name: "Tail big",
        input: [1, 2, 3, 4, 5, 6].join("\n"),
        expectedOutput: [1, 2, 3, 4, 5, 6].join("\n"),
        recipeConfig: [
            {
                "op": "Tail",
                "args": ["换行", 100]
            }
        ],
    },
    {
        name: "Tail all but 1",
        input: [1, 2, 3, 4, 5, 6].join("\n"),
        expectedOutput: [2, 3, 4, 5, 6].join("\n"),
        recipeConfig: [
            {
                "op": "Tail",
                "args": ["换行", -1]
            }
        ],
    },
    {
        name: "Tail all but 2",
        input: [1, 2, 3, 4, 5, 6].join("\n"),
        expectedOutput: [3, 4, 5, 6].join("\n"),
        recipeConfig: [
            {
                "op": "Tail",
                "args": ["换行", -2]
            }
        ],
    },
    {
        name: "Tail all but 6",
        input: [1, 2, 3, 4, 5, 6].join("\n"),
        expectedOutput: [].join("\n"),
        recipeConfig: [
            {
                "op": "Tail",
                "args": ["换行", -6]
            }
        ],
    },
    {
        name: "Tail all but big",
        input: [1, 2, 3, 4, 5, 6].join("\n"),
        expectedOutput: [].join("\n"),
        recipeConfig: [
            {
                "op": "Tail",
                "args": ["换行", -100]
            }
        ],
    },
    {
        name: "Escape String: single quotes",
        input: "Escape 'these' quotes.",
        expectedOutput: "Escape \\'these\\' quotes.",
        recipeConfig: [
            {
                "op": "转义字符串",
                "args": ["特殊字符", "单引号", false, true, false]
            }
        ],
    },
    {
        name: "Escape String: double quotes",
        input: "Hello \"World\"!",
        expectedOutput: "Hello \\\"World\\\"!",
        recipeConfig: [
            {
                "op": "转义字符串",
                "args": ["特殊字符", "双引号", false, true, false]
            }
        ],
    },
    {
        name: "Escape String: special characters",
        input: "Fizz & buzz\n\ttabbed newline\rcarriage returned line\nbackspace character: \"\" form feed character: \"\"",
        expectedOutput: "Fizz & buzz\\n\\ttabbed newline\\rcarriage returned line\\nbackspace character: \\\"\\b\\\" form feed character: \\\"\\f\\\"",
        recipeConfig: [
            {
                "op": "转义字符串",
                "args": ["特殊字符", "双引号", false, true, false]
            }
        ],
    },
    {
        name: "Unescape String: quotes",
        input: "Hello \\\"World\\\"! Escape \\'these\\' quotes.",
        expectedOutput: "Hello \"World\"! Escape 'these' quotes.",
        recipeConfig: [
            {
                "op": "字符串转义恢复",
                "args": []
            }
        ],
    },
    {
        name: "Unescape String: special characters",
        input: "Fizz \x26 buzz\\n\\ttabbed newline\\rcarriage returned line\\nbackspace character: \\\"\\b\\\" form feed character: \\\"\\f\\\"",
        expectedOutput: "Fizz & buzz\n\ttabbed newline\rcarriage returned line\nbackspace character: \"\" form feed character: \"\"",
        recipeConfig: [
            {
                "op": "字符串转义恢复",
                "args": []
            }
        ],
    },
    {
        name: "Escape String: complex",
        input: "null\0backspace\btab\tnewline\nverticaltab\vformfeed\fcarriagereturn\rdoublequote\"singlequote'hex\xa9unicode\u2665codepoint\u{1D306}",
        expectedOutput: "null\\0backspace\\btab\\tnewline\\nverticaltab\\x0bformfeed\\fcarriagereturn\\rdoublequote\"singlequote\\'hex\\xa9unicode\\u2665codepoint\\u{1d306}",
        recipeConfig: [
            {
                "op": "转义字符串",
                "args": ["特殊字符", "单引号", false, true, false]
            }
        ],
    },
    {
        name: "Unescape String: complex",
        input: "null\\0backspace\\btab\\tnewline\\nverticaltab\\vformfeed\\fcarriagereturn\\rdoublequote\\\"singlequote\\'hex\\xa9unicode\\u2665codepoint\\u{1D306}",
        expectedOutput: "null\0backspace\btab\tnewline\nverticaltab\vformfeed\fcarriagereturn\rdoublequote\"singlequote'hex\xa9unicode\u2665codepoint\u{1D306}",
        recipeConfig: [
            {
                "op": "字符串转义恢复",
                "args": []
            }
        ],
    },
]);
