// fragment shader ( フラグメントシェーダー、ピクセルシェーダー )
// このファイルに各ピクセルごとの処理を記述します

varying vec2 vUv;

uniform float uAspect;
uniform float uTime;

void main() {
  // vec4 color = vec4(vUv.x, vUv.y, 0.0, 1.0);// rgba

  vec2 uv = vec2( vUv.x * uAspect, vUv.y );
  vec2 center = vec2(.5 * uAspect, .5);
  float radius = 0.05 + sin( uTime * 2.0 ) * 0.025;
  float lightness = radius / length( uv - center );
  // lightness = clamp(lightness, 0.0, 1.0);
  vec4 color = vec4( vec3(lightness), 1.0 );
  color *= vec4(0.2, 1.0, 0.5, 1.0);

  gl_FragColor = color;// gl_FragColor に vec4 型（rgba）の色を入れることでピクセル色を決定する。
}
