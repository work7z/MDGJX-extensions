import fs from "fs";
import path from "path";
import tmp_cyberchefJSON from "./cyberchef";
import { SystemSubModuleItem } from "@/m-types-copy/base/m-types-main";
const cyberchefJSON = tmp_cyberchefJSON as StVal;
import _ from "lodash";
import py from "tiny-pinyin";

const tmp_convertArg = (arg) => {
  if (arg.type === "option") {
    // pick default option if not already chosen
    return typeof arg.value === "string" ? arg.value : arg.value[0];
  }

  if (arg.type === "editableOption") {
    return typeof arg.value === "string" ? arg.value : arg.value[0].value;
  }

  if (arg.type === "toggleString") {
    // ensure string and option exist when user hasn't defined
    arg.string = arg.string || "";
    arg.option = arg.option || arg.toggleValues[0];
    return arg;
  }

  return arg.value;
};

const convertArg = (arg) => {
  let v = tmp_convertArg(arg);
  if (_.isString(v)) {
    return `'${v.replace(/'/g, "\\'")}'`;
  } else {
    return v;
  }
};

type StVal = {
  categories: {
    name: string;
    ops: string[];
  }[];
  operations: {
    [key: string]: {
      args: {}[];
      description: string;
      infoURL: string;
      name: string;
    };
  };
};

console.log("cyberchef_file", cyberchefJSON);
export const baseURL = "/ext-view/srk";

let finArr: SystemSubModuleItem[] = _.values(
  cyberchefJSON.categories
    .filter(
      (x) =>
        x.name !== "收藏" &&
        x.name !== "流程控制" &&
        x.name !== "其他" &&  
        ["多媒体", ].indexOf(x.name) === -1
    )
    .map((category) => {
      if (category.name == "鉴定"){
        category.name = "其他常用工具"
      }
        if (category.name == "公钥") {
          category.name = "公私钥转换";
        }
      if (category.name == "算术 / 逻辑") {
        category.name = "算术与逻辑";
      }
      if (category.name == "日期 / 时间") {
        category.name = "日期时间转换";
      }
      if (category.name == "网络") {
        category.name = "网络格式解析";
      }
      if (category.name == "工具") {
        category.name = "字符串通用处理";
      }
      if (category.name == "加密算法") {
        category.name = "加密与解密";
      }
      if (category.name == "提取器") {
        category.name = "快速内容提取";
      }
      if (category.name == "压缩算法") {
        category.name = "常用压缩工具";
      }
      if (category.name == "哈希") {
        category.name = "摘要哈希工具";
      }
      if (category.name == "SRK Toolbox 专属") {
        category.name = "国内用户专属";
      }
      return {
        id: py.convertToPinyin(category.name),
        iconInStr: "BrandSupabase",
        name: category.name,
        children: _.values(
          category.ops.map((opName) => {
            const opConfig = cyberchefJSON.operations[opName];
            return {
              id: py.convertToPinyin(opName),
              iconInStr: "BrandSupabase",
              disableFooter: true,
              name: opName,
              moduleItemHashVal:
                opName + "(" + opConfig.args.map(convertArg).join(",") + ")",
              moduleItemtURL: `${baseURL}`,
              keywords: [
                "CyberChef",
                opName,
                opConfig.args.map((x) => x["name"]).join(","),
              ],
              description: _.truncate(
                opConfig.description.split("。")[0] + "。",
                {
                  length: 100,
                  omission: "...",
                }
              ),
            } as SystemSubModuleItem;
          })
        ),
      };
    })
);

_.forEach(finArr,x=>{
  const fromTo:{from:string,to:string}[] = [
    {
      from: '语言',
      to: '字符串通用处理'
    },
    {
      from: "公私钥转换",
      to: '加密与解密'
    },
    {
      from: '国内用户专属',
      to: '加密与解密'
    },
    {
      from: '算术与逻辑',
      to: '字符串通用处理'
    }
  ]
  for(const {from,to} of fromTo){
    if(x.name === from){
      const tmpChild = x.children
      x.children =[]
      finArr.find(y=>y.name === to).children.push(...tmpChild)
    }
  }
})

finArr= finArr.filter(x=>x.children.length>0)

export const menus = [
  // {
  //   id: "srk",
  //   iconInStr: "BrandSupabase",
  //   belongTo: "tools",
  //   name: "CyberChef基础",
  //   children: [
  //     {
  //       id: "main",
  //       iconInStr: "BrandSupabase",
  //       disableFooter: true,
  //       name: "首页",
  //       moduleItemtURL: `${baseURL}/`,
  //       keywords: ["CyberChef", "SRK", "转换", "转换工具流", "工具", "基础"],
  //       description: `本功能提供CyberChef基础转换的流程入口。`,
  //     },
  //   ],
  // },
  ...finArr,
] satisfies SystemSubModuleItem[];
