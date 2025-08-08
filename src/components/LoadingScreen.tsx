"use client";
import { useEffect, useRef, useState } from "react";


const black = "#000";
const maroon = "#7b2233";


export default function LoadingScreen() {
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [t, setT] = useState(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    let frame: number;
    const animate = () => {
      setT(t => t + 0.016);
      frame = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(frame);
  }, [mounted]);

  if (!mounted) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center min-h-screen w-full bg-black"
      style={{ background: black }}
    >
      <div className="flex flex-col items-center justify-center">
        <div
          className="text-4xl font-extrabold tracking-widest mb-6 animate-pulse"
          style={{ color: maroon, letterSpacing: 6, fontFamily: 'Playfair Display, serif', textShadow: '0 2px 16px #7b223399' }}
        >
          LifeLink
        </div>
        <div
          className="w-64 h-3 rounded-full overflow-hidden mb-2"
          style={{ background: '#181018', border: `2px solid ${maroon}` }}
        >
          <div
            className="h-full rounded-full animate-pulse"
            style={{ width: '70%', background: maroon, opacity: 0.7 }}
          />
        </div>
        <div
          className="text-lg tracking-wide mt-2"
          style={{ color: maroon, fontFamily: 'Playfair Display, serif', opacity: 0.85 }}
        >
          Loading your experience...
        </div>
      </div>
    </div>
  );
}
