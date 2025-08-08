import { useEffect, useRef } from "react";

// Animated geometric pattern background (moving triangles)
export default function GeometricBackground({ opacity = 0.13 }: { opacity?: number }) {
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

    const TRIANGLES = 18;
    const triangles: { x: number; y: number; size: number; dx: number; dy: number; angle: number; da: number; color: string }[] = [];
    const colors = [
      `rgba(123,34,51,${opacity})`, // maroon
      `rgba(40,10,19,${opacity})`, // dark maroon
      `rgba(255,255,255,${opacity * 0.12})`, // faint white
    ];
    for (let i = 0; i < TRIANGLES; i++) {
      const size = 60 + Math.random() * 80;
      triangles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size,
        dx: (Math.random() - 0.5) * 0.3,
        dy: (Math.random() - 0.5) * 0.3,
        angle: Math.random() * Math.PI * 2,
        da: (Math.random() - 0.5) * 0.003,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    let running = true;
    function draw() {
      if (!running || !ctx) return;
      ctx.clearRect(0, 0, width, height);
      for (const t of triangles) {
        t.x += t.dx;
        t.y += t.dy;
        t.angle += t.da;
        if (t.x < -t.size) t.x = width + t.size;
        if (t.x > width + t.size) t.x = -t.size;
        if (t.y < -t.size) t.y = height + t.size;
        if (t.y > height + t.size) t.y = -t.size;
        ctx.save();
        ctx.translate(t.x, t.y);
        ctx.rotate(t.angle);
        ctx.beginPath();
        ctx.moveTo(0, -t.size / 2);
        ctx.lineTo(-t.size / 2, t.size / 2);
        ctx.lineTo(t.size / 2, t.size / 2);
        ctx.closePath();
        ctx.fillStyle = t.color;
        ctx.shadowColor = "#7b2233";
        ctx.shadowBlur = 16;
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.restore();
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
  }, [opacity]);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: "fixed", inset: 0, width: "100vw", height: "100vh", zIndex: 0, pointerEvents: "none" }}
      aria-hidden="true"
    />
  );
}
