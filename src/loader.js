const path = require('path')
const SVGCompiler = require('svg-baker')
const svgCompiler = new SVGCompiler()

const getFileId = filePath => 'icon-' + path.parse(filePath).name

module.exports = function (content) {
  const resourceQuery = this.resourceQuery || ''
  const done = this.async()
  const id = getFileId(this.resourcePath)

  /**
   * read svg as string, other as buffer
   */
  if (content.includes('<svg')) {
    content = content.toString()
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
      export default ${wrappedId}
    `)
  })
  .catch(done)
}

module.exports.raw = true
