import { useEffect, useRef } from "react";

export default function WebGLWave() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    if (!gl) return;

    const vertSrc = `
      attribute vec2 a_position;
      void main() {
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `;

    const fragSrc = `
      precision highp float;
      uniform vec2 u_resolution;
      uniform float u_time;
      uniform vec2 u_mouse;  // normalized mouse in [-1, 1]

      void main() {
        vec2 p = (gl_FragCoord.xy * 2.0 - u_resolution) / min(u_resolution.x, u_resolution.y);

        // Mouse influence: shifts the wave center based on cursor position
        float mouseInfluenceX = u_mouse.x * 0.6;
        float mouseInfluenceY = u_mouse.y * 0.25;

        float d  = length(p) * 0.05;
        float rx = p.x * (1.0 + d) + mouseInfluenceX * 0.3;
        float gx = p.x + mouseInfluenceX * 0.15;
        float bx = p.x * (1.0 - d) - mouseInfluenceX * 0.3;

        // Cursor Y shifts the wave vertically
        float yShift = mouseInfluenceY;

        float w1 = 0.03 / (abs(p.y + yShift + sin((rx + u_time) * 1.0) * 0.5) + 0.02);
        float w2 = 0.03 / (abs(p.y + yShift + sin((gx + u_time) * 1.0) * 0.5) + 0.02);
        float w3 = 0.03 / (abs(p.y + yShift + sin((bx + u_time) * 1.0) * 0.5) + 0.02);

        vec3 col = vec3(1.0, 0.48, 0.96) * w1
                 + vec3(0.0, 0.99, 0.0)  * w2
                 + vec3(0.75, 1.0, 0.99) * w3;

        gl_FragColor = vec4(col, 1.0);
      }
    `;

    function createShader(type, src) {
      const s = gl.createShader(type);
      gl.shaderSource(s, src);
      gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
        console.error("Shader error:", gl.getShaderInfoLog(s));
        return null;
      }
      return s;
    }

    const vert = createShader(gl.VERTEX_SHADER, vertSrc);
    const frag = createShader(gl.FRAGMENT_SHADER, fragSrc);
    if (!vert || !frag) return;

    const program = gl.createProgram();
    gl.attachShader(program, vert);
    gl.attachShader(program, frag);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error("Program link error:", gl.getProgramInfoLog(program));
      return;
    }
    gl.useProgram(program);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1,-1, 1,-1, -1,1, 1,-1, 1,1, -1,1]),
      gl.STATIC_DRAW
    );

    const posLoc  = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

    const resLoc   = gl.getUniformLocation(program, "u_resolution");
    const timeLoc  = gl.getUniformLocation(program, "u_time");
    const mouseLoc = gl.getUniformLocation(program, "u_mouse");

    // Smooth mouse state with lerp
    let targetMouseX = 0, targetMouseY = 0;
    let smoothMouseX = 0, smoothMouseY = 0;

    function onMouseMove(e) {
      const rect = canvas.getBoundingClientRect();
      // Normalize to [-1, 1]
      targetMouseX = ((e.clientX - rect.left) / rect.width)  * 2 - 1;
      targetMouseY = ((e.clientY - rect.top)  / rect.height) * 2 - 1;
      targetMouseY = -targetMouseY; // flip Y (WebGL origin is bottom-left)
    }

    function resize() {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(resLoc, canvas.width, canvas.height);
    }
    resize();

    let raf;
    let t = 0;
    const LERP = 0.05; // smoothing factor — lower = more inertia

    function loop() {
      t += 0.01;

      // Smooth (lerp) the mouse position each frame for fluid feel
      smoothMouseX += (targetMouseX - smoothMouseX) * LERP;
      smoothMouseY += (targetMouseY - smoothMouseY) * LERP;

      gl.uniform1f(timeLoc, t);
      gl.uniform2f(mouseLoc, smoothMouseX, smoothMouseY);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      raf = requestAnimationFrame(loop);
    }
    loop();

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", resize);
      gl.deleteProgram(program);
      gl.deleteBuffer(buf);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", display: "block", zIndex: 0 }}
    />
  );
}
