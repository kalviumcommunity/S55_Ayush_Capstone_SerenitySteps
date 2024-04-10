import './AboutUs.css'
import { Link } from 'react-router-dom';
function AboutUs(){

    return(
        <>
            <nav>
                <div className='navbar'>
                    <Link to="/" className='title'><h1>Serenity Steps</h1></Link>
                    <Link to="/Signup"><button className='signUpbtn'>Signup</button></Link>
                    <Link to="/Login"><button className='loginbtn'>Login</button></Link>
                </div>  
            </nav>
            <div className='AboutUs-container'>
                <div className='au-container'>
                    <h1 className='info'>Serenity Steps is a integrated wellness platform that fosters the well-being by connecting meditation, mental health, physical fitness, and diet planning.It will provide the users with individualised advice and resources to help them maintain a healthy, balanced lifestyle.</h1>
                </div>
            </div>

        </>
    )
}
export default AboutUs