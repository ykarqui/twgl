// required classes
const canvas = document.getElementById('c')
const WebGLRender = require('./WebGLRender')
const Scene = require('./Scene')
const Mesh = require('./Mesh')
const dat = require('dat.gui')
const RegularConvexPolygonGeometry = require('./RegularConvexPolygonGeometry')

let currentScene = new Scene([0.3, 0.3, 0.3, 1.0])
console.info('scene obj created')

let polygon1 = new RegularConvexPolygonGeometry(20)
let mesh1 = new Mesh(polygon1, [0.5, 0.5, 0.5, 1.0])
console.group('Meshes')
console.info('Mesh1 created')

let polygon2 = new RegularConvexPolygonGeometry(6)
let mesh2 = new Mesh(polygon2, [0.2, 0.4, 0.6, 1.0])
console.info('Mesh2 created')

let polygon3 = new RegularConvexPolygonGeometry(3)
let mesh3 = new Mesh(polygon3, [0.0, 1.0, 1.0, 1.0])
console.info('Mesh3 created')
console.groupEnd()
try {
  currentScene.addMesh(mesh1)
  currentScene.addMesh(mesh2)
  currentScene.addMesh(mesh3)
  console.info('Meshes added to Scene')
} catch (Exception) {
  console.error('We cant add meshes to scene')
}

const gui = new dat.GUI()
let numMeshes = currentScene.meshN.length
for (let i = 0; i < numMeshes; i++) {
  var figure = gui.addFolder('Figure : ' + i)
  // Valor minimo 0.1 para que no desaparezca
  figure.add(currentScene.meshN[i], 'sx', 0.1, 2.0, 0.05)
  figure.add(currentScene.meshN[i], 'sy', 0.1, 2.0, 0.05)
  figure.add(currentScene.meshN[i], 'sz', 0.1, 2.0, 0.05)
  // Rango entre -1.5 y 1.5 para que no salga del cuadrante por completo
  figure.add(currentScene.meshN[i], 'tx', -1.5, 1.5, 0.3)
  figure.add(currentScene.meshN[i], 'ty', -1.5, 1.5, 0.3)
  figure.add(currentScene.meshN[i], 'tz', -1.5, 1.5, 0.3)
  // 360 - 1 = 359 , porque en 360 seria lo mismo que 0
  figure.add(currentScene.meshN[i], 'rx', 0, 359, 3)
  figure.add(currentScene.meshN[i], 'ry', 0, 359, 3)
  figure.add(currentScene.meshN[i], 'rz', 0, 359, 3)
}

let glRender = new WebGLRender(canvas)
console.info('WebGL obj created')

function render (time) {
  glRender.render(currentScene)
  window.requestAnimationFrame(render)
}
window.requestAnimationFrame(render)
