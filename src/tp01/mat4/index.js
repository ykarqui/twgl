const transpose = (A) => {
  let B = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  // hago una matriz gemela
  for (let i = 0; i < A.length; i++) {
    B[i] = A[i]
  }
  // intercambio los comp necesarios
  B[1] = A[4]
  B[2] = A[8]
  B[3] = A[12]
  B[4] = A[1]
  B[6] = A[9]
  B[7] = A[13]
  B[8] = A[2]
  B[9] = A[6]
  B[11] = A[14]
  B[12] = A[3]
  B[13] = A[7]
  B[14] = A[11]
  return B
  // throw new Error('Not implemented')
}
const mul = (A, I) => {
  throw new Error('Not implemented')
}
module.exports = {
  transpose,
  mul
}
