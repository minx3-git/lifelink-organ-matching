"use client";

import { useEffect, useState } from 'react';
import { collection, query, where, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { firestore } from '../../firebase';
import ThemedFormWrapper from '@/components/ThemedFormWrapper';

export default function MatchingDonors({ organ, bloodGroup }: { organ: string, bloodGroup: string }) {
  const [matches, setMatches] = useState<any[]>([]);
  const [processing, setProcessing] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMatches = async () => {
      setLoading(true);
      setError('');
      try {
        console.log('MatchingDonors: Querying for organ:', organ, 'bloodGroup:', bloodGroup);
        const donorSnap = await getDocs(
          query(
            collection(firestore, 'donors'),
            where('organs', 'array-contains', organ),
            where('bloodGroup', '==', bloodGroup)
          )
        );
  const found = donorSnap.docs.map(docSnap => ({ ...(docSnap.data() as any), id: docSnap.id }));
        found.forEach((donor, idx) => {
          console.log(`Donor #${idx + 1}:`, donor);
          //
        });
        console.log('MatchingDonors: Querying for organ:', organ, 'bloodGroup:', bloodGroup);
        console.log('MatchingDonors: Found donors:', found);
        setMatches(found);
      } catch (err: any) {
        setError(err.message);
      }
      setLoading(false);
    };
    if (organ && bloodGroup) fetchMatches();
  }, [organ, bloodGroup]);

  if (loading) return (
    <ThemedFormWrapper title="Matching Donors">
      <div className="text-lg text-maroon-700 bg-black px-8 py-2 rounded w-full text-center">Loading matching donors...</div>
    </ThemedFormWrapper>
  );
  if (error) return (
    <ThemedFormWrapper title="Matching Donors">
      <div className="text-lg text-red-400 bg-black px-8 py-2 rounded w-full text-center">{error}</div>
    </ThemedFormWrapper>
  );
  if (matches.length === 0) return (
    <ThemedFormWrapper title="Matching Donors">
      <div className="text-lg text-maroon-700 bg-black px-8 py-2 rounded w-full text-center">No matching donors found.</div>
    </ThemedFormWrapper>
  );

  const handleConnect = async (donorId: string) => {
    setProcessing(donorId);
    try {
      await deleteDoc(doc(firestore, 'donors', donorId));
      setMatches((prev) => prev.filter((d) => d.id !== donorId));
    } catch (err) {
      alert('Failed to update donor status.');
    }
    setProcessing(null);
  };

  return (
    <ThemedFormWrapper title="Matching Donors">
      <div className="mb-6 p-4 rounded bg-yellow-900/80 border-l-4 border-yellow-400 text-yellow-200 font-semibold text-center">
        Please click the <span className="underline">Connected & Transplanting</span> button <span className="text-yellow-300">only after transplanting is fully confirmed</span>.<br />
        This will permanently remove the donor from the database.
      </div>
      <ul style={{ padding: 0, margin: 0 }}>
        {matches.map((donor, idx) => (
          <li key={donor.id || idx} className="border-b border-maroon-900 bg-maroon-950/40 rounded-lg px-6 py-3 matching-donor-item" style={{ marginBottom: 12, listStyle: 'none' }}>
            <div className="text-lg text-maroon-200"><span className="font-semibold">Name:</span> {donor.name}</div>
            <div className="text-maroon-300"><span className="font-semibold">Contact:</span> {donor.contact}</div>
            <div className="text-maroon-300"><span className="font-semibold">Blood Group:</span> {donor.bloodGroup}</div>
            <div className="text-maroon-300"><span className="font-semibold">Organs:</span> {Array.isArray(donor.organs) ? donor.organs.join(', ') : donor.organs || donor.organ}</div>
            <button
              className="mt-4 px-5 py-2 rounded bg-green-700 hover:bg-green-800 text-white font-bold transition disabled:opacity-60"
              onClick={() => handleConnect(donor.id)}
              disabled={processing === donor.id}
            >
              {processing === donor.id ? 'Processing...' : 'Connected & Transplanting'}
            </button>
          </li>
        ))}
      </ul>
    </ThemedFormWrapper>
  );
}
