import { useEffect, useRef } from "react";

// Modern, smooth, bubbly animated background for dark themes
export default function BubblyBackground({ opacity = 0.18, prominent = false, minimal = false, threeCentral = false }: { opacity?: number; prominent?: boolean; minimal?: boolean; threeCentral?: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    let BUBBLES = prominent ? 36 : 18;
    let minR = prominent ? 48 : 24;
    let maxR = prominent ? 96 : 56;
    let speed = prominent ? 0.7 : 0.4;
    if (minimal) {
      BUBBLES = 8;
      minR = 14;
      maxR = 28;
      speed = 0.25;
    }
    if (threeCentral) {
      BUBBLES = 3;
      minR = 60;
      maxR = 110;
      speed = 0.13;
    }
    const bubbles: { x: number; y: number; r: number; vx: number; vy: number; alpha: number }[] = [];
    if (threeCentral) {
      // Place 3 bubbles in a triangle around center
      const centerX = width / 2;
      const centerY = height / 2;
      const angleStep = (2 * Math.PI) / 3;
      for (let i = 0; i < 3; i++) {
        const angle = i * angleStep;
        const r = minR + Math.random() * (maxR - minR);
        const radius = 120;
        bubbles.push({
          x: centerX + Math.cos(angle) * radius,
          y: centerY + Math.sin(angle) * radius,
          r,
          vx: Math.cos(angle + Math.PI / 2) * speed,
          vy: Math.sin(angle + Math.PI / 2) * speed,
          alpha: opacity * (0.7 + Math.random() * 0.6),
        });
      }
    } else {
      for (let i = 0; i < BUBBLES; i++) {
        const r = minR + Math.random() * (maxR - minR);
        bubbles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          r,
          vx: (Math.random() - 0.5) * speed,
          vy: (Math.random() - 0.5) * speed,
          alpha: opacity * (0.7 + Math.random() * 0.6),
        });
      }
    }

    let running = true;
    function draw() {
      if (!running || !ctx) return;
      ctx.clearRect(0, 0, width, height);
      for (const b of bubbles) {
        b.x += b.vx;
        b.y += b.vy;
        if (b.x < -b.r) b.x = width + b.r;
        if (b.x > width + b.r) b.x = -b.r;
        if (b.y < -b.r) b.y = height + b.r;
        if (b.y > height + b.r) b.y = -b.r;
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.r, 0, 2 * Math.PI);
        ctx.fillStyle = `rgba(123,34,51,${b.alpha})`;
        ctx.shadowColor = prominent ? "#7b2233" : "#2a0a13";
        ctx.shadowBlur = prominent ? 32 : 12;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
      requestAnimationFrame(draw);
    }
    draw();

    function handleResize() {
      width = window.innerWidth;
      height = window.innerHeight;
      if (canvas) {
        canvas.width = width;
        canvas.height = height;
      }
    }
    window.addEventListener("resize", handleResize);
    return () => {
      running = false;
      window.removeEventListener("resize", handleResize);
    };
  }, [opacity, prominent]);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: "fixed", inset: 0, width: "100vw", height: "100vh", zIndex: 0, pointerEvents: "none" }}
      aria-hidden="true"
    />
  );
}
