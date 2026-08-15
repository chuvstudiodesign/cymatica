/**
 * Shaders da placa de Chladni.
 *
 * A física é real, não decorativa. Numa placa quadrada vibrando, a amplitude é
 *
 *     f(x,y) = a·sin(πmx)·sin(πny) + b·sin(πnx)·sin(πmy)
 *
 * e a areia se acumula onde f = 0 — as linhas nodais. Cada partícula parte de
 * uma posição fixa e caminha até a linha nodal mais próxima por passos de
 * Newton sobre a curva de nível:
 *
 *     p ← p − f·∇f / |∇f|²
 *
 * Como a posição convergida é função contínua de (m, n), interpolar os modos
 * faz o padrão inteiro se reorganizar suavemente. É a marca mudando de
 * frequência — o momento mais forte do site.
 */

export const chladniVertexShader = /* glsl */ `
  precision highp float;

  uniform float uM;
  uniform float uN;
  uniform float uA;
  uniform float uB;
  uniform vec2  uMouse;      // -1..1, já em espaço da placa
  uniform float uMouseForce;
  uniform float uSize;
  uniform float uPixelRatio;

  attribute float aScale;    // variação de tamanho por partícula

  varying float vFlatness;   // quão rasa é a placa no ponto de repouso

  const float PI = 3.141592653589793;

  float chladni(vec2 p, float m, float n) {
    return uA * sin(PI * m * p.x) * sin(PI * n * p.y)
         + uB * sin(PI * n * p.x) * sin(PI * m * p.y);
  }

  vec2 gradChladni(vec2 p, float m, float n) {
    float e = 0.0015;
    float fx = chladni(p + vec2(e, 0.0), m, n) - chladni(p - vec2(e, 0.0), m, n);
    float fy = chladni(p + vec2(0.0, e), m, n) - chladni(p - vec2(0.0, e), m, n);
    return vec2(fx, fy) / (2.0 * e);
  }

  void main() {
    // A geometria carrega a semente em 0..1; a placa vive em -1..1.
    vec2 p = position.xy * 2.0 - 1.0;

    // O cursor perturba a frequência local, como um dedo encostado na placa.
    float d = distance(p, uMouse);
    float local = uMouseForce * exp(-d * d * 3.0);
    float m = uM + local;
    float n = uN - local;

    // Relaxação até a linha nodal. Oito passos bastam: Newton converge rápido.
    for (int i = 0; i < 8; i++) {
      float f = chladni(p, m, n);
      vec2 g = gradChladni(p, m, n);
      float gg = dot(g, g);
      if (gg < 1e-5) break;
      p -= f * g / gg * 0.9;
      p = clamp(p, vec2(-1.0), vec2(1.0));
    }

    // A areia empilha onde a placa é mais plana junto ao nó. Essa é a medida
    // que decide o acento — o resíduo, após Newton, é zero em toda parte e não
    // distinguiria nada.
    vFlatness = 1.0 / (1.0 + length(gradChladni(p, m, n)) * 0.55);

    vec4 mv = modelViewMatrix * vec4(p, 0.0, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = uSize * aScale * uPixelRatio * (1.0 / -mv.z);
  }
`

export const chladniFragmentShader = /* glsl */ `
  precision highp float;

  uniform vec3  uColorGrain;   // partícula assentada
  uniform vec3  uColorNode;    // acento da marca, só na linha nodal
  uniform float uOpacity;
  uniform float uAccentGamma;  // quanto o acento é restrito

  varying float vFlatness;

  void main() {
    // Ponto redondo com borda suave.
    vec2 c = gl_PointCoord - 0.5;
    float r = dot(c, c);
    if (r > 0.25) discard;
    float alpha = smoothstep(0.25, 0.05, r);

    // Gama alto de propósito: quase todo o campo permanece grão, e o laranja
    // fica reservado aos poucos pontos onde a areia realmente se acumula.
    // Sobre fundo claro o acento pode ser mais generoso — daí ser ajustável.
    float accent = pow(vFlatness, uAccentGamma);
    vec3 color = mix(uColorGrain, uColorNode, accent);

    gl_FragColor = vec4(color, alpha * uOpacity * (0.5 + 0.5 * accent));
  }
`
