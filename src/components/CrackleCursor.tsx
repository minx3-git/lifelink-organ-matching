"use client";
import { useEffect, useRef } from "react";

// Crackle effect: renders a small animated spark at the pointer location
export default function CrackleCursor() {
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ticking = false;
    const move = (e: MouseEvent) => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (dotRef.current) {
            dotRef.current.style.left = `${e.clientX}px`;
            dotRef.current.style.top = `${e.clientY}px`;
            dotRef.current.classList.remove("crackle");
            // retrigger animation
            void dotRef.current.offsetWidth;
            dotRef.current.classList.add("crackle");
          }
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <div
      ref={dotRef}
      className="pointer-events-none fixed z-[9999] w-6 h-6 -translate-x-1/2 -translate-y-1/2"
      style={{ pointerEvents: "none", left: 0, top: 0 }}
    >
      <span className="block w-full h-full animate-none crackle bg-maroon-400/80 rounded-full shadow-crackle" />
    </div>
  );
}
