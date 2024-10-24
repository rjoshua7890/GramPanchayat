// src/components/UMyProfile.jsx
import React, { useEffect, useState } from 'react';
import { auth } from './firebase';
import { updateProfile } from 'firebase/auth'; 
import { db } from './firebase'; // Import Firestore
import { doc, setDoc, getDoc } from 'firebase/firestore'; // Firestore functions
import './Umyprofile.css';

const UmyProfile = () => {
    const [user, setUser] = useState(null);
    const [name, setName] = useState('');
    const [phoneNo, setPhoneNo] = useState('');
    const [dob, setDob] = useState('');
    const [city, setCity] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                setUser(user);
                setName(user.displayName || '');
                fetchUserProfile(user.uid);
            } else {
                setUser(null);
                resetForm();
            }
        });

        return () => unsubscribe();
    }, []);

    const resetForm = () => {
        setName('');
        setPhoneNo('');
        setDob('');
        setCity('');
        setError('');
    };

    const fetchUserProfile = async (uid) => {
        const userDoc = doc(db, 'users', uid);
        const docSnap = await getDoc(userDoc);
        if (docSnap.exists()) {
            const userData = docSnap.data();
            setPhoneNo(userData.phoneNo || '');
            setDob(userData.dob || '');
            setCity(userData.city || '');
        }
    };

    const validateInput = () => {
        if (!name || !phoneNo || !dob || !city) {
            setError('All fields are required.');
            return false;
        }
        // Add more validation logic here (e.g., phone number format)
        setError('');
        return true;
    };

    const handleUpdateProfile = async () => {
        if (!validateInput() || !user) return;

        setLoading(true);
        try {
            await updateProfile(user, { displayName: name });
            await setDoc(doc(db, 'users', user.uid), {
                phoneNo,
                dob,
                city,
            }, { merge: true });

            alert('Profile updated successfully');
        } catch (error) {
            console.error('Profile update error:', error.message);
            alert('Profile update failed: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='profile'>
            <h2>My Profile</h2>
            {user ? (
                <div>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Name:</strong> {name || 'Not set'}</p>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Name"
                        style={{ marginBottom: '10px', padding: '8px', width: 'calc(100% - 18px)' }}
                    />
                    <input
                        type="text"
                        value={phoneNo}
                        onChange={(e) => setPhoneNo(e.target.value)}
                        placeholder="Phone Number"
                        style={{ marginBottom: '10px', padding: '8px', width: 'calc(100% - 18px)' }}
                    />
                    <input
                        type="date"
                        value={dob}
                        onChange={(e) => setDob(e.target.value)}
                        style={{ marginBottom: '10px', padding: '8px', width: 'calc(100% - 18px)' }}
                    />
                    <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="City"
                        style={{ marginBottom: '10px', padding: '8px', width: 'calc(100% - 18px)' }}
                    />
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    <button
                        onClick={handleUpdateProfile}
                        disabled={loading}
                        style={{ padding: '8px 16px', backgroundColor: '#28a745', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                    >
                        {loading ? 'Updating...' : 'Update Profile'}
                    </button>
                </div>
            ) : (
                <p>Please log in</p>
            )}
        </div>
    );
};

export default UmyProfile;
