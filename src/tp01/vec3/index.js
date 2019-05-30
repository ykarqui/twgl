const normalize = (a) => {
  // Suma de los cuadrados
  const sum = Math.sqrt(a[0] * a[0] + a[1] * a[1] + a[2] * a[2])
  // Normalizo
  return [a[0] / sum, a[1] / sum, a[2] / sum]
  // throw new Error('Not implemented')
}

const cross = (a, b) => {
  // Para 2 vectores i,j,k
  let cr = [0, 0, 0]
  cr[0] = a[1] * b[2] - a[2] * b[1]
  cr[1] = -1 * a[0] * b[2] + a[2] * b[0]
  cr[2] = a[0] * b[1] - a[1] * b[0]
  return cr
  // throw new Error('Not implemented')
}

const normals = (a, b, c) => {
  // obtengo dos rectas, a partir de los tres puntos
  let p = [0, 0, 0]
  let q = [0, 0, 0]
  let n = [0, 0, 0]
  // primer vector
  p[0] = b[0] - a[0]
  p[1] = b[1] - a[1]
  p[2] = b[2] - a[2]
  // segundo vector
  q[0] = c[0] - a[0]
  q[1] = c[1] - a[1]
  q[2] = c[2] - a[2]
  // Obtengo la normal, a partir del producto cruz
  n[0] = (p[1] * q[2] - p[2] * q[1])
  n[1] = -1 * p[0] * q[2] + p[2] * q[0]
  n[2] = p[0] * q[1] - p[1] * q[0]
  // Ahora normalizo
  var sum = Math.sqrt(n[0] * n[0] + n[1] * n[1] + n[2] * n[2])
  return [n[0] / sum, n[1] / sum, n[2] / sum]
  // throw new Error('Not implemented')
}

module.exports = {
  normalize,
  cross,
  normals
}
