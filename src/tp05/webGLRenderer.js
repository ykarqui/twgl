var twgl = require('twgl.js')
var vtx = require('./vtxshad.glsl')
var frag = require('./fragshad.glsl')
var vertex = require('./vertex-shader.glsl')
var fragment = require('./fragment-shader.glsl')

var VectorMesh = require('./vetormesh')
var Vector = require('./vector')

/* En el renderer hay que crear un array buffer
para guardar las coordenadas de las texturas y
una textura con createTexture para cada mesh
que tenga una textura asociada.
*/
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
    this.programInfoMesh = twgl.createProgramInfo(gl, [vertex, fragment])
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
    var pos = meshes.length - 3
    for (let i = 0; i < pos; i++) {
      if (meshes[i].enable) {
        // with lights
        checkAndDraw.call(this, meshes[i], camera, lights)
      }
    }
    // point light : position, diffuse, specular, constant, linear, quadratic, active
    // mesh : geometry, material, name, enable, type = 4
    for (let i = 0; i < lights.pointLights.length; i++) {
      if (lights.pointLights[ i ].active) {
        meshes[ pos + i ].enable = true
        meshes[ pos + i ].tx = lights.pointLights[ i ].px
        meshes[ pos + i ].ty = lights.pointLights[ i ].py
        meshes[ pos + i ].tz = lights.pointLights[ i ].pz
        // material : diffuse, specular, shininess
        meshes[ pos + i ].material.diffuse = lights.pointLights[ i ].diffuse
        meshes[ pos + i ].material.specular = lights.pointLights[ i ].specular
        meshes[ pos + i ].material.shininess = 1

        checkAndDraw.call(this, meshes[ pos + i ], camera, lights)
      } else {
        meshes[ pos + i ].enable = false
      }
    }
    if (lights.spotLight.active) {
      // spot: position, direction, diffuse, specular, constant, linear, quadratic, cutOff, outerCutOff, active
      meshes[ pos + 2 ].enable = true
      meshes[ pos + 2 ].tx = lights.spotLight.px
      meshes[ pos + 2 ].ty = lights.spotLight.py
      meshes[ pos + 2 ].tz = lights.spotLight.pz
      // material : diffuse, specular, shininess
      meshes[ pos + 2 ].material.diffuse = lights.spotLight.diffuse
      meshes[ pos + 2 ].material.specular = lights.spotLight.specular
      meshes[ pos + 2 ].material.shininess = 1

      checkAndDraw.call(this, meshes[ pos + 2 ], camera, lights)
    } else {
      meshes[ pos + 2 ].enable = false
    }
  }
}

function checkAndDraw (mesh, camera, lights) {
  var gl = this.gl
  if (mesh.mapping === null) {
    console.info('Antes de cargar textura')
    mesh.mapping = twgl.createTexture(gl, { src: mesh.material.map })
    console.info('DESPUES de cargar textura')
  }
  var arrays = {
    aPosition: mesh.vtxBuffer,
    indices: mesh.idxBuffer,
    aNormal: mesh.geometry.normals,
    aTexture: mesh.textureMapping
  }
  var bufferInfo = twgl.createBufferInfoFromArrays(gl, arrays)
  console.info('Aca que llega? ' + mesh.mapping)
  var uniforms = {
    uModelMatrix: mesh.getModelMatrix(),
    uNormalMatrix: mesh.getNormalMatrix(),
    uViewMatrix: camera.getViewMatrix(),
    uProjectionMatrix: camera.getProjectionMatrix(),
    uViewPos: [camera.ejeX, camera.ejeY, camera.ejeZ],
    // 'material.diffuse': [mesh.material.diffuse[0] / 255, mesh.material.diffuse[1] / 255, mesh.material.diffuse[2] / 255],
    'material.diffuse': mesh.mapping,
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

  for (let i = 0; i < lights.pointLights.length; i++) {
    let point = lights.pointLights[i]
    uniforms['pointLights[' + i + '].active'] = point.active
    uniforms['pointLights[' + i + '].position'] = [point.px, point.py, point.pz]
    uniforms['pointLights[' + i + '].ambient'] = [point.ambient[0] / 255, point.ambient[1] / 255, point.ambient[2] / 255]
    uniforms['pointLights[' + i + '].diffuse'] = [point.diffuse[0] / 255, point.diffuse[1] / 255, point.diffuse[2] / 255]
    uniforms['pointLights[' + i + '].specular'] = [point.specular[0] / 255, point.specular[1] / 255, point.specular[2] / 255]
    uniforms['pointLights[' + i + '].constant'] = point.constant
    uniforms['pointLights[' + i + '].linear'] = point.linear
    uniforms['pointLights[' + i + '].quadratic'] = point.quadratic
  }

  let spot = lights.spotLight
  uniforms['spotLights.active'] = spot.active
  uniforms['spotLights.position'] = [spot.px, spot.py, spot.pz]
  uniforms['spotLights.direction'] = [spot.dx, spot.dy, spot.dz]
  uniforms['spotLights.ambient'] = [spot.ambient[0] / 255, spot.ambient[1] / 255, spot.ambient[2] / 255]
  uniforms['spotLights.diffuse'] = [spot.diffuse[0] / 255, spot.diffuse[1] / 255, spot.diffuse[2] / 255]
  uniforms['spotLights.specular'] = [spot.specular[0] / 255, spot.specular[1] / 255, spot.specular[2] / 255]
  uniforms['spotLights.constant'] = spot.constant
  uniforms['spotLights.linear'] = spot.linear
  uniforms['spotLights.quadratic'] = spot.quadratic
  uniforms['spotLights.cutOff'] = spot.cutOff
  uniforms['spotLights.outerCutOff'] = spot.outerCutOff

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
