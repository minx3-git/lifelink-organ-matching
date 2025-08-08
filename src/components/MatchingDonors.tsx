"use client";
import { useEffect, useState } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { firestore } from '../firebase';
import { auth } from '../firebase';

export default function MatchingDonors() {
  const [matches, setMatches] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMatches = async () => {
      setLoading(true);
      setError('');
      try {
        // Get the latest recipient request for the current user
        const recipientSnap = await getDocs(
          query(
            collection(firestore, 'recipients'),
            where('contact', '==', auth.currentUser?.phoneNumber || auth.currentUser?.email)
          )
        );
        if (recipientSnap.empty) {
          setError('No recipient request found for your account.');
          setLoading(false);
          return;
        }
        // Use the most recent request
        const recipient = recipientSnap.docs[recipientSnap.docs.length - 1].data();
        const { requiredOrgan, bloodGroup } = recipient;
        // Find matching donors
        const donorSnap = await getDocs(
          query(
            collection(firestore, 'donors'),
            where('organ', '==', requiredOrgan),
            where('bloodGroup', '==', bloodGroup)
          )
        );
        setMatches(donorSnap.docs.map(doc => doc.data()));
      } catch (err: any) {
        setError(err.message);
      }
      setLoading(false);
    };
    fetchMatches();
  }, []);

  if (loading) return <div>Loading matching donors...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  if (matches.length === 0) return <div>No matching donors found.</div>;

  return (
    <div className="mt-8 w-full max-w-xl bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Matching Donors</h2>
      <ul>
        {matches.map((donor, idx) => (
          <li key={idx} className="mb-4 border-b pb-2">
            <div><span className="font-semibold">Name:</span> {donor.name}</div>
            <div><span className="font-semibold">Contact:</span> {donor.contact}</div>
            <div><span className="font-semibold">Blood Group:</span> {donor.bloodGroup}</div>
            <div><span className="font-semibold">Organ:</span> {donor.organ}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
