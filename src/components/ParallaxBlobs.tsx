import { useEffect, useRef, useState } from 'react';

// Parallax blobs for homepage background
const layers = [
  { size: 340, speed: 0.09, opacity: 0.16 },
  { size: 180, speed: 0.18, opacity: 0.28 },
  { size: 100, speed: 0.28, opacity: 0.45 },
];
const darkRed = "#7b2233";





export default function ParallaxBlobs() {
  return (
    <div style={{ position: 'absolute', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 0, overflow: 'hidden', pointerEvents: 'none' }}>
      <svg width="100vw" height="100vh" style={{ position: 'absolute', top: 0, left: 0, width: '100vw', height: '100vh' }}>
        <defs>
          <radialGradient id="blobGradient1" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.2" />
          </radialGradient>
          <radialGradient id="blobGradient2" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#f472b6" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#be185d" stopOpacity="0.2" />
          </radialGradient>
        </defs>
        <ellipse cx="20%" cy="30%" rx="200" ry="120" fill="url(#blobGradient1)" style={{ filter: 'blur(40px)' }}>
          <animate attributeName="cx" values="20%;25%;20%" dur="8s" repeatCount="indefinite" />
        </ellipse>
        <ellipse cx="80%" cy="70%" rx="180" ry="100" fill="url(#blobGradient2)" style={{ filter: 'blur(40px)' }}>
          <animate attributeName="cy" values="70%;65%;70%" dur="7s" repeatCount="indefinite" />
        </ellipse>
      </svg>
    </div>
  );
}
