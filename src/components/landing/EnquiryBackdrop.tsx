"use client";

import React, { useEffect, useRef } from "react";

/**
 * EnquiryBackdrop — a living blueprint-blue backdrop for the enquiry section.
 *
 * A small WebGL fragment shader (domain-warped noise) draws slow, smoke-like currents of blueprint blue.
 * It flows on its own, leans gently towards the pointer, and rests when no one is looking: it only renders
 * while the section is on screen and the tab is visible. It renders at half resolution (the image is soft
 * anyway), and with reduced motion it paints a single still frame. Without WebGL the CSS gradient behind
 * the canvas stays visible.
 */

const VERTEX = `
attribute vec2 a_pos;
varying vec2 v_uv;
void main() {
  v_uv = a_pos * 0.5 + 0.5;
  gl_Position = vec4(a_pos, 0.0, 1.0);
}`;

const FRAGMENT = `
precision mediump float;
uniform vec2 u_res;
uniform float u_time;
uniform vec2 u_pointer;
uniform float u_pull;
varying vec2 v_uv;

float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
             mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  mat2 m = mat2(1.6, 1.2, -1.2, 1.6);
  for (int i = 0; i < 5; i++) {
    v += a * noise(p);
    p = m * p;
    a *= 0.5;
  }
  return v;
}

void main() {
  vec2 aspect = vec2(u_res.x / u_res.y, 1.0);
  vec2 p = (v_uv - 0.5) * aspect * 1.7;
  float t = u_time * 0.04;

  // Lean towards the pointer: pull nearby space in, with a soft falloff
  vec2 d = p - (u_pointer - 0.5) * aspect * 1.7;
  float near = exp(-dot(d, d) * 2.4) * u_pull;
  p -= d * near * 0.38;

  // Domain-warped noise gives the slow, folding smoke currents
  vec2 q = vec2(fbm(p + vec2(0.0, t)), fbm(p + vec2(5.2, 1.3) - t));
  vec2 r = vec2(fbm(p + 3.4 * q + vec2(1.7, 9.2) + t * 1.25),
                fbm(p + 3.4 * q + vec2(8.3, 2.8) - t * 1.1));
  float f = fbm(p + 3.0 * r);

  vec3 deep = vec3(0.047, 0.122, 0.247);  // #0C1F3F
  vec3 base = vec3(0.071, 0.188, 0.369);  // #12305E
  vec3 mid  = vec3(0.122, 0.302, 0.561);  // #1F4D8F
  vec3 wisp = vec3(0.416, 0.596, 0.859);  // #6A98DB

  vec3 col = mix(deep, base, smoothstep(0.15, 0.65, f));
  col = mix(col, mid, smoothstep(0.3, 0.9, length(q)) * 0.9);
  // Light wisps stay dim so cream text on top keeps its contrast
  col = mix(col, wisp, smoothstep(0.6, 1.05, r.x * f * 1.6) * 0.32);
  col += wisp * near * 0.08;

  // Soft vignette
  float vig = smoothstep(1.3, 0.2, length((v_uv - 0.5) * vec2(1.05, 1.35)));
  col *= mix(0.7, 1.0, vig);

  gl_FragColor = vec4(col, 1.0);
}`;

const compile = (gl: WebGLRenderingContext, type: number, source: string) => {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader);
    return null;
  }
  return shader;
};

export const EnquiryBackdrop: React.FC<{ className?: string }> = ({ className = "" }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl", {
      antialias: false,
      alpha: false,
      depth: false,
      stencil: false,
      powerPreference: "low-power",
    });
    if (!gl) return; // CSS gradient fallback stays visible

    const vs = compile(gl, gl.VERTEX_SHADER, VERTEX);
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAGMENT);
    const program = gl.createProgram();
    if (!vs || !fs || !program) return;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;
    gl.useProgram(program);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const aPos = gl.getAttribLocation(program, "a_pos");
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(program, "u_res");
    const uTime = gl.getUniformLocation(program, "u_time");
    const uPointer = gl.getUniformLocation(program, "u_pointer");
    const uPull = gl.getUniformLocation(program, "u_pull");

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    // Pointer target (uv space) and the eased values the shader sees
    const pointer = { x: 0.5, y: 0.5, tx: 0.5, ty: 0.5, pull: 0, tpull: 0 };

    const resize = () => {
      // Half resolution: the image is soft, so this costs a quarter of the pixels with no visible loss
      const scale = Math.min(window.devicePixelRatio || 1, 2) * 0.5;
      const w = Math.max(1, Math.round(canvas.clientWidth * scale));
      const h = Math.max(1, Math.round(canvas.clientHeight * scale));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        gl.viewport(0, 0, w, h);
      }
    };

    let time = 7.5; // start mid-flow so the first frame already looks settled
    let last = performance.now();
    const draw = () => {
      resize();
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform1f(uTime, time);
      gl.uniform2f(uPointer, pointer.x, pointer.y);
      gl.uniform1f(uPull, pointer.pull);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    let raf = 0;
    let onScreen = false;
    const frame = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      time += dt;
      pointer.x += (pointer.tx - pointer.x) * 0.05;
      pointer.y += (pointer.ty - pointer.y) * 0.05;
      pointer.pull += (pointer.tpull - pointer.pull) * 0.035;
      draw();
      raf = requestAnimationFrame(frame);
    };

    const shouldRun = () => onScreen && !document.hidden && !reduceMotion.matches;
    const update = () => {
      if (shouldRun()) {
        if (!raf) {
          last = performance.now();
          raf = requestAnimationFrame(frame);
        }
      } else {
        if (raf) cancelAnimationFrame(raf);
        raf = 0;
        draw(); // keep a still frame (reduced motion, offscreen or hidden tab)
      }
    };

    const io = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
      update();
    });
    io.observe(canvas);

    const onPointerMove = (e: PointerEvent) => {
      if (!onScreen || reduceMotion.matches) return;
      const rect = canvas.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = 1 - (e.clientY - rect.top) / rect.height;
      const inside = x >= 0 && x <= 1 && y >= 0 && y <= 1;
      if (inside) {
        pointer.tx = x;
        pointer.ty = y;
      }
      pointer.tpull = inside ? 1 : 0;
    };
    const onPointerLeave = () => {
      pointer.tpull = 0;
    };

    const ro = new ResizeObserver(() => {
      if (!raf) draw();
    });
    ro.observe(canvas);

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onPointerLeave);
    document.addEventListener("visibilitychange", update);
    reduceMotion.addEventListener("change", update);
    draw();

    return () => {
      if (raf) cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      document.documentElement.removeEventListener("pointerleave", onPointerLeave);
      document.removeEventListener("visibilitychange", update);
      reduceMotion.removeEventListener("change", update);
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none bg-[radial-gradient(ellipse_at_30%_20%,#1F4D8F_0%,#12305E_45%,#0C1F3F_100%)] ${className}`}
    >
      <canvas ref={canvasRef} className="block h-full w-full" />
    </div>
  );
};
