var frgmShd = require('./fragment-shader.glsl')
var vtxShd = require('./vertex-shader.glsl')

class WebGLRender {
  constructor (canvas) {
    try {
      canvas.width = 640
      canvas.height = 640
      this.context = canvas.getContext('webgl')
    } catch (Exception) {
      console.error('We cant obtain de canvas rendering')
    }
    console.info('Rendering in %d x %d', canvas.width, canvas.height)
  }

  render (scene) {
    // Aca se deben seguir stepbystep los pasos indicados en docs.txt
    let gl = this.context
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height)
    let [r, g, b, a] = scene.clearColor
    gl.clearColor(r, g, b, a)
    gl.clear(gl.COLOR_BUFFER_BIT)
    var vertexShader = gl.createShader(gl.VERTEX_SHADER)
    gl.shaderSource(vertexShader, vtxShd)
    gl.compileShader(vertexShader)
    var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER)
    gl.shaderSource(fragmentShader, frgmShd)
    gl.compileShader(fragmentShader)

    var program = gl.createProgram()
    gl.attachShader(program, vertexShader)
    gl.attachShader(program, fragmentShader)

    gl.linkProgram(program)
    gl.useProgram(program)
    const uniMatrix = gl.getUniformLocation(program, 'uniMatrix')
    var aPosition = gl.getAttribLocation(program, 'aPosition')
    gl.enableVertexAttribArray(aPosition)

    var uColor = gl.getUniformLocation(program, 'uColor')
    for (let i = 0; i < scene.meshN.length; i++) {
      var mesh = scene.meshN[i]
      var vertexBO = gl.createBuffer()
      gl.bindBuffer(gl.ARRAY_BUFFER, vertexBO)
      gl.bufferData(gl.ARRAY_BUFFER, mesh.vertexBO, gl.STATIC_DRAW)
      gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0)

      var polygonColor = new Float32Array(mesh.material)
      gl.uniform4fv(uColor, polygonColor)

      gl.uniformMatrix4fv(uniMatrix, false, mesh.getModelMatrix())

      gl.bindBuffer(gl.ARRAY_BUFFER, null)

      var indexBO = gl.createBuffer()
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBO)
      gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, mesh.indexBO, gl.STATIC_DRAW)
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null)

      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBO)
      gl.drawElements(gl.TRIANGLES, mesh.indexBO.length, gl.UNSIGNED_SHORT, 0)
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null)
    }
    gl.deleteBuffer(vertexBO)
    gl.deleteBuffer(indexBO)
  }
}

module.exports = WebGLRender
