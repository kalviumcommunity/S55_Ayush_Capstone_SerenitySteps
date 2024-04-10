import './Signup.css'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function Signup() {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [signupError, setSignupError] = useState('');

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      
      navigate('/'); 
    } catch (error) {
      setSignupError(error.message);
    }
  };

  return (
    <>
      <nav>
        <div className='navbar'>
          <Link to="/" className='title'><h1>Serenity Steps</h1></Link>
          <Link to="/About"><button className='aboutUs-btn'>About Us</button></Link>
        </div>
      </nav>
      <div className="form-container">
        <form className="signupform" onSubmit={handleFormSubmit}>
          <label>First Name:</label>
          <input 
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
          <br />

          <label>Last Name:</label>
          <input 
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
          <br />

          <label>Contact Number:</label>
          <input 
            type="tel"
            value={contactNumber}
            onChange={(e) => setContactNumber(e.target.value)}
            required
          />
          <br />

          <label>Email:</label>
          <input 
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <br />

          <label>Create Username:</label>
          <input 
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <br />

          <label>Create Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
