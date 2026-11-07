import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  opacity: number;
  rotation: number;
  rotationSpeed: number;
  type: 'petal' | 'gold';
}

export const FloatingBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    const particleCount = window.innerWidth < 768 ? 28 : 50;
    const particles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 8 + 6,
        speedY: Math.random() * 0.8 + 0.3,
        speedX: (Math.random() - 0.5) * 0.5,
        opacity: Math.random() * 0.6 + 0.2,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 1.5,
        type: Math.random() > 0.4 ? 'petal' : 'gold',
      });
    }

    const drawPetal = (x: number, y: number, size: number, rotation: number, opacity: number) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate((rotation * Math.PI) / 180);
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(-size / 2, -size / 2, -size, size / 3, 0, size);
      ctx.bezierCurveTo(size, size / 3, size / 2, -size / 2, 0, 0);
      
      const grad = ctx.createLinearGradient(-size, 0, size, size);
      grad.addColorStop(0, `rgba(244, 63, 94, ${opacity})`);
      grad.addColorStop(1, `rgba(159, 18, 57, ${opacity * 0.7})`);
      ctx.fillStyle = grad;
      ctx.shadowBlur = 10;
      ctx.shadowColor = `rgba(225, 29, 72, ${opacity * 0.5})`;
      ctx.fill();
      ctx.restore();
    };

    const drawGold = (x: number, y: number, size: number, opacity: number) => {
      ctx.save();
      ctx.beginPath();
      ctx.arc(x, y, size * 0.35, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(251, 191, 36, ${opacity})`;
      ctx.shadowBlur = 12;
      ctx.shadowColor = `rgba(245, 158, 11, ${opacity * 0.8})`;
      ctx.fill();
      ctx.restore();
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.y += p.speedY;
        p.x += Math.sin(p.y * 0.01) * 0.5 + p.speedX;
        p.rotation += p.rotationSpeed;

        if (p.y > height + 20) {
          p.y = -20;
          p.x = Math.random() * width;
        }
        if (p.x > width + 20) p.x = -20;
        if (p.x < -20) p.x = width + 20;

        if (p.type === 'petal') {
          drawPetal(p.x, p.y, p.size, p.rotation, p.opacity);
        } else {
          drawGold(p.x, p.y, p.size, p.opacity);
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0 h-full w-full"
    />
  );
};

