import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PARTICLE_COUNT = 15;

export default function ScratchCard({ children, onReveal, isLocked }) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [isScratching, setIsScratching] = useState(false);
  const [particles, setParticles] = useState([]);
  const requestRef = useRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const container = containerRef.current;

    const resize = () => {
      canvas.width = container.offsetWidth;
      canvas.height = container.offsetHeight;
      drawCover(ctx, canvas.width, canvas.height);
    };

    const drawCover = (context, w, h) => {
      // Background cover
      context.fillStyle = '#111111';
      context.fillRect(0, 0, w, h);

      // Add futuristic pattern
      context.strokeStyle = '#222222';
      context.lineWidth = 1;
      for (let i = 0; i < w; i += 40) {
        context.beginPath();
        context.moveTo(i, 0);
        context.lineTo(i, h);
        context.stroke();
      }
      for (let i = 0; i < h; i += 40) {
        context.beginPath();
        context.moveTo(0, i);
        context.lineTo(w, i);
        context.stroke();
      }

      // Add some "neural" glowing nodes
      context.fillStyle = '#ff7cf5';
      for (let i = 0; i < 15; i++) {
        const x = Math.random() * w;
        const y = Math.random() * h;
        context.globalAlpha = 0.1;
        context.beginPath();
        context.arc(x, y, 2, 0, Math.PI * 2);
        context.fill();
        context.globalAlpha = 1.0;
      }
    };

    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);

  const createParticles = (x, y) => {
    const newParticles = Array.from({ length: PARTICLE_COUNT }).map(() => ({
      id: Math.random(),
      x,
      y,
      vx: (Math.random() - 0.5) * 10,
      vy: (Math.random() - 0.5) * 10,
      size: Math.random() * 3 + 1,
      life: 1.0,
    }));
    setParticles((prev) => [...prev, ...newParticles].slice(-50));
  };

  const handleScratch = (e) => {
    if (isRevealed || isLocked) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    
    const x = (e.clientX || e.touches[0].clientX) - rect.left;
    const y = (e.clientY || e.touches[0].clientY) - rect.top;

    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 35, 0, Math.PI * 2);
    ctx.fill();

    createParticles(x, y);
    checkReveal();
  };

  const checkReveal = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageData.data;
    let transparentPixels = 0;

    for (let i = 3; i < pixels.length; i += 4) {
      if (pixels[i] === 0) transparentPixels++;
    }

    const percentage = (transparentPixels / (pixels.length / 4)) * 100;
    if (percentage > 50) {
      setIsRevealed(true);
      if (onReveal) onReveal();
    }
  };

  // Particle animation loop
  useEffect(() => {
    const animate = () => {
      setParticles((prev) => 
        prev
          .map((p) => ({
            ...p,
            x: p.x + p.vx,
            y: p.y + p.vy,
            life: p.life - 0.05,
          }))
          .filter((p) => p.life > 0)
      );
      requestRef.current = requestAnimationFrame(animate);
    };
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-full min-h-[400px] flex items-center justify-center rounded-[2rem] overflow-hidden bg-black/40 border border-white/5">
      {/* Target Content (Underneath) */}
      <div className={`w-full h-full flex flex-col items-center justify-center p-8 transition-opacity duration-1000 ${isRevealed ? 'opacity-100' : 'opacity-20'}`}>
        {children}
      </div>

      {/* Scratch Layer */}
      <AnimatePresence>
        {!isRevealed && (
          <motion.canvas
            ref={canvasRef}
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1, filter: 'blur(20px)' }}
            transition={{ duration: 0.8 }}
            className={`absolute inset-0 z-20 touch-none ${isLocked ? 'cursor-not-allowed opacity-30 grayscale' : 'cursor-crosshair'}`}
            onMouseMove={(e) => isScratching && handleScratch(e)}
            onMouseDown={() => setIsScratching(true)}
            onMouseUp={() => setIsScratching(false)}
            onMouseLeave={() => setIsScratching(false)}
            onTouchMove={(e) => handleScratch(e)}
            onTouchStart={() => setIsScratching(true)}
            onTouchEnd={() => setIsScratching(false)}
          />
        )}
      </AnimatePresence>

      {/* Guide Text */}
      {!isRevealed && (
        <div className="absolute inset-0 z-30 flex flex-col items-center justify-center pointer-events-none">
          <motion.div
            animate={{ opacity: [0.7, 1, 0.7], scale: [1, 1.02, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center"
          >
            <span className="font-label text-xs tracking-[0.5em] text-primary uppercase mb-2">
              {isLocked ? 'SYSTEM_LOCKED' : 'SYSTEM_READY'}
            </span>
            <span className="font-headline text-xl md:text-2xl text-primary uppercase font-black px-4 text-center drop-shadow-[0_0_20px_rgba(255,124,245,0.85)]">
              {isLocked ? `REVEALING AT 3:30 PM` : 'SCRATCH THE CARD TO SEE THE THEME'}
            </span>
          </motion.div>
        </div>
      )}

      {/* Alive Particles */}
      <div className="absolute inset-0 pointer-events-none z-40">
        {particles.map((p) => (
          <div
            key={p.id}
            className="absolute bg-primary rounded-full shadow-[0_0_10px_#ff7cf5]"
            style={{
              left: p.x,
              top: p.y,
              width: p.size,
              height: p.size,
              opacity: p.life,
              transform: `scale(${p.life})`,
            }}
          />
        ))}
      </div>
      
      {/* Scratch Pulse Glow */}
      {isScratching && (
        <div className="absolute inset-0 bg-primary/5 animate-pulse pointer-events-none z-25"></div>
      )}
    </div>
  );
}
