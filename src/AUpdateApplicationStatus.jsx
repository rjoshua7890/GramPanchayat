// src/components/CompleteApprovedServices.jsx
import React, { useEffect, useState } from 'react';
import { db } from './firebase';
import { collection, onSnapshot, updateDoc, doc } from 'firebase/firestore';
import './AUpdateApplicationStatus.css'
const ACompleteApprovedServices = () => {
    const [approvedServices, setApprovedServices] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, "applications"), (snapshot) => {
            const serviceData = snapshot.docs
                .map(doc => ({ id: doc.id, ...doc.data() }))
                .filter(service => service.status === 'Approved'); // Only approved services

            setApprovedServices(serviceData);
        }, (error) => {
            console.error("Error fetching approved applications:", error);
            setError('Failed to load approved services.');
        });

        return () => unsubscribe();
    }, []);

    const handleComplete = async (serviceId) => {
        try {
            const serviceRef = doc(db, "applications", serviceId);
            await updateDoc(serviceRef, { status: 'Completed' });
            alert(`Service ID: ${serviceId} has been marked as completed.`);
        } catch (error) {
            console.error("Error completing service:", error);
            alert('Failed to complete the service. Please try again.');
        }
    };

    return (
        <div className='aupdateapplicationstatus'>
            <h1>Complete Approved Services</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {approvedServices.length === 0 ? (
                <p>No approved services found.</p>
            ) : (
                <ul>
                    {approvedServices.map(service => (
                        <li key={service.id}>
                            <h3>{service.serviceName}</h3>
                            <p>Status: {service.status}</p>
                            <button onClick={() => handleComplete(service.id)}>Complete</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ACompleteApprovedServices;
