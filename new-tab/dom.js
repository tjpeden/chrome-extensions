export class DOM {
  static context2d(width, height, dpi) {
    if (dpi == null) dpi = devicePixelRatio

    const canvas = document.createElement('canvas')

    canvas.width = width * dpi
    canvas.height = height * dpi

    canvas.style.width = width + 'px'

    const context = canvas.getContext('2d')

    context.scale(dpi, dpi)

    return context
  }
}
