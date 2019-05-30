attribute vec4 aPosition;

uniform mat4 uModelMatrix;
uniform vec4 uColor;
uniform mat4 uProjectionMatrix;
uniform mat4 uViewMatrix;

varying vec4 vColor;


void main() {
  gl_Position = uProjectionMatrix * uViewMatrix * uModelMatrix * aPosition;
  vColor = uColor;

}
