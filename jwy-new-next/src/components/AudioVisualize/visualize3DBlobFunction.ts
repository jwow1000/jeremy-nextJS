import React from "react";

interface VisualizeAudioProps {
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  analyserRef: React.RefObject<AnalyserNode | null>;
}

// ── Gradient color pair (RGB 0–1) ──────────────────────────────────────────
const COLOR1 = [0.96, 0.60, 0.80] as const; // warm pink
const COLOR2 = [0.35, 0.25, 0.85] as const; // deep violet

// ── Vertex shader — fullscreen quad passthrough ────────────────────────────
const VS = `
  attribute vec2 aPosition;
  varying   vec2 vUv;

  void main() {
    vUv         = aPosition * 0.5 + 0.5; // remap [-1,1] → [0,1]
    gl_Position = vec4(aPosition, 0.0, 1.0);
  }
`;

// ── Fragment shader — all visual work done here ────────────────────────────
const FS = `
  precision mediump float;

  varying vec2  vUv;

  uniform float uTime;
  uniform float uFreqs[8]; // 8 frequency buckets, low → high
  uniform float uVolume;
  uniform vec3  uColor1;
  uniform vec3  uColor2;
  uniform vec2  uResolution;

  // ── Simplex 3D noise (Stefan Gustavson, public domain) ──
  vec3 mod289v3(vec3 x) { return x - floor(x * (1.0/289.0)) * 289.0; }
  vec4 mod289v4(vec4 x) { return x - floor(x * (1.0/289.0)) * 289.0; }
  vec4 permute(vec4 x)  { return mod289v4(((x*34.0)+1.0)*x); }
  vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314*r; }

  float snoise(vec3 v) {
    const vec2 C = vec2(1.0/6.0, 1.0/3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
    vec3 i  = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);
    vec3 g  = step(x0.yzx, x0.xyz);
    vec3 l  = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);
    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;
    i = mod289v3(i);
    vec4 p = permute(permute(permute(
      i.z + vec4(0.0,i1.z,i2.z,1.0))
      + i.y + vec4(0.0,i1.y,i2.y,1.0))
      + i.x + vec4(0.0,i1.x,i2.x,1.0));
    float n_ = 0.142857142857;
    vec3  ns = n_ * D.wyz - D.xzx;
    vec4  j  = p - 49.0 * floor(p * ns.z * ns.z);
    vec4  x_ = floor(j * ns.z);
    vec4  y_ = floor(j - 7.0 * x_);
    vec4  x  = x_ * ns.x + ns.yyyy;
    vec4  y  = y_ * ns.x + ns.yyyy;
    vec4  h  = 1.0 - abs(x) - abs(y);
    vec4  b0 = vec4(x.xy, y.xy);
    vec4  b1 = vec4(x.zw, y.zw);
    vec4  s0 = floor(b0) * 2.0 + 1.0;
    vec4  s1 = floor(b1) * 2.0 + 1.0;
    vec4  sh = -step(h, vec4(0.0));
    vec4  a0 = b0.xzyw + s0.xzyw * sh.xxyy;
    vec4  a1 = b1.xzyw + s1.xzyw * sh.zzww;
    vec3  p0 = vec3(a0.xy, h.x);
    vec3  p1 = vec3(a0.zw, h.y);
    vec3  p2 = vec3(a1.xy, h.z);
    vec3  p3 = vec3(a1.zw, h.w);
    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
    p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
    vec4 m = max(0.6 - vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m*m, vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
  }
  // ────────────────────────────────────────────────────────

  // Each noise octave is driven by its own frequency bucket.
  // Low buckets → large slow blobs. High buckets → fine fast detail.
  float height(vec2 p) {
    float t = uTime;
    return
      snoise(vec3(p * 0.8,  t * 0.10)) * uFreqs[0] * 0.22 +
      snoise(vec3(p * 1.4  + vec2(1.3, 0.7), t * 0.14)) * uFreqs[1] * 0.20 +
      snoise(vec3(p * 2.2  + vec2(2.1, 3.4), t * 0.18)) * uFreqs[2] * 0.17 +
      snoise(vec3(p * 3.4  + vec2(5.2, 1.1), t * 0.23)) * uFreqs[3] * 0.14 +
      snoise(vec3(p * 5.2  + vec2(3.8, 6.2), t * 0.30)) * uFreqs[4] * 0.11 +
      snoise(vec3(p * 7.8  + vec2(7.1, 2.9), t * 0.38)) * uFreqs[5] * 0.08 +
      snoise(vec3(p * 11.5 + vec2(1.6, 8.3), t * 0.48)) * uFreqs[6] * 0.05 +
      snoise(vec3(p * 16.5 + vec2(9.4, 4.7), t * 0.60)) * uFreqs[7] * 0.03;
  }

  void main() {
    // Center UV at (0,0) and correct for aspect ratio
    vec2 uv = vUv - 0.5;
    uv.x *= uResolution.x / uResolution.y;

    float eps = 0.004;
    float h   = height(uv);

    // Numerical gradient → fake surface normal for 3D bump lighting
    float hx  = height(uv + vec2(eps, 0.0)) - height(uv - vec2(eps, 0.0));
    float hy  = height(uv + vec2(0.0, eps)) - height(uv - vec2(0.0, eps));
    vec3  nor = normalize(vec3(-hx, -hy, eps * 6.0));

    // Directional light
    vec3  light = normalize(vec3(0.5, 0.8, 1.0));
    float diff  = max(dot(nor, light), 0.0);
    float lit   = 0.30 + 0.70 * diff;

    // Map noise → [0,1], then sharpen edges with a narrow smoothstep
    float t    = clamp(h * 1.4 + 0.5, 0.0, 1.0);
    t          = smoothstep(0.38, 0.62, t); // hard-edged blob boundary
    vec3  col  = mix(uColor1, uColor2, t) * lit;

    float alpha1 = 0.5 + uVolume * 0.5;
    float alpha2 = 0.8 + uVolume * 0.2;
    float alpha  = mix(alpha1, alpha2, t);

    gl_FragColor = vec4(col, alpha);
  }
`;

