const Camera = require('./camera')
var glMatrix = require('gl-matrix')

class PerspectiveCamera extends Camera {
  constructor (aspect, type = 'perspective', fovy = Math.PI / 4, near = 0.001, far = 100) {
    super()
    this.type = type
    this.fovy = fovy
    this.aspect = aspect
    this.near = near
    this.far = far
  }

  getProjectionMatrix () {
    var mat4 = glMatrix.mat4
    var projection = mat4.create()
    mat4.perspective(projection, this.fovy, this.aspect,
      this.near, this.far)
    return projection
  }
}

module.exports = PerspectiveCamera
