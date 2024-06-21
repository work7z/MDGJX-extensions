import _ from "lodash";
import {
  MiaodaBasicConfig,
  REGISTER_CONFIG_OBJ,
} from "./m-types-copy/base/m-types-main";
import path from "path";
import fs from "fs";

// EXT LIST BEGIN
import "./ext/hello-world";
import "./ext/lodash";
import "./ext/nested-codegen-web";
// EXT LIST END

const extList: {
  [key: string]: MiaodaBasicConfig;
} = {};
_.forEach(REGISTER_CONFIG_OBJ, (x, d, n) => {
  extList[x.id] = x;
});

console.log(JSON.stringify(extList));
const MDGJX_EXT_ROOT = process.env.MDGJX_EXT_ROOT;
const prevIdObj = {};
const finalOutputMiaodaDistAllJson = [];
_.forEach(extList, (x, d, n) => {
  if (prevIdObj[x.id]) {
    throw new Error("id " + x.id + " is duplicated");
  }
  prevIdObj[x.id] = true;
  console.log("processing " + x.id);
  const currentCwd = x.cwd || path.join(MDGJX_EXT_ROOT, "extensions", x.id);
  const finalMiaodaDistFile = path.join(currentCwd, "miaoda-dist.json");
  console.log("writing file to " + finalMiaodaDistFile);
  fs.writeFileSync(finalMiaodaDistFile, JSON.stringify(x));
  finalOutputMiaodaDistAllJson.push(x);
});

const miaodaDistAllFile = path.join(
  MDGJX_EXT_ROOT,
  "extensions-meta",
  "miaoda-dist-all.json"
);

fs.writeFileSync(
  miaodaDistAllFile,
  JSON.stringify(finalOutputMiaodaDistAllJson)
);
