const path = require('path')
const fs = require('fs')
const { isBinaryFileSync } = require('isbinaryfile')
const ejs = require('ejs')
const mergeDeps = require('./utils/mergeDeps')


const isObject = (val) => typeof val === 'object'
const isString = (val) => typeof val === 'string'

const templateConfig = {
  default: require('./templates/default/index'),
  useTs: require('./templates/typescript/index'),
  usePinia: require('./templates/pinia/index'),
  useVuex: require('./templates/vuex/index'),
  useLinter: require('./templates/linter/index'),
}

function extractCallDir() {
  const obj = {}
  Error.captureStackTrace(obj)
  const callSite = obj.stack.split('\n')[3]
  const namedStackRegExp = /\s\((.*):\d+:\d+\)$/
  const matchResult = callSite.match(namedStackRegExp)
  const fileName = matchResult[1]
  return path.dirname(fileName)
}
function renderFile(name, data) {
  if (isBinaryFileSync(name)) {
    return fs.readFileSync(name)
  }
  const template = fs.readFileSync(name, 'utf8')
  
  // template = template.replace(/_/g,'');
  return ejs.render(template, data)
}
exports.getGenarateCallback = (configs) => {
  let genarateCallbacks = [templateConfig.default]
  // Object.keys(configs).forEach(config => {
  //     if (configs[config]) {
  //         genarateCallbacks.push(templateConfig[config])
  //     }
  // });
  return genarateCallbacks
}

exports.render = async (source, option, files) => {
  const baseDir = extractCallDir()

  if (!isString(source)) return
  source = path.resolve(baseDir, source)
  const globby = require('globby')
  const fileList = await globby(['**/*'], { cwd: source })
  fileList.forEach((rawPath) => {
    const targetPath = rawPath
      .split('/')
      .map((field) => {
        if (field.charAt(0) === '_') {
          // _gitignore -> .gitignore
          return `.${field.slice(1)}`
        }
        return field
      })
      .join('/')
    // 模板文件夹里原始文件的绝对路径
    const sourcePath = path.resolve(source, rawPath)
    
    const content = renderFile(sourcePath, option)
    // 不管是二进制还是普通 的文本文件都暂存到files对象上去
    files[targetPath] = content
  })
}

exports.extendPackage = (pkg, fields) => {
  const toMerge = fields
  // eslint-disable-next-line no-restricted-syntax
  for (const key in toMerge) {
    const value = toMerge[key]
    const existing = pkg[key]
    if (isObject(value) && (key === 'dependencies' || key === 'devDependencies' || key === 'scripts')) {
      pkg[key] = mergeDeps(existing || {}, value)
    } else {
      pkg[key] = value
    }
  }
}
