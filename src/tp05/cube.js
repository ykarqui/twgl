const Geometry = require('./geometry')

class Cube extends Geometry {
  constructor () {
    var vertices = []
    var faces = []
    var normals = []
    var indices = []
    var st = []

    vertices = [
      // Cara delantera
      [-1, -1, 1],
      [1, -1, 1],
      [1, 1, 1],
      [-1, 1, 1],
      // Cara trasera
      [-1, -1, -1],
      [-1, 1, -1],
      [1, 1, -1],
      [1, -1, -1],
      // Cara superior
      [-1, 1, -1],
      [-1, 1, 1],
      [1, 1, 1],
      [1, 1, -1],
      // Cara inferior
      [-1, -1, -1],
      [1, -1, -1],
      [1, -1, 1],
      [-1, -1, 1],
      // Cara derecha
      [1, -1, -1],
      [1, 1, -1],
      [1, 1, 1],
      [1, -1, 1],
      // Cara izquierda
      [-1, -1, -1],
      [-1, -1, 1],
      [-1, 1, 1],
      [-1, 1, -1]
    ]

    faces.push([0, 1, 2])
    faces.push([0, 2, 3])
    faces.push([4, 5, 6])
    faces.push([4, 6, 7])
    faces.push([8, 9, 10])
    faces.push([8, 10, 11])
    faces.push([12, 13, 14])
    faces.push([12, 14, 15])
    faces.push([16, 17, 18])
    faces.push([16, 18, 19])
    faces.push([20, 21, 22])
    faces.push([20, 22, 23])

    normals = [
      // Cara delantera
      -1.0, -1.0, 1.0,
      1.0, -1.0, 1.0,
      1.0, 1.0, 1.0,
      -1.0, 1.0, 1.0,
      // Cara trasera
      -1.0, -1.0, -1.0,
      -1.0, 1.0, -1.0,
      1.0, 1.0, -1.0,
      1.0, -1.0, -1.0,
      // Top face
      -1.0, 1.0, -1.0,
      -1.0, 1.0, 1.0,
      1.0, 1.0, 1.0,
      1.0, 1.0, -1.0,
      // Bottom face
      -1.0, -1.0, -1.0,
      1.0, -1.0, -1.0,
      1.0, -1.0, 1.0,
      -1.0, -1.0, 1.0,
      // Right face
      1.0, -1.0, -1.0,
      1.0, 1.0, -1.0,
      1.0, 1.0, 1.0,
      1.0, -1.0, 1.0,
      // Left face
      -1.0, -1.0, -1.0,
      -1.0, -1.0, 1.0,
      -1.0, 1.0, 1.0,
      -1.0, 1.0, -1.0
    ]
    indices = [
      0, 1, 2, 0, 2, 3, // enfrente
      4, 5, 6, 4, 6, 7, // atrás
      8, 9, 10, 8, 10, 11, // arriba
      12, 13, 14, 12, 14, 15, // fondo
      16, 17, 18, 16, 18, 19, // derecha
      20, 21, 22, 20, 22, 23 // izquierda
    ]

    st = [
      // Front
      0, 0,
      1, 0,
      1, 1,
      0, 1,
      // Back
      0, 0,
      1, 0,
      1, 1,
      0, 1,
      // Top
      0, 0,
      1, 0,
      1, 1,
      0, 1,
      // Bottom
      0, 0,
      1, 0,
      1, 1,
      0, 1,
      // Right
      0, 0,
      1, 0,
      1, 1,
      0, 1,
      // Left
      0, 0,
      1, 0,
      1, 1,
      0, 1,
    ]

    super(vertices, faces, normals, indices, st)
  }
}

module.exports = Cube
