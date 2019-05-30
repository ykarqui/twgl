attribute vec4 aPosition;
uniform mat4 uniMatrix;
uniform vec4 uColor;

varying vec4 vColor;

void main() {
  gl_Position = uniMatrix * aPosition;
  vColor = uColor;
}
