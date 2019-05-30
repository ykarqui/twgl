precision mediump float;

struct Material {
  sampler2D diffuse;
  // vec3 diffuse;
  vec3 specular;
  float shininess;
};

struct DirLight {
  bool active;
  vec3 direction;

  vec3 ambient;
  vec3 diffuse;
  vec3 specular;
};

struct PointLight {
  bool active;
  vec3 position;

  float constant;
  float linear;
  float quadratic;

  vec3 ambient;
  vec3 diffuse;
  vec3 specular;
};

struct SpotLight {
  bool active;
  vec3 position;
  vec3 direction;
  float cutOff;
  float outerCutOff;

  float constant;
  float linear;
  float quadratic;

  vec3 ambient;
  vec3 diffuse;
  vec3 specular;
};

struct AmbientLight {
  bool active;
  vec3 color;
};

#define NR_POINT_LIGHTS 2
#define NR_SPOT_LIGHTS 1

varying vec3 vFragPos;
varying vec3 vNormal;
varying vec2 vTexCoords;

uniform vec3 uViewPos;
uniform DirLight dirLight;
uniform PointLight pointLights[NR_POINT_LIGHTS];
uniform SpotLight spotLights[NR_SPOT_LIGHTS];
uniform Material material;
uniform AmbientLight ambientLight;
uniform bool uNormalView;

vec3 CalcDirLight(DirLight light, vec3 normal, vec3 viewDir);
vec3 CalcPointLight(PointLight light, vec3 normal, vec3 fragPos, vec3 viewDir);
vec3 CalcSpotLight(SpotLight light, vec3 normal, vec3 fragPos, vec3 viewDir);
vec3 ColorFromNormal(vec3 norm);

void main()
{
  vec3 norm = normalize(vNormal);
  vec3 viewDir = normalize(uViewPos - vFragPos);

  vec3 result = vec3(0.0);
  if(uNormalView == true) {
    gl_FragColor = vec4((norm), 1);
  } else {
    if (ambientLight.active == true){
      result = ambientLight.color * vec3(texture2D(material.diffuse, vTexCoords));
    }
    if (dirLight.active == true) {
      result += CalcDirLight(dirLight, norm, viewDir);
    }
    for(int i = 0; i < NR_POINT_LIGHTS; i++) {
      if (pointLights[i].active == true) {
        result += CalcPointLight(pointLights[i], norm, vFragPos, viewDir);
      }
    }

      for(int i = 0; i < NR_SPOT_LIGHTS; i++) {
        if (spotLights[i].active == true) {
          result += CalcSpotLight(spotLights[i], norm, vFragPos, viewDir);
        }
      }
    gl_FragColor = vec4(result, 1.0);
  }
}

vec3 CalcDirLight(DirLight light, vec3 normal, vec3 viewDir)
{
  vec3 lightDir = normalize(-light.direction);
  float diff = max(dot(normal, lightDir), 0.0);
  vec3 reflectDir = reflect(-lightDir, normal);
  float spec = pow(max(dot(viewDir, reflectDir), 0.0), material.shininess);
  vec3 ambient = light.ambient * vec3(texture2D(material.diffuse, vTexCoords));
  vec3 diffuse = light.diffuse * diff * vec3(texture2D(material.diffuse, vTexCoords));
  vec3 specular = light.specular * spec * vec3(texture2D(material.diffuse, vTexCoords));
  return (ambient + diffuse + specular);
}

vec3 CalcPointLight(PointLight light, vec3 normal, vec3 fragPos, vec3 viewDir)
{
  vec3 lightDir = normalize(light.position - fragPos);
  float diff = max(dot(normal, lightDir), 0.0);
  vec3 reflectDir = reflect(-lightDir, normal);
  float spec = pow(max(dot(viewDir, reflectDir), 0.0), material.shininess);
  vec3 ambient = light.ambient * vec3(texture2D(material.diffuse, vTexCoords));
  vec3 diffuse = light.diffuse * diff * vec3(texture2D(material.diffuse, vTexCoords));
  vec3 specular = light.specular * spec * vec3(texture2D(material.diffuse, vTexCoords));

  float distance = length(light.position - fragPos);
  float attenuation = 1.0 / (light.constant + light.linear * distance + light.quadratic * (distance * distance));
  ambient *= attenuation;
  diffuse *= attenuation;
  specular *= attenuation;
  return (ambient + diffuse + specular);
}

vec3 CalcSpotLight(SpotLight light, vec3 normal, vec3 fragPos, vec3 viewDir)
{
  vec3 lightDir = normalize(light.position - fragPos);
  float diff = max(dot(normal, lightDir), 0.0);
  vec3 reflectDir = reflect(-lightDir, normal);
  float spec = pow(max(dot(viewDir, reflectDir), 0.0), material.shininess);
  float distance = length(light.position - fragPos);
  float attenuation = 1.0 / (light.constant + light.linear * distance + light.quadratic * (distance * distance));
  float theta = dot(lightDir, normalize(-light.direction));
  float epsilon = light.cutOff - light.outerCutOff;
  float intensity = clamp((theta - light.outerCutOff) / epsilon, 0.0, 1.0);
  vec3 ambient = light.ambient * vec3(texture2D(material.diffuse, vTexCoords));
  vec3 diffuse = light.diffuse * diff * vec3(texture2D(material.diffuse, vTexCoords));
  vec3 specular = light.specular * spec * vec3(texture2D(material.diffuse, vTexCoords));
  ambient *= attenuation * intensity;
  diffuse *= attenuation * intensity;
  specular *= attenuation * intensity;
  return (ambient + diffuse + specular);
}

vec3 ColorFromNormal(vec3 color) {
  color[0] = (color[0] + 1.0) / 2.0;
  color[1] = (color[1] + 1.0) / 2.0;
  color[2] = (color[2] + 1.0) / 2.0;
  return color;
}
