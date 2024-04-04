import './Signup.css'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


function Signup(){
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [signupError, setSignupError] = useState('');

  return(
    <>
    <nav>
        <div className='navbar'>
            <h1 className='title'>Serenity Steps</h1>
        </div>
    </nav>
    <div className="form-container">
      <form className="signupform">
      <label>First Name:</label>
        <input 
          type="text"  
          required 
        />
        <br></br>

        <label>Last Name:</label>
        <input 
          type="text"  
          required 
        />
        <br></br>

        <label>Contact Number:</label>
        <input 
          type="tel"  
          required 
        />
        <br></br>

        <label>Email:</label>
        <input 
          type="email"  
          required 
        />
        <br></br>

        <label>Create Username:</label>
        <input 
          type="text"  
          required 
        />
        <br></br>

        <label>Create Password:</label>
        <input
          type="password"
          required
          minLength={6}
        />
        <br />
        <button type="submit" className="signup-btn">SIGNUP</button>
      </form>
    </div>
    </>
      
  );

}
export default Signup;