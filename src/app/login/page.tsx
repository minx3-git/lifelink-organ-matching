"use client";
import { useState } from 'react';
import { auth } from '../../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
  await signInWithEmailAndPassword(auth, form.email, form.password);
  router.push('/');
    } catch (err: any) {
      setError(err.message);
    }
    setLoading(false);
  };

  return (
    <div style={{ background: '#0a0a0a', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
  <form onSubmit={handleSubmit} style={{ background: '#000', border: '2px solid #7b2233', borderRadius: 16, boxShadow: '0 4px 32px #1118', padding: 40, width: 380, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <h2 style={{ fontSize: 32, fontWeight: 800, color: '#7b2233', marginBottom: 32, fontFamily: 'monospace', letterSpacing: 2 }}>Login</h2>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          style={{ width: '100%', marginBottom: 20, padding: 14, borderRadius: 8, border: '1.5px solid #7b2233', fontSize: 16, fontFamily: 'monospace', background: '#0a0a0a', color: '#fff' }}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          style={{ width: '100%', marginBottom: 20, padding: 14, borderRadius: 8, border: '1.5px solid #7b2233', fontSize: 16, fontFamily: 'monospace', background: '#0a0a0a', color: '#fff' }}
          required
        />
        {error && <div style={{ color: '#7b2233', marginBottom: 18, fontWeight: 600 }}>{error}</div>}
        <button
          type="submit"
          style={{ width: '100%', background: '#7b2233', color: '#fff', padding: '14px 0', borderRadius: 8, fontWeight: 700, fontSize: 18, fontFamily: 'monospace', border: 'none', cursor: 'pointer', marginTop: 8, boxShadow: '0 2px 8px #7b223355' }}
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
}
