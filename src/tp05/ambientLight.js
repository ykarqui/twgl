class AmbientLight {
  constructor (color, colorSpec, active) {
    this.color = color
    this.active = active
    this.diffuse = color
    this.specular = colorSpec
    this.ambient = [color[0] * 0.1, color[1] * 0.1, color[2] * 0.1]
  }

  setColor (color) {
    this.color = color
  }
}

module.exports = AmbientLight
