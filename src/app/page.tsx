

"use client";



import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { auth } from '../firebase';
import GeometricBackground from '../components/GeometricBackground';


export default function HomePage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((u) => {
      setUser(u);
      setLoading(false);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const handleProtectedClick = (path: string) => {
    if (!user) {
      router.push('/login');
    } else {
      router.push(path);
    }
  };



  return (
    <div style={{ background: '#0a0a0a', minHeight: '100vh', width: '100vw', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
  <GeometricBackground opacity={0.13} />
      <main style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '80vh', width: 500, margin: '0 auto', zIndex: 10, padding: 48 }}>
        <h1 style={{ fontSize: 68, fontWeight: 900, marginBottom: 24, letterSpacing: 8, color: '#7b2233', fontFamily: 'Orbitron, sans-serif', textAlign: 'center', textShadow: '0 2px 16px #7b223399, 0 0px 2px #000' }}>
          LifeLink
        </h1>
        <p style={{ fontSize: 20, marginBottom: 40, fontWeight: 600, color: '#fff', fontFamily: 'monospace', opacity: 0.85, textAlign: 'center' }}>
          Register as a donor or recipient, and help save lives.
        </p>
        <div style={{ display: 'flex', gap: 24, justifyContent: 'center' }}>
          <button
            onClick={() => handleProtectedClick('/donor-form')}
            style={{ fontWeight: 700, padding: '16px 40px', borderRadius: 8, fontSize: 18, background: '#7b2233', color: '#fff', border: 'none', fontFamily: 'monospace', letterSpacing: 2, cursor: 'pointer', boxShadow: '0 2px 8px #7b223355' }}
          >
            Become a Donor
          </button>
          <button
            onClick={() => handleProtectedClick('/recipient-form')}
            style={{ fontWeight: 700, padding: '16px 40px', borderRadius: 8, fontSize: 18, background: '#fff', color: '#7b2233', border: '2px solid #7b2233', fontFamily: 'monospace', letterSpacing: 2, cursor: 'pointer', boxShadow: '0 2px 8px #7b223355' }}
          >
            Request an Organ
          </button>
        </div>
      </main>
    </div>
  );
}
