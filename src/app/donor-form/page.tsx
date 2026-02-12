"use client";
import { useState } from 'react';
import ThemedFormWrapper from '../../components/ThemedFormWrapper';
import { firestore, storage } from '../../firebase';
import { collection, addDoc, serverTimestamp, doc, setDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export default function DonorForm() {
  const [form, setForm] = useState<{
    fullName: string;
    age: string;
    gender: string;
    bloodGroup: string;
    organs: string[];
    city: string;
    contact: string;
    conditions: string;
    checkupDate: string;
    consent: boolean;
  }>({
    fullName: '',
    age: '',
    gender: '',
    bloodGroup: '',
    organs: [],
    city: '',
    contact: '',
    conditions: '',
    checkupDate: '',
    consent: false,
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [showUploads, setShowUploads] = useState(false);
  const [screeningFile, setScreeningFile] = useState<File | null>(null);
  const [consentFile, setConsentFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox' && name === 'organs') {
      setForm((prev) => ({
        ...prev,
        organs: checked
          ? [...prev.organs, value]
          : prev.organs.filter((o: string) => o !== value),
      }));
    } else if (type === 'checkbox') {
      setForm((prev) => ({ ...prev, [name]: checked }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);
    // Validation
    if (!form.fullName || !form.age || !form.gender || !form.bloodGroup || !form.organs.length || !form.city || !form.contact || !form.consent) {
      setError('Please fill all required fields and consent.');
      setLoading(false);
      return;
    }
    if (!/^\d{10}$/.test(form.contact)) {
      setError('Contact number must be 10 digits.');
      setLoading(false);
      return;
    }
    setShowUploads(true);
    setLoading(false);
  };

  const handleFinalSubmit = async () => {
    setError('');
    setSuccess('');
    setUploading(true);
    if (!screeningFile || !consentFile) {
      setError('Please upload both documents.');
      setUploading(false);
      return;
    }
    try {
      // Instead of uploading, just push to Firestore with dummy URLs
      await addDoc(collection(firestore, 'donors'), {
        ...form,
        age: Number(form.age),
        createdAt: serverTimestamp(),
        screeningDoc: 'attached',
        consentForm: 'attached',
      });
      setSuccess('Thank you for registering as a donor!');
      setForm({
        fullName: '', age: '', gender: '', bloodGroup: '', organs: [], city: '', contact: '', conditions: '', checkupDate: '', consent: false,
      });
      setScreeningFile(null);
      setConsentFile(null);
      setShowUploads(false);
    } catch (err: any) {
      let msg = 'Submission failed.';
      if (err && typeof err === 'object') {
        if (err.code) msg += ` [${err.code}]`;
        if (err.message) msg += ` ${err.message}`;
        if (err.stack) msg += `\n${err.stack}`;
      } else if (typeof err === 'string') {
        msg += ' ' + err;
      }
      setError(msg);
    }
    setUploading(false);
  };

  return (
    <ThemedFormWrapper title="Become a Donor">
      {!showUploads ? (
        <form onSubmit={handleSubmit} style={{ maxWidth: 1100, margin: '0 auto', background: '#000', borderRadius: 24, boxShadow: '0 8px 48px #7b223355', padding: 64, fontFamily: 'monospace', border: '2.5px solid #7b2233', fontSize: 20 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, maxWidth: 1300, margin: '0 auto' }}>
            {/* ...existing form fields... */}
            <div>
              <label style={{ color: '#fff', fontWeight: 700, fontSize: 22 }}>Full Name</label>
              <input type="text" name="fullName" placeholder="Full Name" value={form.fullName} onChange={handleChange} style={{ width: '100%', marginBottom: 24, padding: 16, borderRadius: 8, border: '2px solid #7b2233', background: '#181018', color: '#fff', fontSize: 20, fontFamily: 'monospace' }} required />
            </div>
            <div>
              <label style={{ color: '#fff', fontWeight: 700, fontSize: 22 }}>Age</label>
              <input type="number" name="age" placeholder="Age" value={form.age} onChange={handleChange} style={{ width: '100%', marginBottom: 24, padding: 16, borderRadius: 8, border: '2px solid #7b2233', background: '#181018', color: '#fff', fontSize: 20, fontFamily: 'monospace' }} required />
            </div>
            <div>
              <label style={{ color: '#fff', fontWeight: 700, fontSize: 22 }}>Gender</label>
              <div style={{ marginBottom: 24 }}>
                <label style={{ marginRight: 16 }}><input type="radio" name="gender" value="Male" checked={form.gender==='Male'} onChange={handleChange} required /> Male</label>
                <label style={{ marginRight: 16 }}><input type="radio" name="gender" value="Female" checked={form.gender==='Female'} onChange={handleChange} required /> Female</label>
                <label><input type="radio" name="gender" value="Other" checked={form.gender==='Other'} onChange={handleChange} required /> Other</label>
              </div>
            </div>
            <div>
              <label style={{ color: '#fff', fontWeight: 700, fontSize: 22 }}>Blood Group</label>
              <select name="bloodGroup" value={form.bloodGroup} onChange={handleChange} style={{ width: '100%', marginBottom: 24, padding: 16, borderRadius: 8, border: '2px solid #7b2233', background: '#181018', color: '#fff', fontSize: 20, fontFamily: 'monospace' }} required>
                <option value="">Select</option>
                {['A+','A-','B+','B-','AB+','AB-','O+','O-'].map(bg => <option key={bg} value={bg}>{bg}</option>)}
              </select>
            </div>
            <div style={{ gridColumn: '1 / span 2' }}>
              <label style={{ color: '#fff', fontWeight: 700, fontSize: 22 }}>Organs Willing to Donate</label><br />
              <div style={{ marginBottom: 24 }}>
                {['Kidney','Liver','Heart','Cornea','Lungs','Pancreas','Intestines'].map(org => (
                  <label key={org} style={{ marginRight: 24, fontSize: 18 }}>
                    <input type="checkbox" name="organs" value={org} checked={form.organs.includes(org)} onChange={handleChange} /> {org}
                  </label>
                ))}
              </div>
            </div>
            <div>
              <label style={{ color: '#fff', fontWeight: 700, fontSize: 22 }}>City / Location</label>
              <input type="text" name="city" placeholder="City / Location" value={form.city} onChange={handleChange} style={{ width: '100%', marginBottom: 24, padding: 16, borderRadius: 8, border: '2px solid #7b2233', background: '#181018', color: '#fff', fontSize: 20, fontFamily: 'monospace' }} required />
            </div>
            <div>
              <label style={{ color: '#fff', fontWeight: 700, fontSize: 22 }}>Contact Number</label>
              <input type="text" name="contact" placeholder="Contact Number" value={form.contact} onChange={handleChange} style={{ width: '100%', marginBottom: 24, padding: 16, borderRadius: 8, border: '2px solid #7b2233', background: '#181018', color: '#fff', fontSize: 20, fontFamily: 'monospace' }} required />
            </div>
            <div style={{ gridColumn: '1 / span 2' }}>
              <label style={{ color: '#fff', fontWeight: 700, fontSize: 22 }}>Existing Medical Conditions</label>
              <textarea name="conditions" placeholder="Existing Medical Conditions" value={form.conditions} onChange={handleChange} style={{ width: '100%', maxWidth: 700, marginBottom: 24, padding: 16, borderRadius: 8, border: '2px solid #7b2233', background: '#181018', color: '#fff', fontSize: 18, fontFamily: 'monospace', minHeight: 60 }} />
            </div>
            <div>
              <label style={{ color: '#fff', fontWeight: 700, fontSize: 22 }}>Last Medical Checkup</label>
              <input type="date" name="checkupDate" value={form.checkupDate} onChange={handleChange} style={{ width: '100%', marginBottom: 24, padding: 16, borderRadius: 8, border: '2px solid #7b2233', background: '#181018', color: '#fff', fontSize: 18, fontFamily: 'monospace' }} />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gridColumn: '1 / span 2', marginBottom: 24 }}>
              <input type="checkbox" name="consent" checked={form.consent} onChange={handleChange} required style={{ marginRight: 12 }} />
              <label style={{ color: '#fff', fontSize: 18 }}>I consent to donate my organs</label>
            </div>
          </div>
          {error && <div style={{ color: '#ff4d4f', marginBottom: 18, fontWeight: 600, fontSize: 18 }}>{error}</div>}
          {success && <div style={{ color: '#4ade80', marginBottom: 18, fontWeight: 600, fontSize: 18 }}>{success}</div>}
          <button type="submit" style={{ width: '100%', fontWeight: 800, padding: '18px 0', borderRadius: 10, background: '#7b2233', color: '#fff', fontSize: 22, fontFamily: 'monospace', border: 'none', cursor: 'pointer', marginTop: 16, boxShadow: '0 2px 8px #7b223355', letterSpacing: 2 }} disabled={loading}>{loading ? 'Submitting...' : 'Submit'}</button>
        </form>
      ) : (
        <div style={{ maxWidth: 600, margin: '0 auto', background: '#181018', borderRadius: 16, padding: 40, boxShadow: '0 4px 32px #7b223355', border: '2px solid #7b2233' }}>
          <h2 className="text-2xl font-bold mb-6 text-maroon-200">Upload Required Documents</h2>
          <div className="mb-6">
            <label className="block text-lg text-maroon-100 mb-2">Hospital Screening Document (PDF)</label>
            <input type="file" accept="application/pdf" onChange={e => setScreeningFile(e.target.files?.[0] || null)} className="block w-full text-white bg-black border border-maroon-700 rounded p-2" />
          </div>
          <div className="mb-6">
            <label className="block text-lg text-maroon-100 mb-2">Consent Form (PDF)</label>
            <input type="file" accept="application/pdf" onChange={e => setConsentFile(e.target.files?.[0] || null)} className="block w-full text-white bg-black border border-maroon-700 rounded p-2" />
          </div>
          {error && <div style={{ color: '#ff4d4f', marginBottom: 18, fontWeight: 600, fontSize: 18 }}>{error}</div>}
          {success && <div style={{ color: '#4ade80', marginBottom: 18, fontWeight: 600, fontSize: 18 }}>{success}</div>}
          <button onClick={handleFinalSubmit} disabled={uploading || !screeningFile || !consentFile} style={{ width: '100%', fontWeight: 800, padding: '16px 0', borderRadius: 10, background: '#7b2233', color: '#fff', fontSize: 20, fontFamily: 'monospace', border: 'none', cursor: 'pointer', marginTop: 8, boxShadow: '0 2px 8px #7b223355', letterSpacing: 2 }}>
            {uploading ? 'Uploading...' : 'Submit All'}
          </button>
        </div>
      )}
    </ThemedFormWrapper>
  );
}
