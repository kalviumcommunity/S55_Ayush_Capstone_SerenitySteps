import './Login.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';

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
            navigate('/home');
        } catch (error) {
            setLoginError(error.response?.data || error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
        <div className="baap">
        <div className='side'>
                <div >
                    <img src="" alt="" />
                    <h1>Serenity Steps</h1>
                </div>
                <h2>Serenity Steps helps user to reach their wellness goals and improve their general health by taking a coordinated approach to well-being.</h2>
            </div>
            <div className="lform-container">
            <form className="loginform" onSubmit={handleFormSubmit}>
                <input 
                    type="text"
                    placeholder='Username'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <br />
                <input
                    type="password"
                    placeholder='Password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={6}
                />
                <br />
                <button type="submit" className="login-btn" disabled={isLoading}>
                    {isLoading ? 'Logging in...' : 'Login'}
                </button>
                <div id='fp'><a href="" id='fp'>Forgotten password?</a></div>
                <div id='line'></div>
                <div id='signin101'><Link to="/signup" id='signin101'> Create new account</Link></div>
                
            </form>
            {loginError && <p className="error-message">{loginError}</p>}
            </div>
        </div>
           
        </>
        
    );
}

export default Login;
