// src/components/StaffViewServices.jsx
import React, { useEffect, useState } from 'react';
import { db } from './firebase';
import { collection, onSnapshot } from 'firebase/firestore';
import './StaffviewServices.css'

const StaffViewServices = () => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // Fetch services from Firestore
    useEffect(() => {
        const unsubscribe = onSnapshot(
            collection(db, "services"),
            (snapshot) => {
                const servicesData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setServices(servicesData);
                setLoading(false); // Set loading to false after fetching
            },
            (error) => {
                console.error("Error fetching services:", error);
                setError('Failed to load services. Please try again later.');
                setLoading(false); // Set loading to false on error
            }
        );

        return () => unsubscribe(); // Cleanup on unmount
    }, []);

    return (
        <div className='staffviewservices'>
            <h1>Available Services</h1>
            {loading && <p>Loading services...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {services.length === 0 && !loading ? (
                <p>No services available at this time.</p>
            ) : (
                <ul>
                    {services.map(service => (
                        <li key={service.id} style={{ marginBottom: '20px', border: '1px solid #ccc', padding: '10px' }}>
                            <h3>{service.name}</h3>
                            <p>{service.description}</p>
                            <p>Status: {service.status}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default StaffViewServices;
