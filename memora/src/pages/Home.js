import React, { useState } from 'react';
import Navbar from '../components/Navbar.js';
import Image from '../assets/home_background.png';
import Footer from '../components/footer.js';
import CountrySelect from "../components/Autocomplete.js"
import { useNavigate } from "react-router-dom";
import { retrieveAvailableHotels,retrieveAvailableHotelRooms,retrieveHotelsByDestinationID, retrieveStaticHotelDetailByHotelID} from '../services/ascenda-api.js';
import './Home.css'

function Home() {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate("hotelListings", {
            checkin:checkin,
            checkout:checkout,
            parent:parent,
            children:children,
            results:results,
            searchTerm:searchTerm
        })
    };

    const handlePaxClick = () => {
        setShowPax(!showPax);
        retrieveAvailableHotels("WD0M", "2024-10-01", "2024-10-07", "en_US", "SGD", "SG", "2", "1").then((response) => {
            console.log(JSON.stringify(response));
        });

        retrieveAvailableHotelRooms("diH7", "WD0M", "2024-10-01", "2024-10-07", "en_US", "SGD", "SG", "2", "1").then((response) => {
            console.log(JSON.stringify(response));
        });

        retrieveHotelsByDestinationID("0Tki").then((response) => {
            console.log(JSON.stringify(response));
        });

        retrieveStaticHotelDetailByHotelID("diH7").then((response) => {
            console.log(JSON.stringify(response));
        });
    }

    // States
    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState([]);
    const [children, setChildren] = useState(0);
    const [parent, setParent] = useState(2);
    const [checkin, setCheckIn] = useState("05/06/2024");
    const [checkout, setCheckOut] = useState("05/07/2024");
    const [showPax, setShowPax] = useState(false);
    

    const items = [
        "Singapore", "Malaysia"
      ];

  return (
    <div>
        <Navbar />
        <div className="home-container">
            <div className="post-container">                
                <div className="post-content">
                    <header className="post-content">
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
                <div className="form-container-input-container"> 
                    <div className="form-container-input">
                        <CountrySelect />
                    </div>
                </div>
                <div className="form-container-input-container">
                    <input type="date" className="datepicker-input" />
                </div>
                <div className="form-container-input-container">
                    <input type="date" className="datepicker-input" />
                </div>
                <div className="form-container-input-container">
                    <button onClick={handlePaxClick} className='form-container-button'> 
                        Person
                    </button>
                    {showPax && 
                        <div className="display-container">
                            <div className="display-item-container">
                                <div className='display-item-name'>
                                    Adults
                                </div>
                                <div>
                                    <button>
                                        minus
                                    </button>
                                    <button>
                                        plus
                                    </button>
                                </div>
                            </div>
                            <div className="display-item-container">
                                <div className='display-item-name'>
                                    Children
                                </div>
                                <div>
                                    <button>
                                        minus
                                    </button>
                                    <button>
                                        plus
                                    </button>
                                </div>
                            </div>
                            <div className="display-item-container">
                                <div className='display-item-name'>
                                    Rooms
                                </div>
                                <div>
                                    <button>
                                        minus
                                    </button>
                                    <button>
                                        plus
                                    </button>
                                </div>
                            </div>
                            <div className="display-item-container">
                                <button className="display-item-name">
                                    Done
                                </button>
                            </div>
                        </div>
                    }
                </div>

                <div className="form-container-input-container"> 
                    <button type="submit" 
                        className="form-container-button" onClick={handleClick}> 
                        Search 
                    </button> 
                </div>
            </div>
            
        </div>
        <div className="activities-carousell">

        </div>
        <Footer />
    </div>
  );
}

export default Home;
