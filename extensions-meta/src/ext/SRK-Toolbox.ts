import { fn_miaoda_registerConfig } from "../m-types-copy/base/m-types-main";

// Note: 目前基于最后一次成功commit进行编译，commit-id: 0cd3d77
const baseURL = "/ext-view/srk";

export default fn_miaoda_registerConfig({
  name: "CyberChef工具集",
  id: "SRK-Toolbox",
  version: "1.1.0",
  iconInStr: "BrandSupabase",
  logo: "./assets/icon.png",
  shortDesc:
    "本插件可以帮助您轻松处理各类格式转换，包括广泛的编码和解码操作，包括Base64、URL编码、HTML实体编码等。",
  homepage: ["https://github.com/Raka-loah/SRK-Toolbox"],
  authors: ["Raka-loah"],
  description: "",
  development: {
    entryLink: "http://localhost:40001",
  },
  menus: [
    {
      id: "srk",
      iconInStr: "BrandSupabase",
      belongTo: "tools",
      name: "CyberChef基础",
      children: [
        {
          id: "main",
          iconInStr: "BrandSupabase",
          disableFooter: true,
          name: "流程入口",
          moduleItemtURL: `${baseURL}/`,
          keywords: ["CyberChef", "SRK", "转换", "转换工具流", "工具","基础"],
          description: `本功能提供CyberChef基础转换的流程入口。`
        },
      ],
    },
  ],
  runtime: {
    // type: "web-static-standalone",
    // standalone: {
    //   ports: [62001],
    //   onlineURL: "https://cyberchef.mdgjx.com",
    // },
    type: "web-static-embedded",
    embedded: {
      staticDirs: ["."],
      baseUrl: baseURL,
    },
  },
  keywords: [],
  include: ["dist"],
});
