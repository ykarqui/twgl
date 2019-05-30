class Scene {
  constructor (clearColor) {
    this.clearColor = clearColor
    this.meshes = []
  }

  addMesh (mesh) {
    this.meshes.push(mesh)
  }
}

module.exports = Scene
