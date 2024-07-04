import fs from "fs";
import _ from "lodash";

const file = "D:\\huanmin\\dictjson-mini.json";
const a = Date.now();
console.log("test db load start: " + a);

const dictJSONVal = JSON.parse(
  fs.readFileSync(file, { encoding: "utf-8" })
).all;
const b = Date.now();
console.log("test db load start end: " + b);
console.log("diff: " + (b - a));
console.log("diff seconds: " + (b - a) / 1000);

const runAsyncWithTimeCount = async (name: string, fn) => {
  const a = Date.now();
  console.log(`[${name}] started`);
  await fn();
  const b = Date.now();
  console.log(
    `[${name}] completed, spent ${((b - a) / 1000).toFixed(2)}s, ${b - a}ms`
  );
};

(async () => {
  await runAsyncWithTimeCount("case-1", async () => {
    console.log("size is " + _.size(dictJSONVal));
    console.log("first item is " + JSON.stringify(_.first(dictJSONVal)));
  });
  await runAsyncWithTimeCount("case-2", async () => {
    const need = _.find(
      dictJSONVal,
      (x) => (x.sw + "").indexOf("coord") !== -1
    );
    console.log("find item " + JSON.stringify(need));
  });
  await runAsyncWithTimeCount("case-3", async () => {
    const findAllRecords = [];
    _.every(dictJSONVal, (x, d, n) => {
      if ((x.sw + "").indexOf("limit") !== -1) {
        findAllRecords.push(x);
      }
      return _.size(findAllRecords) < 10;
    });
    console.log("find item count" + _.size(findAllRecords));
  });

    await runAsyncWithTimeCount("case-4", async () => {
      const findAllRecords = [];
      _.every(dictJSONVal, (x, d, n) => {
        if ((x.sw + "").indexOf("limit") !== -1) {
          findAllRecords.push(x);
        }
        return true;
      });
      console.log("find item count" + _.size(findAllRecords));
    });

  
})();
