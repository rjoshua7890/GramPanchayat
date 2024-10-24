// src/components/ServiceManager.jsx
import React, { useState, useEffect } from 'react';
import { db } from './firebase';
import { collection, addDoc, updateDoc, deleteDoc, doc, onSnapshot } from 'firebase/firestore';
import './AUpdateDeleteServices.css'

const ServiceManager = () => {
    const [services, setServices] = useState([]);
    const [serviceName, setServiceName] = useState('');
    const [serviceId, setServiceId] = useState(null);

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, "services"), (snapshot) => {
            const serviceData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setServices(serviceData);
        });
        return () => unsubscribe();
    }, []);

    const handleCreateService = async () => {
        if (serviceName) {
            await addDoc(collection(db, "services"), { name: serviceName });
            setServiceName('');
        }
    };

    const handleUpdateService = async () => {
        if (serviceId && serviceName) {
            await updateDoc(doc(db, "services", serviceId), { name: serviceName });
            setServiceName('');
            setServiceId(null);
        }
    };

    const handleDeleteService = async (id) => {
        await deleteDoc(doc(db, "services", id));
    };

    return (
        <div className='aupdatedeleteservices'>
            <input
                type="text"
                value={serviceName}
                onChange={(e) => setServiceName(e.target.value)}
                placeholder="Service Name"
            />
            <button onClick={serviceId ? handleUpdateService : handleCreateService}>
                {serviceId ? "Update Service" : "Create Service"}
            </button>
            <ul>
                {services.map((service) => (
                    <li key={service.id}>
                        <div className='name'>{service.name}</div>
                        <button onClick={() => { setServiceId(service.id); setServiceName(service.name); }}>Edit</button>
                        <button onClick={() => handleDeleteService(service.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ServiceManager;
