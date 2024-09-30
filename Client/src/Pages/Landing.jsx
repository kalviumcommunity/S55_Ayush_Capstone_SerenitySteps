import './Landing.css';
import { Link } from 'react-router-dom';
import Typed from 'typed.js';
import { useEffect, useRef } from 'react';

function Land() {
    const typedRef = useRef(null);

    useEffect(() => {
      const options = {
        strings: ["Hello and Welcome to,<br /><span class='heading'>Serenity Steps</span>"],
        typeSpeed: 70,
        loop: true
      };
  
      const typed = new Typed(typedRef.current, options);
  
      return () => {
        typed.destroy();
      };
    }, []);

    return(
        <>
            <nav>
                <div className='navbar'>
                    <h1 className='title'>Serenity Steps</h1>
                    <Link to="/About"><button className='aboutUs-btn'>About Us</button></Link>
                    <Link to="/Login"><button className='loginbtn'>Login</button></Link>
                </div>
            </nav>
            <img src="./Bg_capstone.jpeg" alt="" id='bg-img'/>
            <div id="typed-container">
                      <span ref={typedRef}></span>
                      <br />
                      <div className='message1'><h3 >Click on the Signup to get started</h3></div>
                    
                    <Link to="/Signup"><button className='signupbtn'>Signup</button></Link>
            </div>
                    
        </>
    )
}

export default Land;
