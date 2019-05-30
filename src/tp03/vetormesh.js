var glMatrix = require('gl-matrix')

class VectorMesh {
  constructor (geometry, material) {
    this.geometry = geometry
    this.material = material
    this.vtxBuffer = new Float32Array(this.geometry.vertices)
    this.idxBuffer = new Uint16Array(this.geometry.faces)
  }

  getModelMatrix () {
    var modelMatrix = glMatrix.mat4.create()
    return modelMatrix
  }
}

module.exports = VectorMesh
