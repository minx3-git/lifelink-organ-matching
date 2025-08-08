"use client";
import { useState } from 'react';
import { storage, firestore, auth } from '../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { doc, updateDoc, arrayUnion } from 'firebase/firestore';

export default function FileUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file || !auth.currentUser) return;
    setUploading(true);
    setError('');
    setSuccess('');
    try {
      const storageRef = ref(storage, `uploads/${auth.currentUser.uid}/${file.name}`);
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);
      await updateDoc(doc(firestore, 'users', auth.currentUser.uid), {
        files: arrayUnion({ name: file.name, url }),
      });
      setSuccess('File uploaded successfully!');
      setFile(null);
    } catch (err: any) {
      setError(err.message);
    }
    setUploading(false);
  };

  return (
    <div className="my-8">
      <input type="file" onChange={handleChange} className="mb-2" />
      <button onClick={handleUpload} disabled={!file || uploading} className="bg-green-600 text-white px-4 py-2 rounded ml-2">
        {uploading ? 'Uploading...' : 'Upload'}
      </button>
      {error && <div className="text-red-500 mt-2">{error}</div>}
      {success && <div className="text-green-600 mt-2">{success}</div>}
    </div>
  );
}
