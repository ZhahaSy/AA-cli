const GenerateApi = require('./GenerateApi')

// 生成器 用于根据用户配置生成项目
class Genarator {
 constructor(config, pkg) {
    this.config = config;
    this.pkg = pkg;
    this.genarateCallback = GenerateApi.getGenarateCallback({
      useTs: config.useTs,
      useLinter: config.useLinter,
      usePinia: config.store === 'pinia' || undefined,
      useVuex: config.store === 'vuex' || undefined,
      // useLess: config.cssPre === 'Less' || undefined,
      // useSass: config.cssPre === 'Sass' || undefined
    })
 }

 genarate() {

 }
}

module.exports = Genarator;