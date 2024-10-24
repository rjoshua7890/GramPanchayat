// src/components/UApplyServices.jsx
import React, { useEffect, useState } from 'react';
import { db } from './firebase';
import { collection, onSnapshot, addDoc } from 'firebase/firestore';
import './Uapplyservices.css'

const UApplyServices = () => {
    const [services, setServices] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, "services"), (snapshot) => {
            const serviceData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setServices(serviceData);
        });
        return () => unsubscribe();
    }, []);

    const filteredServices = services.filter(service =>
        service.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleApply = async (service) => {
        try {
            await addDoc(collection(db, "applications"), {
                serviceName: service.name,
                status: "Pending", // Initial status
                // Add any additional fields you need, such as user ID, timestamps, etc.
            });
            alert(`Applied for ${service.name}!`);
        } catch (error) {
            console.error("Error applying for service:", error);
            alert('Failed to apply for the service. Please try again.');
        }
    };

    return (
        <div className='apply'>
            <h1>Search and Apply for Services</h1>
            <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search for a service..."
            />
            {filteredServices.length === 0 ? (
                <p>No services found.</p>
            ) : (
                <ul>
                    {filteredServices.map((service) => (
                        <li key={service.id}>
                            {service.name}
                            <button onClick={() => handleApply(service)}>Apply</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default UApplyServices;
