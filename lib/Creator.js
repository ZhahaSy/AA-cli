// 创建器：用于通过对话生成用户的项目配置
class Creator {
  constructor(name, targetDir) {
    this.name = name
    this.targetDir = targetDir
  }

  create() {
    const {name, targetDir} = this;
  }
}

module.exports = Creator
