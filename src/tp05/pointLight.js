const Light = require('./light')

class PointLight extends Light {
  constructor (position, diffuse, specular, constant, linear, quadratic, active) {
    super(diffuse, active)
    this.px = position[0]
    this.py = position[1]
    this.pz = position[2]
    this.diffuse = diffuse
    this.ambient = [diffuse[0] * 0.1, diffuse[1] * 0.1, diffuse[2] * 0.1]
    this.specular = specular
    this.constant = constant
    this.linear = linear
    this.quadratic = quadratic
  }
}

module.exports = PointLight
