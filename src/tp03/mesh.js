var glMatrix = require('gl-matrix')

class Mesh {
  constructor (geometry, material, name, enable, type = 4) {
    this.geometry = geometry
    this.material = material
    this.enable = enable
    this.name = name
    this.type = type
    this.tx = this.ty = this.tz = 0
    this.rx = this.ry = this.rz = 0
    this.sx = this.sy = this.sz = 1

    var vtxBuffer = []
    var vertices = this.geometry.vertices
    for (let i = 0; i < vertices.length; i++) {
      vtxBuffer.push(...vertices[i])
    }
    this.vtxBuffer = new Float32Array(vtxBuffer)

    var idxBuffer = []
    var faces = this.geometry.faces
    for (let i = 0; i < faces.length; i++) {
      idxBuffer.push(...faces[i])
    }
    this.idxBuffer = new Uint16Array(idxBuffer)
    this.modelMatrix = glMatrix.mat4.create()
    this.normalMatrix = glMatrix.mat4.create()
  }

  getModelMatrix () {
    let modelMatrix = this.modelMatrix
    glMatrix.mat4.identity(modelMatrix)
    glMatrix.mat4.translate(modelMatrix, modelMatrix, [this.tx, this.ty, this.tz])
    rotate.call(this, modelMatrix)
    glMatrix.mat4.scale(modelMatrix, modelMatrix, [this.sx, this.sy, this.sz])
    return modelMatrix
  }

  getNormalMatrix () {
    let normalMatrix = this.normalMatrix
    glMatrix.mat4.invert(normalMatrix, this.modelMatrix)
    glMatrix.mat4.transpose(normalMatrix, normalMatrix)
    return normalMatrix
  }
}

function rotate (modelMatrix) {
  var quat = glMatrix.quat.create()
  glMatrix.quat.rotateZ(quat, quat, this.rz)
  glMatrix.quat.rotateX(quat, quat, this.rx)
  glMatrix.quat.rotateY(quat, quat, this.ry)

  let rotationMatrix = glMatrix.mat4.create()
  glMatrix.mat4.fromQuat(rotationMatrix, quat)
  glMatrix.mat4.multiply(modelMatrix, modelMatrix, rotationMatrix)
}
module.exports = Mesh
