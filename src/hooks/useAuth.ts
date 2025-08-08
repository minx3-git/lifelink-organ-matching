import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '../firebase';

export default function useAuth() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((u) => {
      setUser(u);
      setLoading(false);
      if (!u) router.push('/login');
    });
    return () => unsubscribe();
  }, [router]);

  return { user, loading };
}
