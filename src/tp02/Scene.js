class Scene {
  constructor (clearColor) {
    this.clearColor = clearColor
    this.meshN = []
  }
  addMesh (mesh) {
    this.meshN.push(mesh)
  }
}

module.exports = Scene
