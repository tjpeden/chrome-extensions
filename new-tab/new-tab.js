import { DOM } from './dom.js'
import { FloodFill } from './flood-fill.js'

const width = document.body.clientWidth
const height = document.body.clientHeight
const context = DOM.context2d(width, height, 1)
const flood = new FloodFill(context.getImageData(0, 0, width, height), width, height)

function draw() {
  const image = flood.frame()

  context.putImageData(image, 0, 0)

  requestAnimationFrame(draw)
}

document.body.appendChild(context.canvas)

draw()
