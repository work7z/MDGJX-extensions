/**
 * Symmetric difference tests.
 *
 * @author d98762625
 *
 * @copyright Crown Copyright 2018
 * @license Apache-2.0
 *
 * Modified by Raka-loah@github for zh-CN i18n
 */
import TestRegister from "../../lib/TestRegister.mjs";

TestRegister.addTests([
    {
        name: "Symmetric Difference",
        input: "1 2 3 4 5\n\n3 4 5 6 7",
        expectedOutput: "1 2 6 7",
        recipeConfig: [
            {
                op: "对称差",
                args: ["\n\n", " "],
            },
        ],
    },
    {
        name: "Symmetric Difference: wrong sample count",
        input: "1 2\n\n3 4 5\n\n3 4 5 6 7",
        expectedOutput: "集合数量错误，你可能需要调整集合分隔符或者添加一些数据。",
        recipeConfig: [
            {
                op: "对称差",
                args: ["\n\n", " "],
            },
        ],
    },
    {
        name: "Symmetric Difference: item delimiter",
        input: "a_b_c_d_e\n\nc_d_e_f_g",
        expectedOutput: "a_b_f_g",
        recipeConfig: [
            {
                op: "对称差",
                args: ["\n\n", "_"],
            },
        ],
    },
    {
        name: "Symmetric Difference: sample delimiter",
        input: "a_b_c_d_eAAAAAc_d_e_f_g",
        expectedOutput: "a_b_f_g",
        recipeConfig: [
            {
                op: "对称差",
                args: ["AAAAA", "_"],
            },
        ],
    },
]);
