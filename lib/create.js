const path = require('path')
const fse = require('fs-extra')
const inquirer = require('inquirer')

const Creator = require('./Creator')
const create =  async function (name, options) {
  const cwd = process.cwd()
  const targetAir = path.join(cwd, name)

  if (fse.existsSync(targetAir)) {
    if (options.force) {
      await fse.remove(targetAir)
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
            },
          ],
        },
      ])

      if (!action) {
        return
      } else if (action === 'overwrite') {
        // 移除已存在的目录
        console.log(`\r\nRemoving...`)
        await fse.remove(targetAir)
      }
    }
  }

  const creator = new Creator(name, targetAir)

  creator.create()
  // console.log('>>>> create.js', name, options);
}

 module.exports = (name, options) => {
  create(name, options)
 }
