const Light = require('./light')

class DirectionalLight extends Light {
  constructor (position, color, active) {
    super(color, active)
    this.px = position[0]
    this.py = position[1]
    this.pz = position[2]
  }
}

module.exports = DirectionalLight
