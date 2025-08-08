"use client";
import { useEffect, useRef } from "react";

const bubbleColors = [
  '#FFFDE7', // cream
  '#7b2233', // dark maroonish red
];

export default function CuteBubblesBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
  const canvas = canvasRef.current;
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  let width = window.innerWidth;
  let height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;

    let bubbles = Array.from({ length: 18 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: 32 + Math.random() * 32,
      color: bubbleColors[Math.floor(Math.random() * bubbleColors.length)],
      speed: 0.2 + Math.random() * 0.3,
      dx: (Math.random() - 0.5) * 0.2,
    }));

    function draw() {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);
      for (let b of bubbles) {
        ctx.globalAlpha = 0.35;
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.r, 0, 2 * Math.PI);
        ctx.fillStyle = b.color;
        ctx.shadowColor = b.color;
        ctx.shadowBlur = 16;
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1;
      }
    }

    function animate() {
      for (let b of bubbles) {
        b.y -= b.speed;
        b.x += b.dx;
        if (b.y + b.r < 0) {
          b.y = height + b.r;
          b.x = Math.random() * width;
        }
        if (b.x < -b.r) b.x = width + b.r;
        if (b.x > width + b.r) b.x = -b.r;
      }
      draw();
      requestAnimationFrame(animate);
    }
    animate();

    function handleResize() {
      width = window.innerWidth;
      height = window.innerHeight;
      if (canvasRef.current) {
        canvasRef.current.width = width;
        canvasRef.current.height = height;
      }
    }
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full -z-20 pointer-events-none"
      style={{ position: 'fixed', top: 0, left: 0 }}
    />
  );
}
