import './Home.css';
import { Link } from 'react-router-dom';


function Home(){
    return(
        <>
            <nav>
                <div className='navbar'>
                    <h1 className='title'>Serenity Steps</h1>
                    <Link to="/About"><button className='aboutUs-btn'>About Us</button></Link>
                    <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
                    
                </div> 
            </nav>
            <div className="continueprev">
                <div className="prevsection">
                    <h2>Serenity Steps is an integrated wellness platform that fosters the well-being by connecting meditation, mental health, physical fitness, and diet planning.It will provide the users with individualised advice and resources to help them maintain a healthy, balanced lifestyle.</h2>
                </div>      
            </div>
            <div className='sssection'>
                <div className="homeblock" >
                    <div className='homebox'>
                        <div className="img"><img src="/image.png" alt="" className='homebox-logo' /></div>
                        <a href="/meditate" className='home-btn'>Start Session</a>
                    </div>
                </div>
                <div className="homeblock">
                    <div className='homebox'><img src="/mind.png" alt="" className='homebox-logo' /><a href="/games" className="home-btn">Play Games</a></div>
                </div>
                <div className="homeblock">
                    <div className='homebox'><img src="/fit.png" alt="" className='homebox-logo'/>
                        <a href="/workout" className="home-btn">Coming Soon</a>
                    </div>
                </div>
                <div className="homeblock">
                    <div className='homebox'><img src="/diet.png" alt="" className='homebox-logo' /><a href="" className="home-btn">Coming Soon</a></div>
                </div>
                
            </div>
            <footer>
                <div>

                </div>
            </footer>
        </>
    )
}
export default Home