class Material {
  constructor (diffuse, specular, shininess) {
    this.diffuse = diffuse
    this.specular = specular
    this.shininess = shininess * 75
  }

  setDiffuse (diffuse) {
    this.diffuse = diffuse
  }

  setSpecular (specular) {
    this.specular = specular
  }
}

module.exports = Material
