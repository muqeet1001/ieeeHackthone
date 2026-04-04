import React, { useRef, useEffect, useState } from 'react';

/* ─────────────────────────────────────────────────────────────────────────────
 *  Animated Shader Hero — WebGL2 shooting stars + volumetric clouds
 *  Based on the 21st.dev/ravikatiyar162 component
 *  Shader by Matthias Hurrle (@atzedent), adapted for hackathon theme
 * ───────────────────────────────────────────────────────────────────────────── */

// ── WebGL2 Renderer ─────────────────────────────────────────────────────────

class WebGLRenderer {
  constructor(canvas, scale) {
    this.canvas = canvas;
    this.scale = scale;
    this.gl = canvas.getContext('webgl2');
    if (!this.gl) return;
    this.gl.viewport(0, 0, canvas.width * scale, canvas.height * scale);
    this.shaderSource = defaultShaderSource;
    this.program = null;
    this.vs = null;
    this.fs = null;
    this.buffer = null;
    this.mouseMove = [0, 0];
    this.mouseCoords = [0, 0];
    this.pointerCoords = [0, 0];
    this.nbrOfPointers = 0;

    this.vertexSrc = `#version 300 es
precision highp float;
in vec4 position;
void main(){gl_Position=position;}`;

    this.vertices = [-1, 1, -1, -1, 1, 1, 1, -1];
  }

  updateShader(source) {
    this.reset();
    this.shaderSource = source;
    this.setup();
    this.init();
  }

  updateMove(deltas) { this.mouseMove = deltas; }
  updateMouse(coords) { this.mouseCoords = coords; }
  updatePointerCoords(coords) { this.pointerCoords = coords; }
  updatePointerCount(nbr) { this.nbrOfPointers = nbr; }

  updateScale(scale) {
    this.scale = scale;
    if (this.gl) this.gl.viewport(0, 0, this.canvas.width * scale, this.canvas.height * scale);
  }

  compile(shader, source) {
    const gl = this.gl;
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.error('Shader compilation error:', gl.getShaderInfoLog(shader));
    }
  }

  test(source) {
    let result = null;
    const gl = this.gl;
    const shader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      result = gl.getShaderInfoLog(shader);
    }
    gl.deleteShader(shader);
    return result;
  }

  reset() {
    const gl = this.gl;
    if (this.program && !gl.getProgramParameter(this.program, gl.DELETE_STATUS)) {
      if (this.vs) { gl.detachShader(this.program, this.vs); gl.deleteShader(this.vs); }
      if (this.fs) { gl.detachShader(this.program, this.fs); gl.deleteShader(this.fs); }
      gl.deleteProgram(this.program);
    }
  }

  setup() {
    const gl = this.gl;
    this.vs = gl.createShader(gl.VERTEX_SHADER);
    this.fs = gl.createShader(gl.FRAGMENT_SHADER);
    this.compile(this.vs, this.vertexSrc);
    this.compile(this.fs, this.shaderSource);
    this.program = gl.createProgram();
    gl.attachShader(this.program, this.vs);
    gl.attachShader(this.program, this.fs);
    gl.linkProgram(this.program);
    if (!gl.getProgramParameter(this.program, gl.LINK_STATUS)) {
      console.error(gl.getProgramInfoLog(this.program));
    }
  }

  init() {
    const gl = this.gl;
    const program = this.program;
    this.buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertices), gl.STATIC_DRAW);
    const position = gl.getAttribLocation(program, 'position');
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
    program._resolution = gl.getUniformLocation(program, 'resolution');
    program._time = gl.getUniformLocation(program, 'time');
    program._move = gl.getUniformLocation(program, 'move');
    program._touch = gl.getUniformLocation(program, 'touch');
    program._pointerCount = gl.getUniformLocation(program, 'pointerCount');
    program._pointers = gl.getUniformLocation(program, 'pointers');
  }

  render(now = 0) {
    const gl = this.gl;
    const program = this.program;
    if (!program || gl.getProgramParameter(program, gl.DELETE_STATUS)) return;
    gl.clearColor(0, 0, 0, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.useProgram(program);
    gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
    gl.uniform2f(program._resolution, this.canvas.width, this.canvas.height);
    gl.uniform1f(program._time, now * 1e-3);
    gl.uniform2f(program._move, ...this.mouseMove);
    gl.uniform2f(program._touch, ...this.mouseCoords);
    gl.uniform1i(program._pointerCount, this.nbrOfPointers);
    gl.uniform2fv(program._pointers, this.pointerCoords);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  }
}

// ── Pointer Handler ─────────────────────────────────────────────────────────

