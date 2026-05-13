'use client';

import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
  life: number;
  maxLife: number;
}

// Floating particles with connection lines effect
export function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const colors = ['#00d4ff', '#7c3aed', '#ff0099', '#00ff88'];
    const particles: Particle[] = [];
    const maxParticles = 60;

    // Create initial particles
    const createParticle = (): Particle => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      size: Math.random() * 2 + 1,
      color: colors[Math.floor(Math.random() * colors.length)],
      alpha: Math.random() * 0.5 + 0.2,
      life: 0,
      maxLife: Math.random() * 500 + 200,
    });

    for (let i = 0; i < maxParticles; i++) {
      particles.push(createParticle());
    }

    let animFrameId: number;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life++;

        // Wrap around edges
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        // Fade in/out based on life
        const lifeRatio = p.life / p.maxLife;
        const fadeAlpha =
          lifeRatio < 0.1
            ? lifeRatio * 10
            : lifeRatio > 0.9
            ? (1 - lifeRatio) * 10
            : 1;

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle =
          p.color + Math.floor(p.alpha * fadeAlpha * 255).toString(16).padStart(2, '0');
        ctx.fill();

        // Draw connections between nearby particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxDist = 120;

          if (dist < maxDist) {
            const lineAlpha = (1 - dist / maxDist) * 0.15 * fadeAlpha;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(0, 212, 255, ${lineAlpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }

        // Respawn particle
        if (p.life >= p.maxLife) {
          particles[i] = createParticle();
        }
      }

      animFrameId = requestAnimationFrame(draw);
    };

    const timeout = setTimeout(() => {
      animFrameId = requestAnimationFrame(draw);
    }, 300);

    return () => {
      clearTimeout(timeout);
      cancelAnimationFrame(animFrameId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        opacity: 0.6,
        zIndex: 0,
      }}
      aria-hidden="true"
    />
  );
}