// ── WebGL helpers ──────────────────────────────────────────────────────────
function compileShader(gl: WebGLRenderingContext, type: number, src: string): WebGLShader {
  const shader = gl.createShader(type)!;
  gl.shaderSource(shader, src);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS))
    throw new Error(gl.getShaderInfoLog(shader) ?? "shader compile error");
  return shader;
}

function createProgram(gl: WebGLRenderingContext, vs: string, fs: string): WebGLProgram {
  const prog = gl.createProgram()!;
  gl.attachShader(prog, compileShader(gl, gl.VERTEX_SHADER, vs));
  gl.attachShader(prog, compileShader(gl, gl.FRAGMENT_SHADER, fs));
  gl.linkProgram(prog);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS))
    throw new Error(gl.getProgramInfoLog(prog) ?? "program link error");
  return prog;
}

// ── Main export ────────────────────────────────────────────────────────────
export const visualize3DBlob = ({ canvasRef, analyserRef }: VisualizeAudioProps) => {
  if (!canvasRef.current) return;

  const canvas = canvasRef.current;
  const gl = canvas.getContext("webgl");
  if (!gl) return;

  // ── Fullscreen quad: two triangles covering NDC ──
  const quadVerts = new Float32Array([-1, -1,  1, -1, -1,  1,  1,  1]);
  const quadBuf   = gl.createBuffer()!;
  gl.bindBuffer(gl.ARRAY_BUFFER, quadBuf);
  gl.bufferData(gl.ARRAY_BUFFER, quadVerts, gl.STATIC_DRAW);

  // ── Compile program ──
  const prog = createProgram(gl, VS, FS);
  gl.useProgram(prog);

  const aPosition    = gl.getAttribLocation(prog,  "aPosition");
  const uTime        = gl.getUniformLocation(prog, "uTime");
  const uFreqs       = gl.getUniformLocation(prog, "uFreqs");
  const uVolume      = gl.getUniformLocation(prog, "uVolume");
  const uColor1      = gl.getUniformLocation(prog, "uColor1");
  const uColor2      = gl.getUniformLocation(prog, "uColor2");
  const uResolution  = gl.getUniformLocation(prog, "uResolution");

  gl.uniform3fv(uColor1, COLOR1);
  gl.uniform3fv(uColor2, COLOR2);

  // ── Audio smoothing state ──
  const SMOOTHING    = 0.60;
  const NUM_BUCKETS  = 8;
  const smoothedFreqs = new Float32Array(NUM_BUCKETS);
  let   smoothedVol   = 0;
  const startTime = performance.now();

  // ── Render loop ──
  const renderFrame = () => {
    if (!canvasRef.current) return;

    const analyser = analyserRef.current;
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;

    if (canvas.width !== w || canvas.height !== h) {
      canvas.width  = w;
      canvas.height = h;
    }

    // Audio — bucket the spectrum into NUM_BUCKETS bands
    const binCount = analyser?.frequencyBinCount ?? 128;
    const raw = new Uint8Array(binCount);
    if (analyser) analyser.getByteFrequencyData(raw);

    let totalSum = 0;
    for (let b = 0; b < NUM_BUCKETS; b++) {
      const start = Math.floor((b / NUM_BUCKETS) * binCount);
      const end   = Math.floor(((b + 1) / NUM_BUCKETS) * binCount);
      let sum = 0;
      for (let i = start; i < end; i++) sum += raw[i];
      const raw_b = sum / (end - start) / 255;
      smoothedFreqs[b] = smoothedFreqs[b] * SMOOTHING + raw_b * (1 - SMOOTHING);
      totalSum += sum;
    }
    const volumeRaw = totalSum / binCount / 255;
    smoothedVol = smoothedVol * SMOOTHING + volumeRaw * (1 - SMOOTHING);

    const t = (performance.now() - startTime) / 1000;

    gl.viewport(0, 0, w, h);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.uniform1f(uTime, t);
    gl.uniform1fv(uFreqs, smoothedFreqs);
    gl.uniform1f(uVolume, smoothedVol);
    gl.uniform2f(uResolution, w, h);

    gl.bindBuffer(gl.ARRAY_BUFFER, quadBuf);
    gl.enableVertexAttribArray(aPosition);
    gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);

    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

    requestAnimationFrame(renderFrame);
  };

  renderFrame();
};
