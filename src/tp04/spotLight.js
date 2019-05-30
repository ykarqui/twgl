const Light = require('./light')

class SpotLight extends Light {
  constructor (position, direction, diffuse, specular, constant, linear, quadratic, cutOff, outerCutOff, active) {
    super(specular, active)
    this.px = position[0]
    this.py = position[1]
    this.pz = position[2]

    this.dx = direction[0]
    this.dy = direction[1]
    this.dz = direction[2]

    this.constant = constant
    this.linear = linear
    this.quadratic = quadratic

    this.diffuse = diffuse
    this.ambient = [diffuse[0] * 0.1, diffuse[1] * 0.1, diffuse[2] * 0.1]
    this.specular = specular

    this.cutOff = cutOff
    this.outerCutOff = outerCutOff
  }
}

module.exports = SpotLight
