const Geometry = require('./geometry')

class RegularConvexPolygonGeometry extends Geometry {
  constructor (edges) {
    let currentAngle = 0
    const distance = 360.0 / edges
    let vertices = []
    console.info('Edges: %d', edges)
    console.group('Figure details -> edges = %d', edges)
    for (let index = 0; index < edges * 2; index += 2) {
      // vertices[i] = Math.cos(((Math.PI * alfa) + 90) / 180.0)
      vertices[index] = Math.cos(((Math.PI * currentAngle)) / 180.0)

      // vertices[i + 1] = Math.sin(((Math.PI * alfa) + 90) / 180.0)
      vertices[index + 1] = Math.sin(((Math.PI * currentAngle)) / 180.0)
      console.info('Angle [ %d ] : ( %f , %f )', index / 2, vertices[index], vertices[index + 1])
      currentAngle += distance
    }
    console.groupEnd()

    super(vertices, 1)
  }
}
module.exports = RegularConvexPolygonGeometry
