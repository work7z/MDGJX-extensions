import { fn_miaoda_registerConfig } from "../m-types-copy/base/m-types-main";

export default fn_miaoda_registerConfig({
  mode: "miaoda",
  name: "CodeGen工具箱",
  id: "nested-codegen-web",
  version: "1.0.0",
  logo: "./assets/icon.png",
  shortDesc: "欢迎老用户关注，CodeGen工具箱原旧功能将继续在这里提供",
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
