precision mediump float;

attribute vec3 position;
uniform mat4 model;

void main () {
  gl_Position = model * vec4(position, 1);
}
