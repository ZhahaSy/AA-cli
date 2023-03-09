exports.munualPrompt = [
  {
    name: 'useVite',
    message: '是否使用vite',
    type: 'confirm',
    default: true,
  },
  {
    name: 'useTs',
    message: '是否使用ts',
    type: 'confirm',
    default: true,
  },
  {
    name: 'store',
    message: '请选择状态管理工具',
    type: 'list',
    choices: [
      {
        name: 'vuex',
        value: 'vuex',
      },
      {
        name: 'pinia',
        value: 'pinia',
      },
    ],
  },
  {
    name: 'components',
    message: '请选择组件库',
    type: 'list',
    choices: [
      {
        name: 'ant-design-vue',
        value: 'antd-v',
      },
      {
        name: 'pro-components-vue(基于antd-v的业务组件)',
        value: 'procomp-v',
      },
    ],
  },
]

// vue 后台管理系统
const ManagementVue = {
  isTemplate: true,
  httpUrl: 'https://github.com/PanJiaChen/vue-element-admin.git',
  sshUrl: 'git@github.com:PanJiaChen/vue-element-admin.git',
}

// vue 移动端
const MobileVue = {
  isTemplate: true,
  httpUrl: 'https://github.com/frontend-qin/vue-vant-mobile.git',
  sshUrl: 'git@github.com:frontend-qin/vue-vant-mobile.git',
}

// node项目
const library = {
  isTemplate: true,
  httpUrl: '',
  sshUrl: '',
}

// 谷歌插件
const chromeExtension = {
  isTemplate: true,
  httpUrl: 'https://github.com/GoogleChrome/chrome-extensions-samples.git',
  sshUrl: 'git@github.com:GoogleChrome/chrome-extensions-samples.git',
}

exports.defaults = {
  '后台管理系统(vue)': {
    ...ManagementVue,
  },
  '移动端(vue)': {
    ...MobileVue,
  },
  library: {
    ...library,
  },
  谷歌插件: {
    ...chromeExtension,
  },
}
