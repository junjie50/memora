import React, { useState } from 'react';
import Navbar from '../components/Navbar.js';
import Image from '../assets/home_background.png';
import Footer from '../components/footer.js';
import CountrySelect from "../components/Autocomplete.js"
import { useNavigate } from "react-router-dom";
import './Home.css'

function Home() {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate("hotelListings")
    };

    // States
    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState([]);

    const items = [
        "Singapore", "Malaysia"
      ];

    const handleSearch = (event) => {
        const value = event.target.value;
        setSearchTerm(value);

        const searchResults = items.filter(item =>
            item.toLowerCase().includes(value.toLowerCase())
        );
        setResults(searchResults);
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
                    <div className="form-container-input">
                        <CountrySelect />
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
