console.log('tp05 TO IMPLEMENT')
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

const PointLight = require('./pointLight')
const SpotLight = require('./spotLight')
const AmbientLight = require('./ambientLight')

// Mapping texture
const Box = require('./textures/box.png')
const Earth = require('./textures/earthmap.jpg')

// Lights impl
var clearColor = [0, 0, 0, 1]
var directionalLight = new DirectionalLight([1.0, -1.0, -1.0], [1 * 255, 1 * 255, 1 * 255], true)
var pointLight1 = new PointLight([4.0, 0.0, 0.0], [1 * 255, 0 * 255, 1 * 255], [1 * 255, 0 * 255, 1 * 255], 3.0, 0.0, 0.0, false)
var pointLight2 = new PointLight([0.0, 0.0, 3.0], [1 * 255, 0 * 255, 1 * 255], [1 * 255, 0 * 255, 1 * 255], 3.0, 0.0, 0.0, false)
var ambientLight = new AmbientLight([0.1 * 255, 0.1 * 255, 0.1 * 255], [0.1 * 255, 0.1 * 255, 0.1 * 255], false)
var spotLight = new SpotLight([0, 4.0, 4.0], [-6, -1, 0], [1 * 255, 0 * 255, 1 * 255], [1 * 255, 0 * 255, 1 * 255], 1.0, 0.0, 0.0, 0.5, 0, false)

var scene = new Scene(clearColor)
var renderLights = new RenderLights(ambientLight, directionalLight, [pointLight1, pointLight2], spotLight)

var firstGUI = new dat.GUI({ width: 200 })
createGUIambientalLight()
createGUIdirectionalLight()
createGUIpointLight()
createGUIspotLight()

// Geometries created * 3
console.group('Geometries created:')

var matCube = new Material([1.0 * 255, 0.0 * 255, 0.0 * 255], [1.0 * 255, 1.0 * 255, 1.0 * 255], 0.5, Box)
scene.addMesh(new Mesh(new Cube(), matCube, 'Cube', false, null))
console.info('Cube created')
if (Box) {
  console.info(Box)
}

var matSphere = new Material([0.0 * 255, 1 * 255, 0.0 * 255], [1.0 * 255, 1.0 * 255, 1.0 * 255], 0.5, Earth)
scene.addMesh(new Mesh(new Sphere(), matSphere, 'Sphere', true, null))
console.info('Sphere created')

var matCylinder = new Material([0.0 * 255, 0.0 * 255, 1.0 * 255], [1.0 * 255, 1.0 * 255, 1.0 * 255], 0.5, Box)
scene.addMesh(new Mesh(new Cylinder(), matCylinder, 'Cylinder', false, null))
console.info('Cylinder created')

console.groupEnd()

// point lights * 2
console.group('Point lights created:')
var matPointLight1 = new Material([0.9 * 255, 0.0 * 255, 0.9 * 255], [1.0 * 255, 1.0 * 255, 1.0 * 255], 0.2)
scene.addMesh(new Mesh(new Sphere(), matPointLight1, 'Sphere', false, null))
console.info('1st P.L. created')

var matPointLight2 = new Material([0.0 * 255, 0.9 * 255, 0.9 * 255], [1.0 * 255, 1.0 * 255, 1.0 * 255], 0.2)
scene.addMesh(new Mesh(new Sphere(), matPointLight2, 'Sphere', false, null))
console.info('2nd P.L. created')
console.groupEnd()

// spot light * 1
var matSpotLight = new Material([0.7 * 255, 0.7 * 255, 0.7 * 255], [0.8 * 255, 0.8 * 255, 0.0 * 255], 0.9)
// mesh -> geometry, material, name, enable, texture, type = 4
scene.addMesh(new Mesh(new Cube(), matSpotLight, 'Cube', false, null))
console.info('Spot Light created')

