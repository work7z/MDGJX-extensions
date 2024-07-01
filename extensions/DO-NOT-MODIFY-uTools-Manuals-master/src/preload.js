const { clipboard } = require('electron');
const { exec } = require('child_process');
const crypto = require('crypto')
const fs = require('fs');

fofoCommon = require('./common').fofo

open = url => {
    mdgjx.shellOpenExternal(url);
}

dirname = __dirname;

isWin = process.platform == 'win32' ? true : false;

openFolder = () => {
    return mdgjx.showOpenDialog({ 
        buttonLabel: '选择',
        properties: ['openDirectory']
    });
}

readFile = file => 
    new Promise((reslove, reject) => {
        fs.readFile(file, 'utf8', (err, data) => {
            if (err) reject(err);
            reslove(data);
        });
    });

exists = path => {
    return fs.existsSync(path);
}

readDir = (path,callback) => {
    fs.readdir(path, (err, files) => {
        callback(err, files);
    });
}

dash = query => {
    var cmd;
    if (mdgjx.isWindows()) {
        cmd = 'start'
    } else if (mdgjx.isLinux()) {
        cmd = 'zeal'
    } else {
        cmd = 'open'
    }
    cmd = cmd + ` dash://${query}`
    exec(cmd, (err, stdout, stderr) => {
      err && mdgjx.showNotification(stderr);
    });
}

copyTo = text => {
    clipboard.writeText(text)
}

copy = () => {
    var ctlKey = isWin ? 'control' : 'command';
    mdgjx.simulateKeyboardTap('c', ctlKey);
}

paste = () => {
    var ctlKey = isWin ? 'control' : 'command';
    mdgjx.simulateKeyboardTap('v', ctlKey);
}

rc4 = (text, key) => {
    var decipher = crypto.createDecipher('rc4', key);
    var result = decipher.update(text, 'base64', 'utf8');
    result += decipher.final('utf8');
    return result
}