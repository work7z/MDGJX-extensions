import helloWorld from "./ext/hello-world";
import lodash from "./ext/lodash";
import _ from "lodash";
import { MiaodaBasicConfig } from "./m-types-copy/base/m-types-main";
import path from "path";
import fs from 'fs'

const extList: {
    [key: string]: MiaodaBasicConfig;
} = {
    lodash,
    helloWorld,
};

console.log(JSON.stringify(extList));
const MDGJX_EXT_ROOT = process.env.MDGJX_EXT_ROOT;

_.forEach(extList, (x, d, n) => {
    console.log('processing '+x.id)
    const currentCwd = x.cwd || path.join(MDGJX_EXT_ROOT, "extensions", x.id);
    const finalMiaodaDistFile = path.join(currentCwd, "miaoda-dist.json");
    console.log('writing file to '+finalMiaodaDistFile);
    fs.writeFileSync(finalMiaodaDistFile, JSON.stringify(x, null, 2))
});
