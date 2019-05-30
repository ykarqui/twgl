class Light {
  constructor (color, active) {
    this.active = active
    this.setColor(color)
  }

  setColor (color) {
    this.ambient = [color[0] * 0.5, color[1] * 0.5, color[2] * 0.5]
    this.diffuse = [color[0] * 0.8, color[1] * 0.8, color[2] * 0.8]
    this.specular = color
  }
}

module.exports = Light
