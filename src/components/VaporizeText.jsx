import { useRef, useEffect, useState, createElement, useMemo, useCallback, memo } from "react";

// ── HELPERS ────────────────────────────────────────────────────────────────

function transformValue(input, inputRange, outputRange, clamp = false) {
  const [inputMin, inputMax] = inputRange;
  const [outputMin, outputMax] = outputRange;
  const progress = (input - inputMin) / (inputMax - inputMin);
  let result = outputMin + progress * (outputMax - outputMin);
  if (clamp) {
    result = outputMax > outputMin
      ? Math.min(Math.max(result, outputMin), outputMax)
      : Math.min(Math.max(result, outputMax), outputMin);
  }
  return result;
}

function parseColor(color) {
  const rgbaMatch = color.match(/rgba\((\d+),\s*(\d+),\s*(\d+),\s*([\d.]+)\)/);
  const rgbMatch  = color.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
  if (rgbaMatch) return `rgba(${rgbaMatch[1]}, ${rgbaMatch[2]}, ${rgbaMatch[3]}, ${rgbaMatch[4]})`;
  if (rgbMatch)  return `rgba(${rgbMatch[1]}, ${rgbMatch[2]}, ${rgbMatch[3]}, 1)`;
  return "rgba(255,255,255,1)";
}

function calculateVaporizeSpread(fontSize) {
  const points = [{ size: 20, spread: 0.2 }, { size: 50, spread: 0.5 }, { size: 100, spread: 1.5 }];
  if (fontSize <= points[0].size) return points[0].spread;
  if (fontSize >= points[points.length - 1].size) return points[points.length - 1].spread;
  let i = 0;
  while (i < points.length - 1 && points[i + 1].size < fontSize) i++;
  return points[i].spread + (fontSize - points[i].size) * (points[i + 1].spread - points[i].spread) / (points[i + 1].size - points[i].size);
}

function useIsInView(ref) {
  const [isInView, setIsInView] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(([e]) => setIsInView(e.isIntersecting), { threshold: 0, rootMargin: '50px' });
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref]);
  return isInView;
}

// ── PARTICLE SYSTEM ────────────────────────────────────────────────────────

function createParticles(ctx, canvas, text, textX, textY, font, color, alignment) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = color;
  ctx.font = font;
  ctx.textAlign = alignment;
  ctx.textBaseline = "middle";
  ctx.imageSmoothingEnabled = true;

  const metrics = ctx.measureText(text);
  const textWidth = metrics.width;
  let textLeft = alignment === "center" ? textX - textWidth / 2 : alignment === "left" ? textX : textX - textWidth;
  const textBoundaries = { left: textLeft, right: textLeft + textWidth, width: textWidth };

  ctx.fillText(text, textX, textY);
  const { data } = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const dpr = canvas.width / parseInt(canvas.style.width || canvas.width);
  const sampleRate = Math.max(1, Math.round(dpr / 3));
  const particles = [];

  for (let y = 0; y < canvas.height; y += sampleRate) {
    for (let x = 0; x < canvas.width; x += sampleRate) {
      const idx = (y * canvas.width + x) * 4;
      const alpha = data[idx + 3];
      if (alpha > 0) {
        const a = alpha / 255 * (sampleRate / dpr);
        particles.push({ x, y, originalX: x, originalY: y, color: `rgba(${data[idx]},${data[idx+1]},${data[idx+2]},${a})`, opacity: a, originalAlpha: a, velocityX: 0, velocityY: 0, angle: 0, speed: 0, shouldFadeQuickly: false });
      }
    }
  }
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  return { particles, textBoundaries };
}

