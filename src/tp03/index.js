console.log('tp04')
var dat = require('dat.gui/build/dat.gui')

const Scene = require('./scene')
const WebGLRenderer = require('./webGLRenderer')
const RenderLights = require('./renderLights')
const PerspectiveCamera = require('./perspectiveCamera')

// Figures
const Mesh = require('./mesh')
const Cube = require('./cube')
const Cylinder = require('./cylinder')
const Sphere = require('./sphere')

const Material = require('./material')

// Lights
const DirectionalLight = require('./directionalLight')
const AmbientLight = require('./ambientLight')

// Lights impl
var clearColor = [0, 0, 0, 1]
var directionalLight = new DirectionalLight([1.0, -1.0, -1.0], [1 * 255, 1 * 255, 1 * 255], true)
var ambientLight = new AmbientLight([1 * 255, 1 * 255, 1 * 255], [1 * 255, 1 * 255, 1 * 255], false)

var scene = new Scene(clearColor)
var renderLights = new RenderLights(ambientLight, directionalLight)

// Geometries created * 3
console.group('Geometries created:')

var matCube = new Material([1.0 * 255, 0.0 * 255, 0.0 * 255], [1.0 * 255, 1.0 * 255, 1.0 * 255], 0.5)
scene.addMesh(new Mesh(new Cube(), matCube, 'Cube', false))
console.info('Cube created')

var matSphere = new Material([0.0 * 255, 1 * 255, 0.0 * 255], [1.0 * 255, 1.0 * 255, 1.0 * 255], 0.5)
scene.addMesh(new Mesh(new Sphere(), matSphere, 'Sphere', true))
console.info('Sphere created')

var matCylinder = new Material([0.0 * 255, 0.0 * 255, 1.0 * 255], [1.0 * 255, 1.0 * 255, 1.0 * 255], 0.5)
scene.addMesh(new Mesh(new Cylinder(), matCylinder, 'Cylinder', false))
console.info('Cylinder created')

console.groupEnd()

var canvas = document.getElementById('c')
var webGLRenderer = new WebGLRenderer(canvas)
console.info('WebGLRenderer & CANVAS inst')
var gl = webGLRenderer.gl

console.info('Adding GUI')
var secondGUI = new dat.GUI({ width: 200 })
for (let i = 0; i < scene.meshes.length; i++) {
  let mesh = scene.meshes[i]
  var f1 = secondGUI.addFolder(mesh.name)
  f1.add(mesh, 'enable', true)
  f1.add(mesh, 'type', { LINE_LOOP: gl.LINE_LOOP, TRIANGLES: gl.TRIANGLES })
  f1.add(mesh, 'tx', -8, 8, 0.1)
  f1.add(mesh, 'ty', -8, 8, 0.1)
  f1.add(mesh, 'tz', -8, 8, 0.1)
  f1.add(mesh, 'rx', 0, 2 * Math.PI, 0.1)
  f1.add(mesh, 'ry', 0, 2 * Math.PI, 0.1)
  f1.add(mesh, 'rz', 0, 2 * Math.PI, 0.1)
  f1.add(mesh, 'sx', 0, 10, 0.1)
  f1.add(mesh, 'sy', 0, 10, 0.1)
  f1.add(mesh, 'sz', 0, 10, 0.1)
}

var camera = new PerspectiveCamera(gl.drawingBufferWidth / gl.drawingBufferHeight)
var cameraFolder = secondGUI.addFolder('Camera')
cameraFolder.add(camera, 'ejeX', -10, 10, 0.1)
cameraFolder.add(camera, 'ejeY', -10, 10, 0.1)
cameraFolder.add(camera, 'ejeZ', -10, 10, 0.1)
cameraFolder.add(camera, 'centerX', -5, 5, 0.1)
cameraFolder.add(camera, 'centerY', -5, 5, 0.1)
cameraFolder.add(camera, 'centerZ', -5, 5, 0.1)
cameraFolder.add(camera, 'upX', -5, 5, 0.1)
cameraFolder.add(camera, 'upY', -5, 5, 0.1)
cameraFolder.add(camera, 'upZ', -5, 5, 0.1)
var pC = cameraFolder.addFolder('Perspective Camera')
console.info('using Perspective camera [msg 1/2]')
pC.add(camera, 'fovy', Math.PI / 4, Math.PI / 4 + 2, 0.1)
pC.add(camera, 'aspect', 1, 2, 0.1)
pC.add(camera, 'near', 0.001, 10, 0.1)
pC.add(camera, 'far', 1, 100, 0.001)
/* var oC = cameraFolder.addFolder('Orthographic Camera')
console.info('using Orthographic camera [msg 2/2]')
oC.add(camera, 'right', -100.0, 100.0, 1.0)
oC.add(camera, 'left', -100.0, 100.0, 1.0)
oC.add(camera, 'bottom', -100.0, 100.0, 1.0)
oC.add(camera, 'top', -100.0, 100.0, 1.0) */

window.requestAnimationFrame(render)

function render (time) {
  webGLRenderer.render(scene, camera, renderLights)
  window.requestAnimationFrame(render)
}
