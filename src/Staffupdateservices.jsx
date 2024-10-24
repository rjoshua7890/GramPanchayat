// src/components/StaffUpdateServices.jsx
import React, { useEffect, useState } from 'react';
import { db } from './firebase';
import { collection, onSnapshot, updateDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './Staffupdateservices.css'

const StaffUpdateServices = () => {
    const [appliedServices, setAppliedServices] = useState([]);
    const [error, setError] = useState('');
    const navigate = useNavigate(); // Initialize useNavigate

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, "applications"), (snapshot) => {
            const serviceData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setAppliedServices(serviceData);
        }, (error) => {
            console.error("Error fetching applications:", error);
            setError('Failed to load applied services.');
        });
        
        return () => unsubscribe();
    }, []);

    const handleUpdateStatus = async (serviceId, newStatus) => {
        try {
            const serviceRef = doc(db, "applications", serviceId);
            await updateDoc(serviceRef, { status: newStatus });
            alert(`Updated status to ${newStatus} for service ID: ${serviceId}`);

            if (newStatus === 'Approved') {
                setAppliedServices([]); // Clear the list of applied services
                navigate('/staff'); // Redirect to CompleteApprovedServices
            }
        } catch (error) {
            console.error("Error updating status:", error);
            alert('Failed to update the status. Please try again.');
        }
    };

    return (
        <div className='staff'>
            <h1>Manage Applied Services</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {appliedServices.length === 0 ? (
                <p>No applied services found.</p>
            ) : (
                <ul>
                    {appliedServices.map(service => (
                        <li key={service.id}>
                            <h3>{service.serviceName}</h3>
                            <p>Status: {service.status}</p>
                            <button onClick={() => handleUpdateStatus(service.id, 'Approved')}>Approve</button>
                            <button onClick={() => handleUpdateStatus(service.id, 'Rejected')}>Reject</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default StaffUpdateServices;