function updateParticles(particles, vaporizeX, deltaTime, spread, duration, direction, density) {
  let allDone = true;
  for (const p of particles) {
    const reached = direction === "left-to-right" ? p.originalX <= vaporizeX : p.originalX >= vaporizeX;
    if (reached) {
      if (p.speed === 0) {
        p.angle = Math.random() * Math.PI * 2;
        p.speed = (Math.random() + 0.5) * spread;
        p.velocityX = Math.cos(p.angle) * p.speed;
        p.velocityY = Math.sin(p.angle) * p.speed;
        p.shouldFadeQuickly = Math.random() > density;
      }
      if (p.shouldFadeQuickly) {
        p.opacity = Math.max(0, p.opacity - deltaTime);
      } else {
        const dx = p.originalX - p.x, dy = p.originalY - p.y;
        const dist = Math.sqrt(dx*dx + dy*dy);
        const damp = Math.max(0.95, 1 - dist / (100 * spread));
        const rand = spread * 3;
        p.velocityX = (p.velocityX + (Math.random()-.5)*rand + dx*.002) * damp;
        p.velocityY = (p.velocityY + (Math.random()-.5)*rand + dy*.002) * damp;
        const maxV = spread * 2;
        const vel = Math.sqrt(p.velocityX**2 + p.velocityY**2);
        if (vel > maxV) { p.velocityX *= maxV/vel; p.velocityY *= maxV/vel; }
        p.x += p.velocityX * deltaTime * 20;
        p.y += p.velocityY * deltaTime * 10;
        p.opacity = Math.max(0, p.opacity - deltaTime * 0.25 * (2000 / duration));
      }
      if (p.opacity > 0.01) allDone = false;
    } else { allDone = false; }
  }
  return allDone;
}

function renderParticles(ctx, particles, dpr) {
  ctx.save();
  ctx.scale(dpr, dpr);
  for (const p of particles) {
    if (p.opacity > 0) {
      ctx.fillStyle = p.color.replace(/[\d.]+\)$/, `${p.opacity})`);
      ctx.fillRect(p.x / dpr, p.y / dpr, 1, 1);
    }
  }
  ctx.restore();
}

function resetParticles(particles) {
  for (const p of particles) {
    p.x = p.originalX; p.y = p.originalY;
    p.opacity = p.originalAlpha;
    p.speed = 0; p.velocityX = 0; p.velocityY = 0;
  }
}

// ── CANVAS RENDER ──────────────────────────────────────────────────────────

function renderCanvas({ texts, font, color, alignment, canvasRef, wrapperSize, particlesRef, globalDpr, currentTextIndex, density }) {
  const canvas = canvasRef.current;
  if (!canvas || !wrapperSize.width || !wrapperSize.height) return;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  const { width, height } = wrapperSize;
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
  canvas.width  = Math.floor(width  * globalDpr);
  canvas.height = Math.floor(height * globalDpr);
  const fontSize = parseInt(font.fontSize?.replace("px","") || "50");
  const fontStr = `${font.fontWeight ?? 400} ${fontSize * globalDpr}px ${font.fontFamily ?? "sans-serif"}`;
  const parsedColor = parseColor(color ?? "rgb(255,255,255)");
  const textX = alignment === "center" ? canvas.width / 2 : alignment === "left" ? 0 : canvas.width;
  const textY = canvas.height / 2;
  const currentText = texts[currentTextIndex] || texts[0];
  const { particles, textBoundaries } = createParticles(ctx, canvas, currentText, textX, textY, fontStr, parsedColor, alignment);
  particlesRef.current = particles;
  canvas.textBoundaries = textBoundaries;
}

// ── SEO ELEMENT ────────────────────────────────────────────────────────────

const SeoElement = memo(({ tag = "p", texts }) =>
  createElement(tag, {
    style: { position: "absolute", width: 0, height: 0, overflow: "hidden", userSelect: "none", pointerEvents: "none" }
  }, texts?.join(" ") ?? "")
);

// ── MAIN COMPONENT ─────────────────────────────────────────────────────────

