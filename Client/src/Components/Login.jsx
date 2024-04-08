import './Login.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
          
          navigate('/'); 
        } catch (error) {
          setSignupError(error.message);
        }
      };
    

    return(
        <>
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
                    <button type="submit" className="login-btn">Login</button>
            </form>
       
        </div>
        </>
    )
}
export default Login
