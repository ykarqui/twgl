var glMatrix = require('gl-matrix')

class Camera {
  constructor () {
    this.ejeX = 5
    this.ejeY = 5
    this.ejeZ = 5
    this.centerX = 0
    this.centerY = 0
    this.centerZ = 0
    this.upX = 0
    this.upY = 1
    this.upZ = 0
    this.left = -10
    this.right = 10
    this.bottom = -10
    this.top = 10
    this.near = 0.001
    this.far = 1000
  }

  getViewMatrix () {
    var mat4 = glMatrix.mat4
    var matrix = mat4.create()
    mat4.lookAt(matrix, [this.ejeX * 1.25, this.ejeY * 1.25, this.ejeZ * 1.25], [this.centerX, this.centerY, this.centerZ],
      [this.upX, this.upY, this.upZ])
    return matrix
  }

  getProjectionMatrix () {
    return glMatrix.mat4.create()
  }
}

module.exports = Camera
