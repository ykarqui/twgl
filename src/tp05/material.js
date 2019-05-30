class Material {
  constructor (diffuse, specular, shininess, map) {
    this.diffuse = diffuse
    this.specular = specular
    this.shininess = shininess * 75
    this.map = map
  }

  setDiffuse (diffuse) {
    this.diffuse = diffuse
  }

  setSpecular (specular) {
    this.specular = specular
  }
}

module.exports = Material
