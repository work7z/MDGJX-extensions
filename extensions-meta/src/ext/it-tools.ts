import { fn_miaoda_registerConfig } from "../m-types-copy/base/m-types-main";

// Note: 目前基于最后一次成功commit进行编译，commit-id: 0cd3d77

export default fn_miaoda_registerConfig({
  name: "it-tools中文版",
  id: "it-tools",
  version: "1.0.3",
  logo: "./assets/icon.png",
  shortDesc:"本插件提供了丰富的常用工具，例如通用格式转换、web工具、加密解密、编码解码、文本处理等，更重要的是，它有良好的中文支持，让您开发代码起来如虎添翼！",
  homepage: ["https://github.com/work7z/MDGJX"],
  authors: ["Raka-loah"],
  description: "",
  development: {
    entryLink: "http://localhost:40001",
  },
  menus: [],
  runtime: {
    type: 'web-static-embedded',
    embedded: {
      staticDirs: ['.'],
      baseUrl: '/xtools'
    }
  },
  keywords: [],
  include: ["dist"],
});
