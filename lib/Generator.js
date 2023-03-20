const GenerateApi = require('./GenerateApi')
const writeFileTree = require('./utils/writeFileTree')

// 生成器 用于根据用户配置生成项目
class Genarator {
 constructor(context, config, pkg) {
   this.context = context
   this.config = {
      useTs: config.useTs,
      useLinter: config.useLinter,
      usePinia: config.store === 'pinia' || undefined,
      useVuex: config.store === 'vuex' || undefined,
      useWatermark: true,
      useMock: true,
      useRouter: true,
      useLess: config.cssPre === 'Less' || undefined,
      // useSass: config.cssPre === 'Sass' || undefined
    };
    this.pkg = pkg;
    this.genarateCallback = GenerateApi.getGenarateCallback(this.config)
    // 生成的文件对象
    this.files = {}
 }
 run(command, args) {
  // 在context目录下执行命令
  return execa(command, args, { cwd: this.context, shell: true })
}


 async genarate() {
    for (let i = 0; i < this.genarateCallback.length; i++) {
      const cb = this.genarateCallback[i];
      await cb(GenerateApi, this.config, this.pkg, this.files)
    }
    await writeFileTree(this.context, this.files)
    logWithSpinner('正在安装其他依赖项。。。')
      // 更新package.json文件，添加新的依赖或者命令
      await this.run('npm install --force')
      stopSpinner()
 }
}

module.exports = Genarator;