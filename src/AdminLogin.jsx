// src/components/Login.jsx
import React, { useState } from 'react';
import './Login.css'; // Assuming you have a CSS file for styling
import { auth } from '../firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { Link } from 'react-router-dom';

const Login = ({ setUser }) => {
    const [currState, setCurrState] = useState("Login");
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState('');

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
            <form className="user-popup-container" onSubmit={handleSubmit}>
                <div className="user-popup-title">
                    <h2>{currState}</h2>
                    <Link to='/'><button type="button">Close</button></Link>
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
        </div>
    );
};

export default Login;