export default function VaporizeText({
  texts = ["AI IGNITE", "HACKATHON"],
  font = { fontFamily: "Space Grotesk, sans-serif", fontSize: "50px", fontWeight: 700 },
  color = "rgb(255, 124, 245)",
  spread = 5,
  density = 5,
  animation = { vaporizeDuration: 2, fadeInDuration: 1, waitDuration: 0.5 },
  direction = "left-to-right",
  alignment = "center",
  tag = "h2",
}) {
  const canvasRef   = useRef(null);
  const wrapperRef  = useRef(null);
  const particlesRef = useRef([]);
  const vaporizeProgressRef = useRef(0);
  const fadeOpacityRef = useRef(0);
  const isInView = useIsInView(wrapperRef);

  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [animationState, setAnimationState] = useState("static");
  const [wrapperSize, setWrapperSize] = useState({ width: 0, height: 0 });

  const globalDpr = useMemo(() => (typeof window !== "undefined" ? window.devicePixelRatio * 1.5 : 1), []);
  const transformedDensity = useMemo(() => transformValue(density, [0,10], [0.3,1], true), [density]);

  const VAPORIZE_DURATION = (animation.vaporizeDuration ?? 2) * 1000;
  const FADE_IN_DURATION  = (animation.fadeInDuration ?? 1) * 1000;
  const WAIT_DURATION     = (animation.waitDuration ?? 0.5) * 1000;

  const fontSize = parseInt(font.fontSize?.replace("px","") || "50");
  const VAPORIZE_SPREAD = calculateVaporizeSpread(fontSize) * spread;

  // Start animation when in view
  useEffect(() => {
    if (isInView) {
      const t = setTimeout(() => setAnimationState("vaporizing"), 800);
      return () => clearTimeout(t);
    } else {
      setAnimationState("static");
    }
  }, [isInView]);

  // Animation loop
  useEffect(() => {
    if (!isInView) return;
    let lastTime = performance.now(), raf;

    const animate = (now) => {
      const dt = (now - lastTime) / 1000;
      lastTime = now;
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");
      if (!canvas || !ctx || !particlesRef.current.length) { raf = requestAnimationFrame(animate); return; }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (animationState === "static" || animationState === "waiting") {
        renderParticles(ctx, particlesRef.current, globalDpr);
      } else if (animationState === "vaporizing") {
        vaporizeProgressRef.current += dt * 100 / (VAPORIZE_DURATION / 1000);
        const bounds = canvas.textBoundaries;
        if (bounds) {
          const progress = Math.min(100, vaporizeProgressRef.current);
          const vx = direction === "left-to-right"
            ? bounds.left + bounds.width * progress / 100
            : bounds.right - bounds.width * progress / 100;
          const done = updateParticles(particlesRef.current, vx, dt, VAPORIZE_SPREAD, VAPORIZE_DURATION, direction, transformedDensity);
          renderParticles(ctx, particlesRef.current, globalDpr);
          if (vaporizeProgressRef.current >= 100 && done) {
            setCurrentTextIndex(i => (i + 1) % texts.length);
            setAnimationState("fadingIn");
            fadeOpacityRef.current = 0;
          }
        }
      } else if (animationState === "fadingIn") {
        fadeOpacityRef.current += dt * 1000 / FADE_IN_DURATION;
        ctx.save(); ctx.scale(globalDpr, globalDpr);
        particlesRef.current.forEach(p => {
          p.x = p.originalX; p.y = p.originalY;
          const a = Math.min(fadeOpacityRef.current, 1) * p.originalAlpha;
          ctx.fillStyle = p.color.replace(/[\d.]+\)$/, `${a})`);
          ctx.fillRect(p.x / globalDpr, p.y / globalDpr, 1, 1);
        });
        ctx.restore();
        if (fadeOpacityRef.current >= 1) {
          setAnimationState("waiting");
          setTimeout(() => {
            setAnimationState("vaporizing");
            vaporizeProgressRef.current = 0;
            resetParticles(particlesRef.current);
          }, WAIT_DURATION);
        }
      }
      raf = requestAnimationFrame(animate);
    };

    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [animationState, isInView, texts.length, direction, globalDpr, VAPORIZE_SPREAD, VAPORIZE_DURATION, FADE_IN_DURATION, WAIT_DURATION, transformedDensity]);

  // Re-render canvas when text index changes or size changes
  useEffect(() => {
    renderCanvas({ texts, font, color, alignment, canvasRef, wrapperSize, particlesRef, globalDpr, currentTextIndex, density: transformedDensity });
  }, [texts, font, color, alignment, wrapperSize, currentTextIndex, globalDpr, transformedDensity]);

  // Resize observer
  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    const ro = new ResizeObserver(entries => {
      const { width, height } = entries[0].contentRect;
      setWrapperSize({ width, height });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Initial size
  useEffect(() => {
    if (wrapperRef.current) {
      const { width, height } = wrapperRef.current.getBoundingClientRect();
      setWrapperSize({ width, height });
    }
  }, []);

  return (
    <div ref={wrapperRef} style={{ width: "100%", height: "100%", pointerEvents: "none" }}>
      <canvas ref={canvasRef} style={{ minWidth: "30px", minHeight: "20px", pointerEvents: "none" }} />
      <SeoElement tag={tag} texts={texts} />
    </div>
  );
}
