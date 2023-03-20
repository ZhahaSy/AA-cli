function mergeDeps(sourceDeps, depsToInject) {
  return { ...depsToInject, ...sourceDeps }
}
module.exports = mergeDeps
