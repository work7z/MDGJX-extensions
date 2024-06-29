# 如何生成这个cyberchef.txt?  

打开/src/main，然后F12

const ok = {
categories: window.app.categories,
    operations: window.app.operations
}
JSON.stringify(ok,null,0,2)


第二步，把它右键以JSON格式保存下来