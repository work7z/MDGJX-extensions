import { fn_miaoda_registerConfig } from "../m-types-copy/base/m-types-main";

export default fn_miaoda_registerConfig({
  name: "CodeGen工具箱",
  id: "nested-codegen-web",
  disabled: true,
  version: "1.0.0",
  logo: "./assets/icon.png",
  shortDesc: "欢迎老用户关注，CodeGen工具箱原旧功能将继续在这里提供",
  description: "# 这是基本的描述内容，后续可以通过@REAEDME的方式进行额外扩展",
  development: {
    entryLink: "http://localhost:40001",
  },
  runtime:{
    type: 'web-static-standalone',
    standalone:{
      ports: [62002],
      onlineURL: "https://ext-nested-codegen-web.mdgjx.com"
    }
  },
  menus:[],
  keywords: [],
  include: ["dist"],
});
