#! /usr/bin/env node
const inquirer = require('inquirer');
const path = require('path');
const fs = require('fs');
const ejs = require('ejs');

inquirer.prompt([
  {
    type: 'input', //type： input, number, confirm, list, checkbox ... 
    name: 'name', // key 名
    message: 'Your name', // 提示信息
    default: 'my-node-cli' // 默认值
  }
]).then(answers => {
  // 打印互用输入结果
  const destUrl = path.join(__dirname, 'templates');

  const cwdUrl = process.cwd();

  fs.readdir(destUrl, (err, files) => {
    if (err) throw err;
    files.forEach(file => {
      ejs.renderFile(path.join(destUrl, file), answers).then(data => {
        fs.writeFileSync(path.join(cwdUrl, file), data);
      })
    });
  })
  console.log(answers)
})
