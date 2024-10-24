// src/components/StaffPage.jsx
import React, { useState } from 'react';
import { auth } from './firebase'; // Import auth from your firebase configuration
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate, Link } from 'react-router-dom';
import { assets } from './assets/assets'; // Adjust the path as needed
import './StaffPage.css'; // Assuming you have a CSS file for styling

const StaffPage = () => {
    const [currState, setCurrState] = useState("Login");
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [staff, setStaff] = useState(null);
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const staffCredential = await signInWithEmailAndPassword(auth, email, password);
            setStaff(staffCredential.user);
            setError(''); // Clear error on successful login
            alert('Staff login successful!');
        } catch (err) {
            setError(err.message);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (currState === "Login") {
            handleLogin();
        } else {
            // Implement signup logic if needed
        }
    };

    const handleStateChange = (newState) => {
        setCurrState(newState);
        setError(''); // Clear error when changing state
        setEmail(''); // Optionally clear email
        setPassword(''); // Optionally clear password
    };

    return (
        <div className='staff-popup'>
            {staff ? (
                <div>
                    <h1>Welcome, {staff.email}</h1>
                    <div className="staff">
    <button onClick={() => navigate('/staff-view-services')}>View Services</button>
    <button onClick={() => navigate('/staff-update-services')}>Update Application Status</button>
</div>

                </div>
            ) : (
                <form className="staff-popup-container" onSubmit={handleSubmit}>
                    <div className="staff-popup-title">
                        <h2>{currState} Staff</h2>
                        <Link to='/' className="close-link">
                            <img src={assets.cross_icon} alt="" />
                        </Link>
                    </div>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    <div className="staff-popup-inputs">
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

export default StaffPage;
