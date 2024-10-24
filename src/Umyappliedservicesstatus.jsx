// src/components/UMyAppliedServices.jsx
import React, { useEffect, useState } from 'react';
import { db } from './firebase';
import { collection, onSnapshot } from 'firebase/firestore';
import './Umyappliedservicesstatus.css'
const UMyAppliedServices = () => {
    const [appliedServices, setAppliedServices] = useState([]);

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, "applications"), (snapshot) => {
            const serviceData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setAppliedServices(serviceData);
        });
        return () => unsubscribe();
    }, []);

    // Filter for completed and rejected services
    const completedServices = appliedServices.filter(service => service.status === 'Completed');
    const rejectedServices = appliedServices.filter(service => service.status === 'Rejected');

    return (
        <div className='applied'>
            <h1>My Applied Services</h1>
            {completedServices.length === 0 && rejectedServices.length === 0 ? (
                <p>No completed or rejected services found.</p>
            ) : (
                <>
                    {completedServices.length > 0 && (
                        <>
                            <h2>Completed Services</h2>
                            <ul>
                                {completedServices.map((service) => (
                                    <li key={service.id}>
                                        Service: {service.serviceName} - Status: {service.status}
                                    </li>
                                ))}
                            </ul>
                        </>
                    )}
                    {rejectedServices.length > 0 && (
                        <>
                            <h2>Rejected Services</h2>
                            <ul>
                                {rejectedServices.map((service) => (
                                    <li key={service.id}>
                                        Service: {service.serviceName} - Status: {service.status}
                                    </li>
                                ))}
                            </ul>
                        </>
                    )}
                </>
            )}
        </div>
    );
};

export default UMyAppliedServices;
