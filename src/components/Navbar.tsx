"use client";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import { useEffect, useState } from 'react';
import type { User } from 'firebase/auth';

export default function Navbar() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((u) => setUser(u));
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    router.push('/');
  };

  return (
  <nav style={{ background: '#0a0a0a', padding: '18px 0', display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 40, width: 700, maxWidth: '90vw', justifyContent: 'space-between' }}>
        <span style={{ fontSize: 32, fontWeight: 800, letterSpacing: 6, color: '#7b2233', fontFamily: 'monospace', userSelect: 'none' }}>LifeLink</span>
        <div style={{ display: 'flex', gap: 24 }}>
          <Link href="/" style={{ color: '#7b2233', fontWeight: 700, fontFamily: 'monospace', fontSize: 18, textDecoration: 'none' }}>Home</Link>
          <Link href="/login" style={{ color: '#7b2233', fontWeight: 700, fontFamily: 'monospace', fontSize: 18, textDecoration: 'none' }}>Login</Link>
          <Link href="/signup" style={{ color: '#7b2233', fontWeight: 700, fontFamily: 'monospace', fontSize: 18, textDecoration: 'none' }}>Signup</Link>
          <Link href="/dashboard" style={{ color: '#7b2233', fontWeight: 700, fontFamily: 'monospace', fontSize: 18, textDecoration: 'none' }}>Dashboard</Link>
        </div>
        {user ? (
          <button onClick={handleLogout} style={{ background: '#7b2233', color: '#fff', fontWeight: 700, fontFamily: 'monospace', fontSize: 16, border: 'none', borderRadius: 6, padding: '8px 22px', cursor: 'pointer', marginLeft: 16 }}>Logout</button>
        ) : null}
      </div>
    </nav>
  );
}