class PointerHandler {
  constructor(element, scale) {
    this.scale = scale;
    this.active = false;
    this.hovering = false;
    this.pointers = new Map();
    this.lastCoords = [0, 0];
    this.hoverCoords = [0, 0];
    this.moves = [0, 0];
    this.element = element;

    const map = (el, s, x, y) => [x * s, el.height - y * s];

    element.addEventListener('pointerdown', (e) => {
      this.active = true;
      this.pointers.set(e.pointerId, map(element, this.scale, e.clientX, e.clientY));
    });

    element.addEventListener('pointerup', (e) => {
      if (this.count === 1) this.lastCoords = this.first;
      this.pointers.delete(e.pointerId);
      this.active = this.pointers.size > 0;
    });

    element.addEventListener('pointerenter', () => {
      this.hovering = true;
    });

    element.addEventListener('pointerleave', (e) => {
      this.hovering = false;
      if (this.count === 1) this.lastCoords = this.first;
      this.pointers.delete(e.pointerId);
      this.active = this.pointers.size > 0;
    });

    element.addEventListener('pointermove', (e) => {
      // Always track hover position
      this.hoverCoords = map(element, this.scale, e.clientX, e.clientY);
      this.moves = [this.moves[0] + e.movementX, this.moves[1] + e.movementY];

      if (this.active) {
        this.lastCoords = [e.clientX, e.clientY];
        this.pointers.set(e.pointerId, map(element, this.scale, e.clientX, e.clientY));
      }
    });
  }

  updateScale(scale) { this.scale = scale; }

  get count() {
    // Return 1 when hovering so the shader activates mouse effects
    return this.hovering ? Math.max(1, this.pointers.size) : this.pointers.size;
  }
  get move() { return this.moves; }

  get coords() {
    if (this.pointers.size > 0) return Array.from(this.pointers.values()).flat();
    if (this.hovering) return this.hoverCoords;
    return [0, 0];
  }

  get first() {
    if (this.pointers.size > 0) return this.pointers.values().next().value;
    if (this.hovering) return this.hoverCoords;
    return this.lastCoords;
  }
}

// ── Custom hook for shader background ────────────────────────────────────────

function useShaderBackground() {
  const canvasRef = useRef(null);
  const animationFrameRef = useRef();
  const rendererRef = useRef(null);
  const pointersRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const dpr = Math.max(1, 0.5 * window.devicePixelRatio);

    rendererRef.current = new WebGLRenderer(canvas, dpr);
    if (!rendererRef.current.gl) return; // WebGL2 not supported

    pointersRef.current = new PointerHandler(canvas, dpr);

    rendererRef.current.setup();
    rendererRef.current.init();

    const resize = () => {
      if (!canvasRef.current) return;
      const d = Math.max(1, 0.5 * window.devicePixelRatio);
      canvas.width = window.innerWidth * d;
      canvas.height = window.innerHeight * d;
      if (rendererRef.current) rendererRef.current.updateScale(d);
    };
    resize();

    if (rendererRef.current.test(defaultShaderSource) === null) {
      rendererRef.current.updateShader(defaultShaderSource);
    }

    const loop = (now) => {
      if (!rendererRef.current || !pointersRef.current) return;
      rendererRef.current.updateMouse(pointersRef.current.first);
      rendererRef.current.updatePointerCount(pointersRef.current.count);
      rendererRef.current.updatePointerCoords(pointersRef.current.coords);
      rendererRef.current.updateMove(pointersRef.current.move);
      rendererRef.current.render(now);
      animationFrameRef.current = requestAnimationFrame(loop);
    };
    loop(0);

    window.addEventListener('resize', resize);

    return () => {
      window.removeEventListener('resize', resize);
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      if (rendererRef.current) rendererRef.current.reset();
    };
  }, []);

  return canvasRef;
}

// ── The GLSL Shader — clouds + shooting stars (by Matthias Hurrle @atzedent) ─

