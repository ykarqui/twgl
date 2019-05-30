const Geometry = require('./geometry')

class Vector extends Geometry {
  constructor (p1, p2) {
    var vertices = [
      p1[0], p1[1], p1[2],
      p2[0], p2[1], p2[2] ]
    var indices = [0, 1]
    super(vertices, indices)
  }
}

module.exports = Vector
