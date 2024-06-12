import { MiaodaExtension, registerMiaoda } from "miaoda-api";

const extInfo: MiaodaExtension= {
    id: 'com.example',
    name: '测试示例',
    description: '这是一个测试示例的插件',
    version: '0.0.1' // 版本号由这里决定，而不是由package.json决定
}

registerMiaoda(extInfo);