// node ./convert-upx.js

import _ from "lodash";
import {
  ExternalConfigA,
  MiaodaBasicConfig,
  SystemSubModuleItem,
} from "./m-types-copy/base/m-types-main";

const fs = require("fs");
const path = require("path");
const compressing = require("compressing");
const asar = require("asar");
const TinyPinyin = require("tiny-pinyin");

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

// const upxStaticFilesDir = path.join(
//   process.env.MDGJX_EXT_ROOT+'',
//   'external',
//   'upx-static-files',
//   'logos'
//  )

// // if upx-static-files dir not exists, create it
// if (!fs.existsSync(upxStaticFilesDir)) {
//   fs.mkdirSync(upxStaticFilesDir, { recursive: true });
// }

// 解压.upx文件
async function upxExtract(upxPath) {
  try {
    const folderPath = upxPath.replace(".upx", "");
    console.log("folderPath:", folderPath);
    await compressing.gzip.uncompress(upxPath, folderPath + ".asar");
    console.log("已解压.gz文件");

    // 使用asar库解压.asar文件
    await asar.extractAll(folderPath + ".asar", folderPath);
    console.log("已解压.asar文件");

    const pluginJson = path.join(folderPath, "plugin.json");
    if (!fs.existsSync(pluginJson)) {
      console.error("未找到plugin.json文件！");
      process.exit(1);
    } else {
      console.log("找到plugin.json文件！");
    }

    // jsdoc
    const thePlugin: ExternalConfigA = JSON.parse(
      fs.readFileSync(pluginJson, "utf-8")
    );
    const eachToolNavInfo = thePlugin;
    const extIdInEnName = _.toLower(
      TinyPinyin.convertToPinyin(eachToolNavInfo.pluginName) +
        "-" +
        eachToolNavInfo.version
    );
    const logoFile = path.join(folderPath, eachToolNavInfo.logo);
    if(!fs.existsSync(logoFile)) {
      console.error("未找到logo文件，请检查 "+logoFile);
      process.exit(1);
    }else{
      console.log("找到logo文件，复制中！");
      // copy logoFile to folderPath/logo.<ext>
      fs.copyFileSync(logoFile, path.join(folderPath, "logo."+(
        eachToolNavInfo.logo.split(".").pop()
      )));
    }
    const newConfig: MiaodaBasicConfig = {
      id: thePlugin.name,
      version: thePlugin.version,
      name: thePlugin.pluginName,
      shortDesc: thePlugin.description,
      description: "",
      development: {
        entryLink: "",
      },
      runtime: {
        type: "external-config-a",
        external_CFG_A: thePlugin,
      },
      include: [],
      menus: [
        {
          id: "p-" + extIdInEnName,
          iconInStr: "Tools", // 应该用真实的icon来显示
          belongTo: "tools",
          name: "" + eachToolNavInfo.pluginName,
          children: [
            {
              id: extIdInEnName,
              iconInStr: "AppWindows",
              disableFooter: true,
              name: eachToolNavInfo.pluginName,
              moduleItemtURL: `/ext-view/${extIdInEnName}`,
              keywords: [],
              description: eachToolNavInfo.description,
            } satisfies SystemSubModuleItem,
          ],
        } satisfies SystemSubModuleItem,
      ],
    };
    const miaodaDistFile = path.join(folderPath, "miaoda-dist.json");
    fs.writeFileSync(miaodaDistFile, JSON.stringify(newConfig, null, 2));
    console.log("已生成miaoda-dist.json文件");
  } catch (error) {
    console.error("处理文件时出错:", error);
    process.exit(1);
  }
}

upxExtract(filePath);
