// src/components/AdminPage.jsx
import React, { useState } from 'react';
import './AdminPage.css'; // Assuming you have a CSS file for styling
import { auth } from './firebase'; // Import auth from your firebase configuration
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate, Link } from 'react-router-dom';
import { assets } from './assets/assets'; // Adjust the path as needed

const AdminPage = () => {
    const [currState, setCurrState] = useState("Login");
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [admin, setAdmin] = useState(null);
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const adminCredential = await signInWithEmailAndPassword(auth, email, password);
            setAdmin(adminCredential.user);
            setError(''); // Clear error on successful login
            alert('Admin login successful!');
        } catch (err) {
            setError(err.message);
        }
    };

    const handleSignUp = async () => {
        try {
          await createUserWithEmailAndPassword(auth, email, password);
          alert('Admin registration successful!');
        } catch (err) {
          setError(err.message);
        }
      };

    const handleSubmit = (e) => {
        debugger;
        e.preventDefault();
        if (currState === "Login") {
            handleLogin();
        } else {
            handleSignUp();// Implement signup logic if needed
        }
    };

    const handleStateChange = (newState) => {
        setCurrState(newState);
        setError(''); // Clear error when changing state
        setEmail(''); // Optionally clear email
        setPassword(''); // Optionally clear password
    };

    return (
        <div className='admin-popup'>
            {admin ? (
                <div className='update'>
                    <h1>Welcome, {admin.email}</h1>
                    <div>
                        <button onClick={() => navigate('/Aupdate-delete-services')}>Update/Delete Services</button>
                        <button onClick={() => navigate('/Aupdate-application-status')}>Update Application Status</button>
                    </div>
                </div>
            ) : (
                <form className="admin-popup-container" onSubmit={handleSubmit}>
                    <div className="admin-popup-title">
                        <h2>{currState} Admin</h2>
                        <Link to='/' className="close-link">
                            <img src={assets.cross_icon} alt="" />
                        </Link>
                    </div>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    <div className="admin-popup-inputs">
                        <input
                            type="email"
                            placeholder='Your email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <input
                            type="password"
                            placeholder='Password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit">{currState === "Sign Up" ? "Create account" : "Login"}</button>
                    {currState === "Login"
                        ? <p>Create a new account? <span onClick={() => handleStateChange("Sign Up")}>Click here</span></p>
                        : <p>Already have an account? <span onClick={() => handleStateChange("Login")}>Login here</span></p>
                    }
                </form>
            )}
        </div>
    );
};

export default AdminPage;
