import Navbar from '../components/Navbar.js';
import Image from '../assets/home_background.png';
import Footer from '../components/footer.js';
import { useNavigate } from "react-router-dom";
import './Home.css'

function Home() {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate("hotelListings")
    };
  return (
    <div className="container">
        <Navbar />
        <div className="post-container">                
            <div className="post-content">
            <header>
                <h1>Memora</h1>
                <h2>Hotels</h2>
                <h2>specifically</h2>
                <h2>picked out</h2>
                <h2>for you</h2>
            </header>
                
            </div>
            <div className="post-thumb"><img className="home-image" src={Image} alt="View of the amazing Santorini."/></div>
        </div>
        <div className="form-container">
            <form> 
                <div className="form-container-input-container"> 
                    <div className="align-in-container">
                        <div className="form-container-tag">
                            Location
                        </div>
                        <input type="text" 
                            id="firstName" 
                            name="firstName" 
                            placeholder="Your first name"
                            className="form-container-input" required /> 
                        </div>
                </div>
                <div className="form-container-input-container"> 
                    <div className="date-container">
                        <div className="date-container-tag">
                                Check in
                        </div>
                        <input type="date" className="datepicker-input" />
                    </div>
                    <div className="date-container">
                        <div className="date-container-tag">
                                Check out
                        </div>
                        <input type="date" className="datepicker-input" />
                    </div>
                </div>
                <div className="form-container-input-container"> 
                    <button type="submit" 
                        className="form-container-button" onClick={handleClick}> 
                        Search 
                    </button> 
                </div>
            </form> 
        </div>
        <Footer />
    </div>
  );
}

export default Home;
