module.exports = async (api, options, pkg, files) => {
  const dependencies = {
    '@ant-design/icons-vue': '^6.1.0',
    'ant-design-vue': '^3.2.2',
    vue: '^3.2.33',
    vite: '^2.9.7',
    axios: '^0.27.2',
    '@vitejs/plugin-vue': '^2.3.1',
  }
  // 写 package.json
  api.extendPackage(pkg, {
    husky: {
        hooks: {
          'commit-msg': 'node scripts/verifyCommit.js',
        },
      },
      dependencies,
      devDependencies: {
        autoprefixer: '^10.4.7',
        chalk: '4',
        husky: '4.3.7',
        'lint-staged': '^12.4.1',
        postcss: '^8.4.13',
        'unplugin-vue-components': '^0.19.3',
      },
  })
  api.extendPackage({
    scripts: {
      docs: 'vitepress dev docs',
      'docs:build': 'vitepress build docs',
      'docs:serve': 'vitepress serve docs',
      start: 'vite',
      // @TODO ts 需要修改的部分
      //   'build:uat': api.hasPlugin('typescript') ? 'vue-tsc --noEmit && vite build --mode uat' : 'vite build --mode uat',
      'build:uat': 'vite build --mode uat',
    //   @TODO ts 需要修改的部分
    //   build: api.hasPlugin('typescript') ? 'vue-tsc --noEmit && vite build' : 'vite build',
      build: 'vite build',
      preview: 'vite preview',
    },
    browserslist: ['> 1%', 'last 2 versions', 'not dead', ['not ie 11']],
  })

  // 写文件
  await api.render('./template', {
    ...options
  }, files)
  console.log(1111);
}
