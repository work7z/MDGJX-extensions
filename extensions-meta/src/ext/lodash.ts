import {
  fn_miaoda_registerConfig,
} from "../m-types-copy/base/m-types-main";

export default fn_miaoda_registerConfig({
  mode: "miaoda",
  disabled: true,
  name: "Lodash文档访问",
  id: "lodash",
  version: "1.0.0",
  logo: "./assets/icon.png",
  shortDesc: "你好，世界！这是测试模板。",
  description: "# 这是基本的描述内容，后续可以通过@REAEDME的方式进行额外扩展",
  development: {
    entryLink: "http://localhost:40001",
    setup: {
      dev: "npm i -S -D --verbose --force",
      prod: "npm i --omit=dev --force",
    },
    run: {
      dev: "npm run dev",
      prod: "npm run build",
    },
  },
  menus: "node ./miaoda-get-menu.js",
  keywords: [],
  include: ["dist"],
});