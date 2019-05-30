attribute vec3 aPosition;
attribute vec3 aNormal;
attribute vec2 aTexcoords;
uniform mat4 uModelMatrix;
uniform mat4 uViewMatrix;
uniform mat4 uProjectionMatrix;
uniform mat4 uNormalMatrix;
varying vec3 vFragPos;
varying vec3 vNormal;


void main()
{
   gl_Position = uProjectionMatrix * uViewMatrix * uModelMatrix * vec4(aPosition, 1.0);
   vFragPos = vec3(uModelMatrix * vec4(aPosition, 1.0));
   vNormal = mat3(uNormalMatrix) * aNormal;
}
