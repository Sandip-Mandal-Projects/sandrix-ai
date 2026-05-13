'use client';

import { useEffect, useRef } from 'react';

// Matrix-style falling characters background effect
export function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Resize canvas to full window
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Cybersecurity-themed characters
    const chars =
      'アイウエオカキクケコサシスセソタチツテトナニヌネノABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*(){}[]<>/\\|;:\'".?!`~';
    const charArray = chars.split('');
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops: number[] = Array(columns).fill(1);

    let animFrameId: number;

    const draw = () => {
      // Semi-transparent background for trail effect
      ctx.fillStyle = 'rgba(5, 8, 16, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Random character color - mix of blue and green
      const colorRand = Math.random();
      if (colorRand > 0.98) {
        ctx.fillStyle = '#ffffff'; // Occasional white bright char
      } else if (colorRand > 0.7) {
        ctx.fillStyle = '#00d4ff'; // Cyber blue
      } else {
        ctx.fillStyle = '#00ff88'; // Cyber green
      }

      ctx.font = `${fontSize}px 'JetBrains Mono', monospace`;

      for (let i = 0; i < drops.length; i++) {
        // Random character
        const char = charArray[Math.floor(Math.random() * charArray.length)];
        ctx.fillText(char, i * fontSize, drops[i] * fontSize);

        // Reset drop randomly after it passes screen height
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }

      animFrameId = requestAnimationFrame(draw);
    };

    // Start with a delay to not block initial render
    const timeout = setTimeout(() => {
      animFrameId = requestAnimationFrame(draw);
    }, 500);

    return () => {
      clearTimeout(timeout);
      cancelAnimationFrame(animFrameId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="matrix-canvas"
      aria-hidden="true"
    />
  );
}
