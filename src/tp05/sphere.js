const Geometry = require('./geometry')

class Sphere extends Geometry {
  constructor (radius = 1) {
    var latitudeBands = 30
    var longitudeBands = 30
    let textureCoordData = []

    var vertices = []
    var normals = []
    for (let latNumber = 0; latNumber <= latitudeBands; latNumber++) {
      var angle2 = latNumber * Math.PI / latitudeBands

      for (let longNumber = 0; longNumber <= longitudeBands; longNumber++) {
        var angle = longNumber * 2 * Math.PI / longitudeBands
        var x = Math.cos(angle) * Math.sin(angle2)
        var y = Math.cos(angle2)
        var z = Math.sin(angle) * Math.sin(angle2)
        let u = 1 - (longNumber / longitudeBands)
        let v = 1 - (latNumber / latitudeBands)
        vertices.push([radius * x, radius * y, radius * z])

        normals.push(x)
        normals.push(y)
        normals.push(z)
        textureCoordData.push(u)
        textureCoordData.push(v)
      }
    }

    var faces = []
    for (let num1 = 0; num1 < latitudeBands; num1++) {
      for (let num2 = 0; num2 < longitudeBands; num2++) {
        var first = (num1 * (longitudeBands + 1)) + num2
        var second = first + longitudeBands + 1
        faces.push([first, second, first + 1])
        faces.push([second, second + 1, first + 1])
      }
    }

    super(vertices, faces, normals, textureCoordData)
  }
}

module.exports = Sphere
