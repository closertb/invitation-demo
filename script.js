const fs = require('fs');
const path = require('path');
const util = require('util');
const { exec } = require('child_process');
const pexec = util.promisify(exec);

const reg = /[\u4e00-\u9fa5]/;

function getCNText(file) {
  return new Promise((resolve, reject) => {
    fs.readFile(file, 'utf-8', (err, data) => {
      if (err) {
        reject(err);
        return;
      }
      let str = []
      for (let index = 0; index < data.length; index++) {
        const a = data[index];
        if (reg.test(a)) {
          str.push(a);
        }
      }
      
      resolve(str.join(''));
    });
  });
}

function readDir(file, fileList) {
  return new Promise((resolve, reject) => {
    fs.readdir(file, 'utf-8', async (err, data) => {
      if (err) {
        reject(err);
        return;
      }
      for (let index = 0; index < data.length; index++) {
        const item = data[index];
        const _file = path.resolve(file, item);
        let stat = fs.lstatSync(_file);
        if (stat.isDirectory() === true) { 
          await readDir(_file, fileList);
          continue;
        }
        if (/\.js$/.test(_file)) {
          fileList.push(_file);
        }
      }
      resolve(fileList);
    });
  }); 
}

async function start() {
  const data = await readDir('./src', []);
  const strs = [];

  for (let index = 0; index < data.length; index++) {
    const item = data[index];
    const text = await getCNText(item);
    strs.push(text);
  }

  const html = fs.readFileSync('./tmp-spider.html', 'utf-8').toString();
  let count = 0;
  const last = html.replace(/<body>123<\/body>/g, () => {    
    return `<body>${strs.map(str => {
      count += str.length;
      return `<div>${str}</div>`;
    }).join('')}</body>`;
  });

  // 创建新的html 文件
  fs.writeFileSync('./spider.html', last);
  // 拷贝新的font.ttf
  fs.copyFileSync('./src/assets/.font-spider/font.ttf', './font.ttf');
  // 执行 font-spider 命令
  await pexec(`font-spider ./spider.html`);
  // 拷贝文件到目标位置
  fs.copyFileSync('./font.ttf', './src/assets/font.ttf');
  // 清理文件
  await pexec(`rm -rf ./spider.html ./font.ttf`);
  console.log('all things done, includes word:', count);
}

start();
