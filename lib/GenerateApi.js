const templateConfig = {
    default: require('./templates/default/index'),
    useTs: require('./templates/typescript/index'),
    usePinia: require('./templates/pinia/index'),
    useVuex: require('./templates/vuex/index'),
    useLinter: require('./templates/linter/index'),
};
exports.getGenarateCallback = (configs) => {
    let genarateCallbacks = [
        templateConfig.default
    ]
    Object.keys(configs).forEach(config => {
        if (configs[config]) {
            genarateCallbacks.push(templateConfig[config])
        }
    });
    return genarateCallbacks;
}


exports.render = (source) => {
    
}

exports.extendPackage = () => {

}





