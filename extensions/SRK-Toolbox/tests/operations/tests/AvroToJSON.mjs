/**
 * Avro to JSON tests.
 *
 * @author jarrodconnolly [jarrod@nestedquotes.ca]
 * @copyright Crown Copyright 2019
 * @license Apache-2.0
 *
 * Modified by Raka-loah@github for zh-CN i18n
 */

import TestRegister from "../../lib/TestRegister.mjs";

TestRegister.addTests([
    {
        name: "Avro to JSON: no input (force JSON true)",
        input: "",
        expectedOutput: "Please provide an input.",
        recipeConfig: [
            {
                op: "Avro转JSON",
                args: [true]
            }
        ],
    },
    {
        name: "Avro to JSON: no input (force JSON false)",
        input: "",
        expectedOutput: "Please provide an input.",
        recipeConfig: [
            {
                op: "Avro转JSON",
                args: [false]
            }
        ],
    },
    {
        name: "Avro to JSON: small (force JSON true)",
        input: "\x4f\x62\x6a\x01\x04\x16\x61\x76\x72\x6f\x2e\x73\x63\x68\x65\x6d\x61\x96\x01\x7b\x22\x74\x79\x70\x65\x22\x3a\x22\x72\x65" +
            "\x63\x6f\x72\x64\x22\x2c\x22\x6e\x61\x6d\x65\x22\x3a\x22\x73\x6d\x61\x6c\x6c\x22\x2c\x22\x66\x69\x65\x6c\x64\x73\x22\x3a" +
            "\x5b\x7b\x22\x6e\x61\x6d\x65\x22\x3a\x22\x6e\x61\x6d\x65\x22\x2c\x22\x74\x79\x70\x65\x22\x3a\x22\x73\x74\x72\x69\x6e\x67" +
            "\x22\x7d\x5d\x7d\x14\x61\x76\x72\x6f\x2e\x63\x6f\x64\x65\x63\x08\x6e\x75\x6c\x6c\x00\x4e\x02\x47\x63\x2e\x37\x02\xe5\xb7" +
            "\x5c\xda\xb9\xa6\x2f\x15\x41\x02\x0e\x0c\x6d\x79\x6e\x61\x6d\x65\x4e\x02\x47\x63\x2e\x37\x02\xe5\xb7\x5c\xda\xb9\xa6\x2f" +
            "\x15\x41",
        expectedOutput: "{\n    \"name\": \"myname\"\n}",
        recipeConfig: [
            {
                op: "Avro转JSON",
                args: [true]
            }
        ],
    },
    {
        name: "Avro to JSON: small (force JSON false)",
        input: "\x4f\x62\x6a\x01\x04\x16\x61\x76\x72\x6f\x2e\x73\x63\x68\x65\x6d\x61\x96\x01\x7b\x22\x74\x79\x70\x65\x22\x3a\x22\x72\x65" +
            "\x63\x6f\x72\x64\x22\x2c\x22\x6e\x61\x6d\x65\x22\x3a\x22\x73\x6d\x61\x6c\x6c\x22\x2c\x22\x66\x69\x65\x6c\x64\x73\x22\x3a" +
            "\x5b\x7b\x22\x6e\x61\x6d\x65\x22\x3a\x22\x6e\x61\x6d\x65\x22\x2c\x22\x74\x79\x70\x65\x22\x3a\x22\x73\x74\x72\x69\x6e\x67" +
            "\x22\x7d\x5d\x7d\x14\x61\x76\x72\x6f\x2e\x63\x6f\x64\x65\x63\x08\x6e\x75\x6c\x6c\x00\x4e\x02\x47\x63\x2e\x37\x02\xe5\xb7" +
            "\x5c\xda\xb9\xa6\x2f\x15\x41\x02\x0e\x0c\x6d\x79\x6e\x61\x6d\x65\x4e\x02\x47\x63\x2e\x37\x02\xe5\xb7\x5c\xda\xb9\xa6\x2f" +
            "\x15\x41",
        expectedOutput: "{\"name\":\"myname\"}\n",
        recipeConfig: [
            {
                op: "Avro转JSON",
                args: [false]
            }
        ],
    }
]);
