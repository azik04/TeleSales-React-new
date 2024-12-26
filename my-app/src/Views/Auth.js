import React, { useState } from 'react';
import Logo from '../Components/Photos/logo1.jpg';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false); // Set default value as false

    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [error, setError] = useState({});
    const navigate = useNavigate();

    const fetchAuth = async () => {
        try {
            const res = await axios.post('https://localhost:7108/api/Account', {
                email,
                password,
                rememberMe, // Include rememberMe in the request payload
            });
            console.log(res.data);
            if (res.data.success === true) {
                localStorage.setItem('JWT', res.data.data);
                navigate('/');
            }
        } catch (err) {
            if (err.response && err.response.data && err.response.data.errors) {
                setError(err.response.data.errors);
            } else {
                console.error('Unexpected error:', err);
            }
        }
    };

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    return (
        <section className="auth-container">
            <div className="auth">
                <div className="auth__logo">
                    <img src={Logo} alt="Logo" className="auth__logo-img" />
                </div>
                <h3 className="auth__heading">Welcome to <span className="auth__brand">TeleSales!</span></h3>
                <h3 className="auth__heading">Log In</h3>
                <div className="auth__form">
                    <div className="auth__input-container">
                        <span className="auth__input-icon"><i className="fas fa-user"></i></span>
                        <input
                            type="text"
                            className="auth__input"
                            placeholder="UserEmail"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <span className={`error ${error?.Email?.[0] ? 'visible' : ''}`}>
                            {error?.Email?.[0]}
                        </span>
                    </div>
                    <div className="auth__input-container">
                        <span className="auth__input-icon"><i className="fas fa-lock"></i></span>
                        <input
                            type={isPasswordVisible ? 'text' : 'password'}
                            className="auth__input"
                            id="password"
                            placeholder="Password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <span className="auth__eye-icon" id="togglePassword" onClick={togglePasswordVisibility}>
                            <i className={`fas ${isPasswordVisible ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                        </span>
                        <span className={`error ${error?.Password?.[0] ? 'visible' : ''}`}>
                            {error?.Password?.[0]}
                        </span>
                    </div>
                    <div className="auth__input-container-check">
                        <label>Remember Me:</label>
                        <input
                            type="checkbox"
                            onChange={(e) => setRememberMe(e.target.checked)}
                        />
                    </div>
                    <button className="auth__button" onClick={fetchAuth}>Log In</button>
                </div>
            </div>
        </section>
    );
};

export default Auth;
