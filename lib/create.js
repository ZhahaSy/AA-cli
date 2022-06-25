const path = require('path');
const fse = require('fs-extra');
const inquirer = require('inquirer');

const Genarator = require('./Generator');

module.exports = async function (name, options) {

  const cwd = process.cwd();
  console.log(cwd);

  const targetAir = path.join(cwd, name);

  if (fse.existsSync(targetAir)) {

    if (options.force) {
      await fse.remove(targetAir);
    } else {
      let { action } = await inquirer.prompt([
        {
          name: 'action',
          type: 'list',
          message: 'Target directory already exists Pick an action:',
          choices: [
            {
              name: 'OverWrite',
              value: 'overwrite',
            },
            {
              name: 'Cancel',
              value: false,
            }
          ]
        }
      ])

      if (!action) {
        return;
      } else if (action === 'overwrite') {
        // 移除已存在的目录
        console.log(`\r\nRemoving...`)
        await fse.remove(targetAir);
      }
    }

  }

  const generator = new Generator(name, targetAir);

  generator.create()
  // console.log('>>>> create.js', name, options);
};