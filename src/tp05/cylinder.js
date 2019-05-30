const Geometry = require('./geometry')
const RegularConvexPolygonGeometry = require('./regularConvexPolygonGeometry')

class Cylinder extends Geometry {
  constructor (heigth = 2) {
    var bandas = 30
    var vertices = []
    var faces = []
    let st = []

    var base = new RegularConvexPolygonGeometry(bandas)

    vertices = base.vertices.slice()
    faces = base.faces.slice()

    var top = new RegularConvexPolygonGeometry(bandas, heigth)

    var facesTop = top.faces.slice()

    for (let i = 0; i < top.faces.length; i++) {
      faces.push(facesTop[i].map(elem => elem + bandas))
    }

    vertices.push(...top.vertices)

    var normals = []

    for (let i = 0; i < base.vertices.length; i++) {
      normals.push(0, 0, -1)
    }
    for (let i = 0; i < top.vertices.length; i++) {
      normals.push(0, 0, 1)
    }

    var offset = vertices.length
    vertices.push(...vertices)

    for (let i = 0; i < vertices.length / 2; i++) {
      let mod = Math.sqrt(Math.pow(vertices[i][0], 2) + Math.pow(vertices[i][1], 2))
      normals.push(vertices[i][0] / mod, vertices[i][1] / mod, 0)
    }

    for (let i = offset; i < bandas + offset; i++) {
      if (i === bandas + offset - 1) {
        faces.push([i, i + bandas, offset])
        faces.push([i + 1, i + bandas, offset])
      } else {
        faces.push([i, i + 1, i + bandas])
        faces.push([i + 1, i + bandas, i + bandas + 1])
      }
    }

    for (let i = 0; i < bandas - 1; i++) {
      st.push(i / bandas, 0)
    }
    for (let i = 0; i < bandas - 1; i++) {
      st.push(i / bandas, 0)
    }
    st.push(1, 0)
    for (let i = 0; i < bandas - 1; i++) {
      st.push(i / bandas, 1)
    }
    st.push(1, 1)
    for (let i = 0; i < bandas * 2; i++) {
      st.push(0, 0)
    }
    st.push(1, 0)
    for (let i = 0; i < bandas - 1; i++) {
      st.push(i / bandas, 1)
    }
    st.push(1, 1)

    super(vertices, faces, normals, st)
  }
}

module.exports = Cylinder
