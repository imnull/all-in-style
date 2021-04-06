const { getRulesFromFile } = require('css-reducer')
function allInCssLoader(source) {
    const rules = getRulesFromFile(this.resource)
    // const name = path.relative(this.context, this.resource) + '.js'
    // this.emitFile(name, JSON.stringify(rules, null, '  '))
    const code = `export default ${JSON.stringify(rules)}`
    return code
}

module.exports = allInCssLoader