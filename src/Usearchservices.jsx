// src/components/UserAccessServices.jsx
import React, { useEffect, useState } from 'react';
import { db } from './firebase';
import { collection, onSnapshot } from 'firebase/firestore';
import './Usearchservices.css'
const Usersearchservices = () => {
    const [services, setServices] = useState([]);

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, "services"), (snapshot) => {
            const serviceData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setServices(serviceData);
        });
        return () => unsubscribe();
    }, []);

    return (
        <div className='search'>
            <h1>Available Services</h1>
            {services.length === 0 ? (
                <p>No services available at the moment.</p>
            ) : (
                <ul>
                    {services.map((service) => (
                        <li key={service.id}>
                            {service.name}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Usersearchservices;
