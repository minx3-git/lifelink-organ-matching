"use client";
import { useEffect, useRef } from "react";

const cloudWords = [
  { text: "match", color: "#7b2233" },
  { text: "transplant", color: "#7b2233" },
  { text: "leave all", color: "#7b2233" },
];

const cloudColor = "#FFFDE7";

function randomBetween(a: number, b: number) {
  return Math.random() * (b - a) + a;
}

export default function FloatingClouds() {
  const cloudRefs = useRef<(HTMLDivElement | null)[]>([]);
  const positions = useRef(
    cloudWords.map(() => ({
      x: randomBetween(10, window.innerWidth - 150),
      y: randomBetween(10, window.innerHeight - 100),
      dx: randomBetween(-0.3, 0.3),
      dy: randomBetween(-0.3, 0.3),
    }))
  );
  const mouse = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    let animationId: number;
    function animate() {
      positions.current.forEach((pos, i) => {
        // Move clouds gently toward the mouse, plus a floating effect
        const dx = (mouse.current.x - pos.x) * 0.002 + pos.dx;
        const dy = (mouse.current.y - pos.y) * 0.002 + pos.dy;
        pos.x += dx;
        pos.y += dy;
        // Bounce off edges
        if (pos.x < 0 || pos.x > window.innerWidth - 150) pos.dx *= -1;
        if (pos.y < 0 || pos.y > window.innerHeight - 100) pos.dy *= -1;
        // Update DOM
        const ref = cloudRefs.current[i];
        if (ref) {
          ref.style.transform = `translate(${pos.x}px, ${pos.y}px)`;
        }
      });
      animationId = requestAnimationFrame(animate);
    }
    animate();
    return () => cancelAnimationFrame(animationId);
  }, []);

  return (
    <>
      {cloudWords.map((cloud, i) => (
        <div
          key={cloud.text}
          ref={el => { cloudRefs.current[i] = el; }}
          style={{
            position: "fixed",
            left: 0,
            top: 0,
            zIndex: 20,
            pointerEvents: "none",
            width: 140,
            height: 60,
            filter: "drop-shadow(0 2px 8px #7b223355)",
            transition: "filter 0.2s",
          }}
        >
          <div
            style={{
              background: cloudColor,
              borderRadius: 40,
              border: `3px solid #7b2233`,
              color: cloud.color,
              fontWeight: 700,
              fontFamily: 'Comic Sans MS, Comic Sans, cursive',
              fontSize: 22,
              padding: "12px 28px",
              boxShadow: "0 4px 16px #7b223322",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              minWidth: 80,
              minHeight: 40,
              userSelect: "none",
              letterSpacing: 1,
            }}
          >
            <span style={{ marginRight: 8, fontSize: 26 }}>☁️</span>
            {cloud.text}
          </div>
        </div>
      ))}
    </>
  );
}
