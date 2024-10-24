// src/components/UserPage.jsx
import React, { useState } from 'react';
import './UserPage.css';
import { auth } from './firebase'; // Import auth from your firebase configuration
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
import { assets } from './assets/assets'; // Adjust the path as needed

const UserPage = () => {
    const [currState, setCurrState] = useState("Login");
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            setUser(userCredential.user);
            alert('User login successful!');
        } catch (err) {
            setError(err.message);
        }
    };

    const handleSignUp = async () => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            setUser(userCredential.user);
            alert('User registration successful!');
        } catch (err) {
            setError(err.message);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (currState === "Login") {
            handleLogin();
        } else {
            handleSignUp();
        }
    };

    return (
        <div className='user-popup'>
            {user ? (
                <div className='u'>
                    <h1>Welcome, {user.email}</h1>
                    <div>
                        <button onClick={() => navigate('/apply-services')}>Apply for Services</button>
                        <button onClick={() => navigate('/application-status')}>My Application Status</button>
                        <button onClick={() => navigate('/search-services')}>Search Services</button>
                        <button onClick={() => navigate('/my-profile')}>My Profile</button>
                    </div>
                </div>
            ) : (
                <form className="user-popup-container" onSubmit={handleSubmit}>
                    <div className="user-popup-title">
                        <h2>{currState}</h2>
                        <Link to='/'><img src={assets.cross_icon} alt="" /></Link>
                    </div>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    <div className="user-popup-inputs">
                        {currState === "Sign Up" &&
                            <input
                                type="text"
                                placeholder='Your name'
                                required
                                onChange={(e) => setName(e.target.value)}
                            />
                        }
                        <input
                            type="email"
                            placeholder='Your email'
                            required
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input
                            type="password"
                            placeholder='Password'
                            required
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit">{currState === "Sign Up" ? "Create account" : "Login"}</button>
                    <div className="user-popup-condition">
                        <input type="checkbox" required />
                        <p>By continuing, I agree to all the terms & conditions.</p>
                    </div>
                    {currState === "Login"
                        ? <p>Create a new account? <span onClick={() => setCurrState("Sign Up")}>Click here</span></p>
                        : <p>Already have an account? <span onClick={() => setCurrState("Login")}>Login here</span></p>
                    }
                </form>
            )}
        </div>
    );
};

export default UserPage;
