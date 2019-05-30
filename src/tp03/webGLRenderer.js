var twgl = require('twgl.js')
var vtx = require('./vtxshad.glsl')
var frag = require('./fragshad.glsl')

var VectorMesh = require('./vetormesh')
var Vector = require('./vector')

class WebGLRenderer {
  constructor (canvas) {
    var gl = null
    try {
      gl = twgl.getWebGLContext(canvas)
    } catch (e) {
      console.error('We cant obtain the canvas rendering')
      gl = null
      return
    }
    this.programInfoMesh = twgl.createProgramInfo(gl, [vtx, frag])
    this.programInfo = twgl.createProgramInfo(gl, [vtx, frag])
    this.gl = gl

    var axis = []
    axis[0] = new VectorMesh(new Vector([0, 0, 0], [10, 0, 0]), [1.0, 0.0, 0.0, 1])
    axis[1] = new VectorMesh(new Vector([0, 0, 0], [0, 10, 0]), [0.0, 1.0, 0.0, 1])
    axis[2] = new VectorMesh(new Vector([0, 0, 0], [0, 0, 10]), [0.0, 0.0, 1.0, 1])
    this.axis = axis
    // ----
    var grid = []
    let j = 0
    for (let i = -10; i < 11; i++, j = j + 2) {
      grid[j] = new VectorMesh(new Vector([i, 0, 10], [i, 0, -10]), [0.5, 0.5, 0.5, 1])
      grid[j + 1] = new VectorMesh(new Vector([10, 0, i], [-10, 0, i]), [0.5, 0.5, 0.5, 1])
    }
    this.grid = grid
  }

  render (scene, camera, lights) {
    var gl = this.gl
    gl.clearColor(...scene.clearColor)
    gl.enable(gl.DEPTH_TEST)
    gl.depthFunc(gl.LEQUAL)
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)

    twgl.resizeCanvasToDisplaySize(gl.canvas)
    gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight)

    camera.aspect = gl.drawingBufferWidth / gl.drawingBufferHeight

    var grid = this.grid
    for (let i = 0; i < grid.length; i++) {
      draw.call(this, grid[i], gl.LINES, camera)
    }

    var axis = this.axis
    for (let i = 0; i < axis.length; i++) {
      draw.call(this, axis[i], gl.LINES, camera)
    }

    var meshes = scene.meshes
    var pos = meshes.length
    for (let i = 0; i < pos; i++) {
      if (meshes[i].enable) {
        // with lights
        checkAndDraw.call(this, meshes[i], camera, lights)
      }
    }
  }
}

function checkAndDraw (mesh, camera, lights) {
  var gl = this.gl
  var arrays = {
    aPosition: mesh.vtxBuffer,
    indices: mesh.idxBuffer,
    aNormal: mesh.geometry.normals
  }
  var bufferInfo = twgl.createBufferInfoFromArrays(gl, arrays)
  var uniforms = {
    uModelMatrix: mesh.getModelMatrix(),
    uNormalMatrix: mesh.getNormalMatrix(),
    uViewMatrix: camera.getViewMatrix(),
    uProjectionMatrix: camera.getProjectionMatrix(),
    uViewPos: [camera.ejeX, camera.ejeY, camera.ejeZ],
    'material.diffuse': [mesh.material.diffuse[0] / 255, mesh.material.diffuse[1] / 255, mesh.material.diffuse[2] / 255],
    'material.specular': [mesh.material.specular[0] / 255, mesh.material.specular[1] / 255, mesh.material.specular[2] / 255],
    'material.shininess': mesh.material.shininess,
    'ambientLight.active': lights.ambientLight.active,
    'ambientLight.color': lights.ambientLight.color,
    'dirLight.active': lights.directionalLight.active,
    'dirLight.direction': [lights.directionalLight.px, lights.directionalLight.py, lights.directionalLight.pz],
    'dirLight.ambient': [lights.directionalLight.ambient[0] / 255, lights.directionalLight.ambient[1] / 255, lights.directionalLight.ambient[2] / 255],
    'dirLight.diffuse': [lights.directionalLight.diffuse[0] / 255, lights.directionalLight.diffuse[1] / 255, lights.directionalLight.diffuse[2] / 255],
    'dirLight.specular': [lights.directionalLight.specular[0] / 255, lights.directionalLight.specular[1] / 255, lights.directionalLight.specular[2] / 255],
    'uNormalView': false
  }
  gl.useProgram(this.programInfoMesh.program)
  twgl.setBuffersAndAttributes(gl, this.programInfoMesh, bufferInfo)
  twgl.setUniforms(this.programInfoMesh, uniforms)
  twgl.drawBufferInfo(gl, bufferInfo, mesh.type)
}

// without lights
function draw (mesh, type, camera) {
  var gl = this.gl
  var arrays = {
    aPosition: mesh.vtxBuffer,
    indices: mesh.idxBuffer
  }
  var bufferInfo = twgl.createBufferInfoFromArrays(gl, arrays)

  var uniforms = {
    uColor: mesh.material,
    uModelMatrix: mesh.getModelMatrix(),
    uViewMatrix: camera.getViewMatrix(),
    uProjectionMatrix: camera.getProjectionMatrix()
  }

  gl.useProgram(this.programInfo.program)
  twgl.setBuffersAndAttributes(gl, this.programInfo, bufferInfo)
  twgl.setUniforms(this.programInfo, uniforms)
  twgl.drawBufferInfo(gl, bufferInfo, type)
}

module.exports = WebGLRenderer
