const path = require('path')
const SVGCompiler = require('svg-baker')
const svgCompiler = new SVGCompiler()
const loaderUtils = require('loader-utils')

module.exports = function (content) {
  const resourceQuery = this.resourceQuery || ''
  const done = this.async()
  const name = path.parse(this.resourcePath).name
  const options = loaderUtils.getOptions(this) || {}

  const id = options.symbolId
    ? options.symbolId.replace('[name]', name)
    : name

  /**
   * read svg as string, other as buffer
   */
  if (content.includes('<svg')) {
    content = content.toString()
  } else {
    console.log(content.toString())
  }

  svgCompiler.addSymbol({
    id,
    content,
    path: this.resourcePath + resourceQuery,
  })
  .then(symbol => {
    const wrappedId = JSON.stringify(symbol.id)

    done(null, `
      var runtime = require('${path.resolve(__dirname, './runtime')}')
      runtime(${JSON.stringify(symbol.render())}, ${wrappedId})
      exports.__esModule = true
      exports.default = ${wrappedId}
    `)
  })
  .catch(done)
}

module.exports.raw = true
