import { EXT_VIEW_PREFIX, fn_miaoda_registerConfig } from "../m-types-copy/base/m-types-main";

export default fn_miaoda_registerConfig({
  name: "测试模板 - Hello World",
  disabled: true,
  id: "hello-world",
  version: "1.0.3",
  logo: "./assets/icon.png",
  shortDesc: "你好，世界！这是测试模板。",
  description: "# 这是基本的描述内容，后续可以通过@REAEDME的方式进行额外扩展",
  development: {
    entryLink: "http://localhost:40001",
  },
  runtime: {
    type: "web-static-standalone",
    embedded: {
      staticDirs: ['.'],
      baseUrl: EXT_VIEW_PREFIX+'/hello-world'
    }
  },
  menus: [],
  keywords: [],
  include: ["dist"],
});
