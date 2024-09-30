import './Games.css';
import { Link } from 'react-router-dom';


function Games(){
    return(
        <>
            <nav>
                <div className='navbar'>
                    <h1 className='title'>Serenity Steps</h1> 
                    <h1 className='sectionhead'>Mind Games</h1>
                    <Link to="/About"><button className='aboutUs-btn'>About Us</button></Link>
                    <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
                    
                </div> 
            </nav>
            <div className='sssection'>
                <div className="homeblock" >
                    <div className='homebox'>
                        <div className="img"><img src="/chess.webp" alt="" className='homebox-logo' /></div>
                        <a href="https://www.chess.com/" className='home-btn'>Play Chess</a>
                    </div>
                </div>
                <div className="homeblock">
                    <div className='homebox'><img src="/game2.jpeg" alt="" className='homebox-logo'/>
                        <a href="https://skribbl.io/" className="home-btn">Play Skribbl</a>
                    </div>
                </div>
                <div className="homeblock">
                    <div className='homebox'><img src="/" alt="" className='homebox-logo'/>
                        <a href="" className="home-btn">Coming Soon</a>
                    </div>
                </div>
                <div className="homeblock">
                    <div className='homebox'><img src="/" alt="" className='homebox-logo'/>
                        <a href="" className="home-btn">Coming Soon</a>
                    </div>
                </div>
                
                
            </div>

        </>
    )

}
export default Games