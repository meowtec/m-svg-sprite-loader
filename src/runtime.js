const ready = require('domready')

const doc = document

const IdSet =
  window.__SECRET_SVG_SPRITE_IDS =
  window.__SECRET_SVG_SPRITE_IDS || []

/**
 * this list will collect all symbols in one tick,
 * and insert them togethor into body.
 */
let queue

module.exports = function add(symbol, id) {
  if (IdSet.indexOf(id) > -1 || doc.getElementById(id)) {
    window.console && console.warn(`icon#${id} has existed. please check.`)
    return
  }

  IdSet.push(id)

  if (!queue) {
    queue = []
    setTimeout(() => ready(flush), 0)
  }

  queue.push(symbol)
}

function flush() {
  const svg =
  `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">${
    queue.join('')
  }</svg>`

  const div = doc.createElement('div')
  div.innerHTML = svg
  div.style.display = 'none'
  doc.body.insertBefore(div, doc.body.firstChild)

  queue = null
}
