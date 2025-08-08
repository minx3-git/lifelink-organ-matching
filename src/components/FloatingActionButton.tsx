"use client";
import { useRouter } from 'next/navigation';

export default function FloatingActionButton() {
  const router = useRouter();
  return (
    <button
      className="fab-glow"
      title="Quick Donate"
      onClick={() => router.push('/donor-form')}
      aria-label="Quick Donate"
    >
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="16" cy="16" r="16" fill="#fff" fillOpacity="0.08"/>
        <path d="M16 23c-4.5-3.5-7-6.1-7-9.1C9 10.1 11.2 8 13.8 8c1.3 0 2.5 0.7 3.2 1.8C17.7 8.7 18.9 8 20.2 8 22.8 8 25 10.1 25 13.9c0 3-2.5 5.6-7 9.1z" fill="#fff"/>
        <path d="M16 23c-4.5-3.5-7-6.1-7-9.1C9 10.1 11.2 8 13.8 8c1.3 0 2.5 0.7 3.2 1.8C17.7 8.7 18.9 8 20.2 8 22.8 8 25 10.1 25 13.9c0 3-2.5 5.6-7 9.1z" fill="#7b2233"/>
      </svg>
    </button>
  );
}
