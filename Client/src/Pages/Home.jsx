import './Home.css';
import { Link } from 'react-router-dom';

function Home(){
    return(
        <>
            <nav>
                <div className='navbar'>
                    <h1 className='title'>Serenity Steps</h1>
                    <Link to="/About"><button className='aboutUs-btn'>About Us</button></Link>
                    <Link to="/Login"><button className='loginbtn'>Login</button></Link>
                </div> 
            </nav>
            <div className="continueprev">

            </div>
        </>
    )
}
export default Home