class renderLights {
  constructor (ambient, directional, points, spot) {
    this.ambientLight = ambient
    this.directionalLight = directional
    this.pointLights = points
    this.spotLight = spot
  }
}

module.exports = renderLights
