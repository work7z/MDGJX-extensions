import { fn_miaoda_registerConfig, SystemSubModuleItem } from "../m-types-copy/base/m-types-main";
import { toolsNavInfo } from "./it-tools/toolNavInfo";

// Note: 目前基于最后一次成功commit进行编译，commit-id: 0cd3d77

const baseURL = "/ext-view/xtools";

export default fn_miaoda_registerConfig({
  name: "it-tools中文版",
  id: "it-tools",
  sortOrder:1,
  version: "1.0.6",
  logo: "./assets/icon.png",
  iconInStr: 'Briefcase',
  shortDesc:
    "本插件提供了丰富的常用工具，例如通用格式转换、web工具、加密解密、编码解码、文本处理等，更重要的是，它有良好的中文支持，让您开发代码起来如虎添翼！",
  homepage: ["https://github.com/work7z/MDGJX"],
  authors: ["it-tools"],
  description: "",
  development: {
    entryLink: "http://localhost:25173/ext-view/xtools",
  },
  menus: [
    ...(toolsNavInfo.map(eachToolNavInfo => {
      return {
        id: eachToolNavInfo.id,
        iconInStr: eachToolNavInfo.iconInStr || 'Briefcase',
        belongTo: 'tools',
        name: eachToolNavInfo.name,
        children: (eachToolNavInfo.subTools || []).map(eachSubTool => {
          const idval = eachSubTool.id + ''
          return {
            id: idval,
            iconInStr: eachSubTool?.icon?.name || 'AppWindows',
            disableFooter: true,
            name: eachSubTool.name,
            moduleItemtURL: `${baseURL}/${idval}`,
            keywords: eachSubTool.keywords,
            description: eachSubTool.description,
          } satisfies SystemSubModuleItem
        }),
      } satisfies SystemSubModuleItem
    })
    )
  ],
  runtime: {
    type: "web-static-embedded",
    embedded: {
      staticDirs: ["."],
      baseUrl: baseURL,
    },    
  },
  keywords: [],
  include: ["dist"],
});
