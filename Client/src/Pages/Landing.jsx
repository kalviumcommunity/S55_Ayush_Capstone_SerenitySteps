import './Landing.css';
import { Link } from 'react-router-dom';

function Land() {


    return(
        <>
            <nav>
                <div className='navbar'>
                    <h1 className='title'>Serenity Steps</h1>
                    <Link to="/About"><button className='aboutUs-btn'>About Us</button></Link>
                    <Link to="/Login"><button className='loginbtn'>Login</button></Link>
                </div>
                
            </nav>
            <div className='container'>
                <div className='greetings'>
                    <h2>Hello and Welcome to</h2>
                    <h1 id='ss'>Serenity Steps</h1>
                    <br />
                    <br />
                    <h3>Click on the Signup to get started</h3>
                    <Link to="/Signup"><button className='signupbtn'>Signup</button></Link>
                </div>
            </div>
            <div>

            </div>
        </>
    )
}

export default Land