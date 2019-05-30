const Camera = require('./camera')
var glMatrix = require('gl-matrix')

class OrthographicCamera extends Camera {
  constructor (type = 'orthographic', left = -10, right = 10, bottom = -10, top = 10, near = 0.001, far = 1000) {
    super()
    this.type = type
    this.left = left
    this.right = right
    this.bottom = bottom
    this.top = top
    this.near = near
    this.far = far
  }

  getProjectionMatrix () {
    var mat4 = glMatrix.mat4
    var projection = mat4.create()
    mat4.ortho(projection, this.left, this.right, this.bottom,
      this.top, this.near, this.far)
    return projection
  }
}

module.exports = OrthographicCamera