var canvas = document.getElementById('c')
var webGLRenderer = new WebGLRenderer(canvas)
console.info('WebGLRenderer & CANVAS inst')
var gl = webGLRenderer.gl

console.info('Adding GUI')
var secondGUI = new dat.GUI({ width: 200 })
for (let i = 0; i < scene.meshes.length - 3; i++) {
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
  f1.addColor(mesh.material, 'diffuse')
  f1.addColor(mesh.material, 'specular')
  f1.add(mesh.material, 'shininess', 1, 128, 1)
}

function createGUIambientalLight () {
  // add color diffuse & specular
  // active
  var ambiental = firstGUI.addFolder('Ambient Light')
  ambiental.add(ambientLight, 'active', true)
  ambiental.addColor(ambientLight, 'diffuse')
  ambiental.addColor(ambientLight, 'specular')
}

function createGUIdirectionalLight () {
  // active
  // [px] , [py] , [pz]
  // add color diffuse, specular
  var directional = firstGUI.addFolder('Directional Light')
  directional.add(directionalLight, 'active', true)
  directional.add(directionalLight, 'px', -10, 10, 0.02)
  directional.add(directionalLight, 'py', -10, 10, 0.02)
  directional.add(directionalLight, 'pz', -10, 10, 0.02)
  directional.addColor(directionalLight, 'diffuse')
  directional.addColor(directionalLight, 'specular')
}

function createGUIpointLight () {
  // active
  // [px] , [py] , [pz]
  // add color diffuse, specular
  // constant, linear, quadratic
  var pointLight = firstGUI.addFolder('Point Light')

  var pointFolder
  for (let i = 0; i < renderLights.pointLights.length; i++) {
    let point = renderLights.pointLights[i]
    pointFolder = pointLight.addFolder('Luz ' + i)
    pointFolder.add(point, 'active', true)
    pointFolder.add(point, 'px', -10, 10, 0.01)
    pointFolder.add(point, 'py', -10, 10, 0.01)
    pointFolder.add(point, 'pz', -10, 10, 0.01)
    pointFolder.add(point, 'constant', 0, 3, 0.1)
    pointFolder.add(point, 'linear', 0, 1, 0.0001)
    pointFolder.add(point, 'quadratic', 0, 3, 0.0001)
    pointFolder.addColor(point, 'diffuse')
    pointFolder.addColor(point, 'specular')
  }
}

function createGUIspotLight () {
  // active
  // [px] , [py] , [pz]
  // [dir x], [dir y], [dir z]
  // add color diffuse, specular
  // constant, linear, quadratic
  // outer cut off, cut off
  var spotLight = firstGUI.addFolder('Spot Light')

  var spotFolder
  let spot = renderLights.spotLight
  spotFolder = spotLight.addFolder('Spot')
  spotFolder.add(spot, 'active', true)
  spotFolder.add(spot, 'px', -5, 5, 0.02)
  spotFolder.add(spot, 'py', -5, 5, 0.02)
  spotFolder.add(spot, 'pz', -5, 5, 0.02)
  spotFolder.add(spot, 'dx', -5, 5, 0.02)
  spotFolder.add(spot, 'dy', -5, 5, 0.02)
  spotFolder.add(spot, 'dz', -5, 5, 0.02)
  spotFolder.add(spot, 'constant', 0, 3, 0.1)
  spotFolder.add(spot, 'linear', 0, 1, 0.001)
  spotFolder.add(spot, 'quadratic', 0, 3, 0.001)
  spotFolder.add(spot, 'cutOff', 0, 1, 0.001)
  spotFolder.add(spot, 'outerCutOff', 0, 3, 0.001)
  spotFolder.addColor(spot, 'diffuse')
  spotFolder.addColor(spot, 'specular')
}

var camera = new PerspectiveCamera(gl.drawingBufferWidth / gl.drawingBufferHeight)
var cameraFolder = firstGUI.addFolder('Camera')
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
