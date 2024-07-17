import './Login.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const loginData = {
            email: username,
            password: password
        };
        try {
            const response = await axios.post("https://s55-ayush-capstone-serenitysteps.onrender.com/login", {username, password} );
            localStorage.setItem('token', response.data.token);
            navigate('/');
        } catch (error) {
            setLoginError(error.response?.data || error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="form-container">
            <form className="loginform" onSubmit={handleFormSubmit}>
                <label>Username:</label>
                <input 
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <br />
                <label>Password:</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={6}
                />
                <br />
                <button type="submit" className="login-btn" disabled={isLoading}>
                    {isLoading ? 'Logging in...' : 'Login'}
                </button>
            </form>
            {loginError && <p className="error-message">{loginError}</p>}
        </div>
    );
}

export default Login;
