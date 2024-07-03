// node ./convert-upx.js 

import { ExternalConfigA, MiaodaBasicConfig } from "./m-types-copy/base/m-types-main";

const fs = require("fs");
const path = require("path");
const compressing = require("compressing");
const asar = require("asar");

// 检查命令行参数是否提供了要处理的文件路径
if (process.argv.length !== 3) {
  console.error("请提供要处理的文件路径作为命令行参数！");
  process.exit(1);
}

// 获取要处理的文件路径
const filePath = process.argv[2];

// 检查文件是否存在
if (!fs.existsSync(filePath)) {
  console.error(`文件 '${filePath}' 不存在！`);
  process.exit(1);
}

// 获取文件名和后缀名
const fileName = path.basename(filePath);
const fileExt = path.extname(fileName);

// 检查文件后缀是否为.upx
if (fileExt !== ".upx") {
  console.error("文件必须具有.upx扩展名！");
  process.exit(1);
}

// 解压.upx文件
async function upxExtract(upxPath) {
  try {
    const folderPath = upxPath.replace(".upx", "");
    console.log('folderPath:', folderPath);
    await compressing.gzip.uncompress(upxPath, folderPath + ".asar");
    console.log("已解压.gz文件");

    // 使用asar库解压.asar文件
    await asar.extractAll(folderPath + ".asar", folderPath);
    console.log("已解压.asar文件");

    const pluginJson = path.join(folderPath, "plugin.json");
    if(!fs.existsSync(pluginJson)) {
      console.error("未找到plugin.json文件！");
      process.exit(1);
    }else{
      console.log("找到plugin.json文件！");
    }
    // jsdoc
    const thePlugin:ExternalConfigA = JSON.parse(fs.readFileSync(pluginJson, "utf-8"));
    const newConfig:MiaodaBasicConfig = {
      id: thePlugin.name,
      version: thePlugin.version,
      name: thePlugin.pluginName,
      shortDesc: thePlugin.description,
      description: "",
      development: {
        entryLink: ""
      },
      runtime: {
        type: "external-config-a",
        external_CFG_A: thePlugin
      },
      include: [],
      menus: [
        // TODO: show the menus
        // {
        //   id: thePlugin.pluginName,
        //   name: thePlugin.pluginName,
        //   icon: "extension",          
        // }
      ]
    }
    const miaodaDistFile = path.join(folderPath, "miaoda-dist.json");
    fs.writeFileSync(miaodaDistFile, JSON.stringify(newConfig, null, 2));
    console.log("已生成miaoda-dist.json文件");
  } catch (error) {
    console.error("处理文件时出错:", error);
    process.exit(1);
  }
}

upxExtract(filePath);
