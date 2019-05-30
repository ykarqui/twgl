const glMatrix = require('gl-matrix')

class Mesh {
  constructor (geometry, material) {
    this.geometry = geometry
    this.material = new Float32Array(material)
    // Size
    this.sx = 1.0
    this.sy = 1.0
    this.sz = 1.0
    // Transl
    this.tx = 0.0
    this.ty = 0.0
    this.tz = 0.0
    // Rotat
    this.rx = 0.0
    this.ry = 0.0
    this.rz = 0.0
    this.vertexBO = new Float32Array(geometry.vertices)

    // Siempre voy a tener la mitad menos dos triangulos, que par de coord
    let countTriangles = (geometry.vertices.length / 2) - 2
    let triangleIndex = 0
    var jindex = []
    var index = 0
    // Respetando la siguiente secuencia voy a tener siempre el vec normal hacia arriba
    console.group('Sequence of the Mesh to draw. This mesh have %d triangles', countTriangles)
    while (index < countTriangles) {
      jindex[triangleIndex] = 0
      console.info('Triang #[%d] = 0', triangleIndex / 3)
      jindex[triangleIndex + 1] = index + 1
      console.info('Triang #[%d] = %d', triangleIndex / 3, index + 1)
      jindex[triangleIndex + 2] = index + 2
      console.info('Triang #[%d] = %d', triangleIndex / 3, index + 2)
      triangleIndex += 3
      index++
    }
    console.groupEnd()

    this.indexBO = new Uint16Array(jindex)
  }

  getModelMatrix () {
    this.currentMatrix = glMatrix.mat4.create()
    glMatrix.mat4.scale(this.currentMatrix, this.currentMatrix, [this.sx, this.sy, this.sz])
    glMatrix.mat4.translate(this.currentMatrix, this.currentMatrix, [this.tx, this.ty, this.tz])
    glMatrix.mat4.rotateX(this.currentMatrix, this.currentMatrix, (Math.PI * this.rx) / 180)
    glMatrix.mat4.rotateY(this.currentMatrix, this.currentMatrix, (Math.PI * this.ry) / 180)
    glMatrix.mat4.rotateZ(this.currentMatrix, this.currentMatrix, (Math.PI * this.rz) / 180)
    return this.currentMatrix
  }

  addMesh (mesh) {
    this.mesh = mesh
  }
}

module.exports = Mesh
