import { fn_miaoda_registerConfig } from "../m-types-copy/base/m-types-main";
import { toolsNavInfo } from "./it-tools/toolNavInfo";

// Note: 目前基于最后一次成功commit进行编译，commit-id: 0cd3d77

export default fn_miaoda_registerConfig({
  name: "it-tools中文版",
  id: "it-tools",
  version: "1.0.3",
  logo: "./assets/icon.png",
  iconInStr:'Briefcase',
  shortDesc:
    "本插件提供了丰富的常用工具，例如通用格式转换、web工具、加密解密、编码解码、文本处理等，更重要的是，它有良好的中文支持，让您开发代码起来如虎添翼！",
  homepage: ["https://github.com/work7z/MDGJX"],
  authors: ["it-tools"],
  description: "",
  development: {
    entryLink: "http://localhost:25173/xtools",
  },
  menus:
    toolsNavInfo.map((x) => {
      return {
        id: x.id,
        name: x.name,
        icon: x.icon,
        iconInStr: x.iconInStr,
        belongTo: "tools",
        // TODO: map struct
        children: x.subTools.map((xx) => {
          return {
            id: xx.id,
            name: xx.name,
            icon: xx.icon,
          };
        }),
      };
    }) || [],
  runtime: {
    type: "web-static-embedded",
    embedded: {
      staticDirs: ["."],
      baseUrl: "/ext-view/xtools",
    },
  },
  keywords: [],
  include: ["dist"],
});