const defaultShaderSource = `#version 300 es
/*********
* made by Matthias Hurrle (@atzedent)
* mouse interactivity added
*/
precision highp float;
out vec4 O;
uniform vec2 resolution;
uniform float time;
uniform vec2 touch;
uniform int pointerCount;
#define FC gl_FragCoord.xy
#define T time
#define R resolution
#define MN min(R.x,R.y)

float rnd(vec2 p) {
  p=fract(p*vec2(12.9898,78.233));
  p+=dot(p,p+34.56);
  return fract(p.x*p.y);
}

float noise(in vec2 p) {
  vec2 i=floor(p), f=fract(p), u=f*f*(3.-2.*f);
  float
  a=rnd(i),
  b=rnd(i+vec2(1,0)),
  c=rnd(i+vec2(0,1)),
  d=rnd(i+1.);
  return mix(mix(a,b,u.x),mix(c,d,u.x),u.y);
}

float fbm(vec2 p) {
  float t=.0, a=1.; mat2 m=mat2(1.,-.5,.2,1.2);
  for (int i=0; i<5; i++) {
    t+=a*noise(p);
    p*=2.*m;
    a*=.5;
  }
  return t;
}

float clouds(vec2 p) {
  float d=1., t=.0;
  for (float i=.0; i<3.; i++) {
    float a=d*fbm(i*10.+p.x*.2+.2*(1.+i)*p.y+d+i*i+p);
    t=mix(t,d,a);
    d=a;
    p*=2./(i+1.);
  }
  return t;
}

void main(void) {
  vec2 uv=(FC-.5*R)/MN,st=uv*vec2(2,1);

  /* ── cursor: gravitational lens distortion ── */
  vec2 mouse = (touch - .5*R) / MN;
  float hasPointer = pointerCount > 0 ? 1.0 : 0.0;
  vec2 toMouse = uv - mouse;
  float dist = length(toMouse);
  /* bend space around cursor like a gravity lens */
  float lensRadius = 0.35;
  float lensPower = 0.12;
  float lens = hasPointer * lensPower * smoothstep(lensRadius, 0.0, dist);
  uv += toMouse * lens;

  vec3 col=vec3(0);
  float bg=clouds(vec2(st.x+T*.5,-st.y));
  uv*=1.-.3*(sin(T*.2)*.5+.5);

  for (float i=1.; i<12.; i++) {
    uv+=.1*cos(i*vec2(.1+.01*i, .8)+i*i+T*.5+.1*uv.x);
    vec2 p=uv;
    float d=length(p);
    col+=.00125/d*(cos(sin(i)*vec3(3,1,3))+1.);
    float b=noise(i+p+bg*1.731);
    col+=.002*b/length(max(p,vec2(b*p.x*.02,p.y)));
    col=mix(col,vec3(bg*.18,bg*.03,bg*.20),d);
  }

  /* soft cursor aura glow */
  float glow = hasPointer * 0.008 / (dist * dist + 0.015);
  col += glow * vec3(0.5, 0.1, 0.45);

  O=vec4(col,1);
}`;

// ── Hero Component ──────────────────────────────────────────────────────────

export default function Hero({
  trustBadge,
  headline,
  subtitle,
  buttons,
  className = ""
}) {
  const canvasRef = useShaderBackground();

  return (
    <div className={`relative w-full min-h-screen overflow-hidden bg-black ${className}`}>

      {/* CSS Animations */}
      <style>{`
        @keyframes hero-fade-in-down {
          from { opacity: 0; transform: translateY(-20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes hero-fade-in-up {
          from { opacity: 0; transform: translateY(30px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .hero-fade-down { animation: hero-fade-in-down 0.8s ease-out forwards; }
        .hero-fade-up   { animation: hero-fade-in-up 0.8s ease-out forwards; opacity: 0; }
        .hero-delay-200 { animation-delay: 0.2s; }
        .hero-delay-400 { animation-delay: 0.4s; }
        .hero-delay-600 { animation-delay: 0.6s; }
        .hero-delay-800 { animation-delay: 0.8s; }
      `}</style>

      {/* WebGL2 Shader Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ background: 'black' }}
      />

      {/* Content Overlay */}
      {/* Content Overlay */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-4 md:px-8 pointer-events-none" style={{ textShadow: '0 4px 30px rgba(0,0,0,0.8)' }}>
        
        {/* Top Headline: HKBK College (grouped above) */}
        {headline?.line1 && (
          <div className="hero-fade-down hero-delay-200 mb-3 sm:mb-4 mt-[-2vh] md:mt-[-5vh]">
            <h1
              className="font-headline text-lg sm:text-xl md:text-2xl lg:text-3xl font-extrabold tracking-widest text-center uppercase"
              style={{
                background: 'linear-gradient(135deg, #ff7cf5, #ff51fa, #c1fffe)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              {headline.line1}
            </h1>
          </div>
        )}

        {/* Main Hackathon Title */}
        {headline?.line2 && (
          <div className="mb-6 sm:mb-8 w-full max-w-full">
            <h2
              className="font-headline text-[2.75rem] leading-[1.1] sm:text-6xl md:text-7xl lg:text-8xl xl:text-[6.5rem] font-black tracking-tighter hero-fade-up hero-delay-400 text-center"
              style={{
                background: 'linear-gradient(135deg, #c1fffe, #00fd00, #ff7cf5)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                filter: 'drop-shadow(0px 4px 24px rgba(0,253,0,0.2))'
              }}
            >
              {headline.line2}
            </h2>
          </div>
        )}

        {/* Bottom Subtitle */}
        {subtitle && (
          <div className="max-w-[90%] sm:max-w-3xl hero-fade-up hero-delay-600">
            <div className="text-center">
              <p 
                className="text-sm sm:text-base md:text-lg lg:text-xl font-semibold tracking-wider uppercase leading-relaxed" 
                style={{ color: 'rgba(255, 200, 250, 0.9)', textShadow: '0 2px 10px rgba(255, 124, 245, 0.5)' }}
              >
                {subtitle}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
