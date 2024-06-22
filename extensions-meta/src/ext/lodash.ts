import { fn_miaoda_registerConfig } from "../m-types-copy/base/m-types-main";

export default fn_miaoda_registerConfig({
  disabled: true,
  name: "Lodash文档访问",
  id: "lodash",
  version: "1.0.0",
  logo: "./assets/icon.png",
  shortDesc: "你好，世界！这是测试模板。",
  description: "# 这是基本的描述内容，后续可以通过@REAEDME的方式进行额外扩展",
  development: {
    entryLink: "http://localhost:40001",
  },
  runtime: {
    type: "web-static-standalone",
    standalone: {
      ports: [62003],
      onlineURL: "https://ext-lodash.mdgjx.com",
    },
  },
  menus: [],
  keywords: [],
  include: ["dist"],
});
