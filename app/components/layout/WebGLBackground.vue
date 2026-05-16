<script setup lang="ts">
import { onMounted, onBeforeUnmount } from "vue";

let animId: number;
let gl: WebGLRenderingContext | null = null;

onMounted(() => {
  const canvas = document.getElementById("bg-canvas") as HTMLCanvasElement | null;
  if (!canvas) return;

  gl = canvas.getContext("webgl");
  if (!gl) return;

  const vsSource = `
    attribute vec2 position;
    void main() {
      gl_Position = vec4(position, 0.0, 1.0);
    }
  `;

  const fsSource = `
    precision highp float;
    uniform float u_time;
    uniform vec2 u_resolution;

    float rand(vec2 co) {
      return fract(sin(dot(co, vec2(12.9898, 78.233))) * 43758.5453);
    }

    void main() {
      vec2 uv = gl_FragCoord.xy / u_resolution;
      vec2 grid = floor(uv * 80.0);
      float r = rand(grid);
      float pulse = 0.4 + 0.6 * sin(u_time * 0.5 + r * 6.28318);
      float dot = step(0.92, r) * pulse;
      gl_FragColor = vec4(vec3(dot), dot * 0.6);
    }
  `;

  function compile(type: number, src: string) {
    const s = gl!.createShader(type)!;
    gl!.shaderSource(s, src);
    gl!.compileShader(s);
    return s;
  }

  const prog = gl.createProgram()!;
  gl.attachShader(prog, compile(gl.VERTEX_SHADER, vsSource));
  gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, fsSource));
  gl.linkProgram(prog);
  gl.useProgram(prog);

  const buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);

  const pos = gl.getAttribLocation(prog, "position");
  gl.enableVertexAttribArray(pos);
  gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0);

  const uTime = gl.getUniformLocation(prog, "u_time");
  const uRes = gl.getUniformLocation(prog, "u_resolution");

  function resize() {
    canvas!.width = window.innerWidth;
    canvas!.height = window.innerHeight;
    gl!.viewport(0, 0, canvas!.width, canvas!.height);
    gl!.uniform2f(uRes, canvas!.width, canvas!.height);
  }

  window.addEventListener("resize", resize);
  resize();

  let start = 0;
  function draw(ts: number) {
    if (!start) start = ts;
    gl!.uniform1f(uTime, (ts - start) / 1000);
    gl!.drawArrays(gl!.TRIANGLE_STRIP, 0, 4);
    animId = requestAnimationFrame(draw);
  }

  animId = requestAnimationFrame(draw);

  onBeforeUnmount(() => {
    cancelAnimationFrame(animId);
    window.removeEventListener("resize", resize);
  });
});
</script>

<template>
  <canvas id="bg-canvas" class="bg-canvas" aria-hidden="true" />
  <div class="grain-overlay" aria-hidden="true" />
</template>

<style scoped>
.bg-canvas {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: -1;
  pointer-events: none;
  opacity: 0.4;
}
</style>
