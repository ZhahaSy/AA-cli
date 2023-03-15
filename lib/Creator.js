// 创建器：用于通过对话生成用户的项目配置并调用 generator生成项目&&初始化项目
const { prompt, default: inquirer } = require('inquirer')
const { defaults, munualPrompt } = require('./config')
const fs = require('fs-extra')
const path = require('path')
const chalk = require('chalk')
const execa = require('execa')
const { logWithSpinner, stopSpinner, failSpinner } = require('./utils/spanner')
const figlet = require('figlet')

class Creator {
  constructor(name, context) {
    this.name = name
    this.context = context
  }

  createSuccess() {
    console.log()
    console.log(chalk.green(figlet.textSync('AA CLI')))
    console.log(`🎉 已成功创建项目：${chalk.yellow(this.name)}`)
    console.log('👉 请使用以下命令运行项目：')
    console.log()
    console.log(chalk.cyan(` $ cd ${this.name}`))
    // console.log(chalk.cyan(` $ npm install`))
    console.log(chalk.cyan(' $ npm run start'))
    console.log()
  }

  

  async run(command, args) {
    // 在context目录下执行命令
    return execa(command, args, { cwd: this.context, stdio: ['inherit', 'pipe', 'pipe'] })
  }
  async cloneFromPreset(preset, downloadType) {
    fs.mkdirSync(this.context)

    this.run('git', ['clone', downloadType === 'ssh' ? preset.sshUrl : preset.httpUrl])
      .then((res) => {
        logWithSpinner(`✨ 正在 ${chalk.yellow(this.context)} 文件夹下创建项目。`)

        /**
         * 获取到当前下载 repo 内容所在的路径
         */
        const repoSuffix = preset.httpUrl.split('/')
        const repoName = repoSuffix.pop()?.split('.')[0]
        const currentRepoPath = path.resolve(this.context, repoName)
        /**
         * 根据 repo 路径找到目录下所有的文件进行遍历
         *  将文件 / 文件夹移动到 this.context 目录下
         *  移动完成后，删除 repo 目录
         */
        const repoFiles = fs.readdirSync(currentRepoPath)
        repoFiles.forEach((filename) => {
          if (filename === '.git') return
          fs.moveSync(path.resolve(currentRepoPath, filename), path.resolve(this.context, filename))
        })
        fs.removeSync(currentRepoPath)
        stopSpinner()
        this.createSuccess()
      })
      .catch(async (error) => {
        if (error.message?.indexOf('Access denied') >= 0 || error.massage?.indexOf('Authentication failed') >= 0) {
          failSpinner(chalk.cyan('用户名或密码验证失败，请重新输入'))
          await fs.remove(this.context)
          this.cloneFromPreset(preset, downloadType)
        } else {
          failSpinner(chalk.cyan('模板下载失败，自动重试中。。。'))
          console.log(error);
          // this.downloadRepo(preset, downloadType)
          // TODO：失败后，重试3次
        }
      })
  }

  async downloadGitRepo(preset) {
    let {downloadType} = await prompt([
      {
        type: 'list',
        name: 'downloadType',
        message: '请选择下载方式',
        choices: [
          {
            name: 'ssh',
          value: 'ssh'
          },
          {
            name: 'url',
          value: 'url'
          }
        ]
      },
    ])
    this.cloneFromPreset(preset, downloadType)
  }

  async getConfig(prompts) {
    let res = await prompt(prompts)
    return res
  }

  resolveIntroPrompts() {
    const presetChoices = Object.entries(defaults).map(([name]) => {
      let displayName = name
      if (name === 'default') {
        displayName = `Default (${chalk.green('typescript, router, pinia, less, linter')})`
      }
      if (name === 'library') {
        displayName = '插件模版'
      }
      return {
        name: `${displayName}`,
        value: name,
      }
    })
    return [
      ...presetChoices,
      {
        name: '手动选择',
        value: 'mumual',
      },
    ]
  }

  async create() {
    const { name, context } = this

    let answer = await this.getConfig([
      {
        type: 'list',
        name: 'preset',
        message: '请选择预设模板',
        choices: this.resolveIntroPrompts(),
      },
    ])

    switch (answer.preset) {
      case 'manual':
        let pkg = {
          name: name,
          version: '0.0.1',
          pravide: true,
          devDependencies: {},
        }
        let config = await this.getConfig(munualPrompt)
        break
      case 'library':
        break

      default:
       this.downloadGitRepo(defaults[answer.preset])
        break
    }
  }
}

module.exports = Creator
