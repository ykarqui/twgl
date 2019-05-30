const Geometry = require('./geometry')

class RegularConvexPolygonGeometry extends Geometry {
  constructor (edges, z = 0) {
    var vertices = Array(edges)
    var angle = 2 * Math.PI / edges
    var pos = 0
    var i = 0
    while (i < 2 * Math.PI) {
      vertices[pos] = [Math.cos(i), Math.sin(i), z]
      pos++
      i += angle
    }

    var faces = []
    var triang = vertices.length - 2
    var j = 1
    for (let i = 0; i < triang; i++, j++) {
      faces.push([0, j, j + 1])
    }
    super(vertices, faces)
  }
}

module.exports = RegularConvexPolygonGeometry
