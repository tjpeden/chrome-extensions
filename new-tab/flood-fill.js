export class FloodFill {
  constructor(image, width, height) {
    this.iterationsPerFrame = 1000
    this.indices = []
    this.width = width
    this.height = height
    this.image = image

    this.visit(this.width >> 1, this.height >> 1, 128, 128, 128)
  }

  visit(x, y, r, g, b) {
    if (x < 0 || x >= this.width || y < 0 || y >= this.height) return

    const i = y * this.width + x
    const j = i << 2

    if (this.image.data[j + 3] === 0) {
      this.image.data[j + 0] = r + (Math.random() < 0.5 ? -1 : 1)
      this.image.data[j + 1] = g + (Math.random() < 0.5 ? -1 : 1)
      this.image.data[j + 2] = b + (Math.random() < 0.5 ? -1 : 1)
      this.image.data[j + 3] = 255

      this.indices.push(i)
    }
  }

  frame() {
    if (this.indices.length) {
      for (let n = 0; n < this.iterationsPerFrame; n++) {
        const i = Math.random() * this.indices.length | 0
        const j = this.indices[i]
        const k = this.indices.pop()

        if (i < this.indices.length) this.indices[i] = k

        const r = this.image.data[(j << 2) + 0]
        const g = this.image.data[(j << 2) + 1]
        const b = this.image.data[(j << 2) + 2]
        const x = j % this.width
        const y = j / this.width | 0

        this.visit(x - 1, y, r, g, b)
        this.visit(x + 1, y, r, g, b)
        this.visit(x, y - 1, r, g, b)
        this.visit(x, y + 1, r, g, b)
      }
    }

    return this.image
  }
}
