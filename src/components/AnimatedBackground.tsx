"use client";
import { useEffect, useRef } from "react";

export default function AnimatedBackground() {
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

    let mouse = { x: width / 2, y: height / 2 };
    window.addEventListener("mousemove", (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    });

    // Dots
    const DOTS = 80;
    let dots: { x: number; y: number; vx: number; vy: number }[] = [];
    function generateDots() {
      dots = [];
      for (let i = 0; i < DOTS; i++) {
        dots.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.18, // slower velocity
          vy: (Math.random() - 0.5) * 0.18, // slower velocity
        });
      }
    }
    generateDots();

    function draw() {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = "#12001a";
      ctx.fillRect(0, 0, width, height);

      for (let i = 0; i < DOTS; i++) {
        let d = dots[i];
  let dx = (mouse.x - width / 2) * 0.004; // less parallax
  let dy = (mouse.y - height / 2) * 0.004; // less parallax
  d.x += d.vx + dx;
  d.y += d.vy + dy;
        // Wrap around screen instead of bouncing
        if (d.x < 0) d.x = width;
        if (d.x > width) d.x = 0;
        if (d.y < 0) d.y = height;
        if (d.y > height) d.y = 0;
        ctx.beginPath();
        ctx.arc(d.x, d.y, 2.2, 0, 2 * Math.PI);
        ctx.fillStyle = "#a259f7";
        ctx.shadowColor = "#a259f7";
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      for (let i = 0; i < DOTS; i++) {
        for (let j = i + 1; j < DOTS; j++) {
          let a = dots[i];
          let b = dots[j];
          let dist = Math.hypot(a.x - b.x, a.y - b.y);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(162,89,247,${0.12 + 0.18 * (1 - dist / 120)})`;
            ctx.lineWidth = 1.1;
            ctx.stroke();
          }
        }
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
      generateDots();
    }
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full -z-10 pointer-events-none"
      style={{ position: "fixed", top: 0, left: 0 }}
    />

  );
}
