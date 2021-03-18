const fs = require('fs');
const path = require('path');

const ChromeExtension = require('crx');

const manifest = require('./manifest.json');

const packName = '辅助发货易打单插件';

const crxPath = path.resolve(__dirname, './crx/');
const buildPath = path.resolve(__dirname, './dist');
const buildPem = path.resolve(__dirname, './dist.pem');

var deleteFolderRecursive = function(path) {
  if (fs.existsSync(path)) {
    fs.readdirSync(path).forEach(function(file, index) {
      var curPath = path + '/' + file;
      if (fs.lstatSync(curPath).isDirectory()) {
        // recurse
        deleteFolderRecursive(curPath);
      } else {
        // delete file
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(path);
  }
};

deleteFolderRecursive(crxPath);

const privateKey = fs.readFileSync(buildPem);

function buildLikeChromeCrx() {
  const crx = new ChromeExtension({
    // 私钥
    privateKey,
    // 版本指定2，否则国产浏览器无法安装
    version: 2,
  });

  return crx
    .load(buildPath)
    .then((crx) => crx.pack())
    .then((crxBuffer) => {
      // crx 给国产浏览器使用
      fs.writeFile(
        path.resolve(crxPath, `./${packName}${manifest.version}.crx`),
        crxBuffer,
        (err) => {
          err && console.log(err);
        }
      );

      console.log(`打包国产浏览器crx完成`);
    });
}

function buildChromeCrx() {
  const crx = new ChromeExtension({
    // 私钥
    privateKey,
    version: 3,
  });

  return crx
    .load(buildPath)
    .then((crx) => crx.pack())
    .then((crxBuffer) => {
      // crx 单独给chrome浏览器使用
      fs.writeFile(
        path.resolve(crxPath, `./${packName}${manifest.version}.zip`),
        crxBuffer,
        (err) => {
          err && console.log(err);
        }
      );

      console.log(`打包谷歌zip完成`);
    });
}

// function buildVersionFile() {
//   fs.writeFile(
//     path.resolve(crxPath, `./version.json`),
//     JSON.stringify({ version: manifest.version }),
//     (err) => {
//       err && console.log(err);
//     }
//   );
// }

async function task() {
  console.log(`当前打包版本为: ${manifest.version}`);

  try {
    fs.mkdirSync('./crx/');

    // buildVersionFile();

    await buildLikeChromeCrx();

    await buildChromeCrx();
  } catch (error) {
    console.log('打包失败');
  }
}

task();
