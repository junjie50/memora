import React, { useState } from 'react';
import Navbar from '../components/Navbar.js';
import Image from '../assets/home_background.png';
import Footer from '../components/footer.js';
import CountrySelect from "../components/Autocomplete.js"
import { useNavigate } from "react-router-dom";
import { retrieveAvailableHotels,retrieveAvailableHotelRooms,retrieveHotelsByDestinationID, retrieveStaticHotelDetailByHotelID} from '../services/ascenda-api.js';
import './Home.css'

function Home(props) {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate("/hotelListings", {
            state: {
                checkin,
                checkout,
                parent,
                children,
                searchTerm
            }
        });
    };

    // States
    const [searchTerm, setSearchTerm] = useState('WD0M');
    const [children, setChildren] = useState(1);
    const [parent, setParent] = useState(2);
    const [checkin, setCheckin] = useState("2024-07-05");
    const [checkout, setCheckout] = useState("2024-07-05");
    const [rooms, setRooms] = useState(1);
    const [showPax, setShowPax] = useState(false);

    const handleMinusAdult = () => {
        if(parent > 0) {
            setParent(parent - 1);
        }
    };

    const handleAddAdult = () => {
        if(parent < 20) {
            setParent(parent + 1);
        }
    };

    const handleMinusChildren = () => {
        if(children > 0) {
            setChildren(children - 1);
        }
    };

    const handleAddChildren = () => {
        if(children < 20) {
            setChildren(children + 1);
        }
    };

    const handleCheckInChange = (event) => {
        const target = event.target;
        setCheckin(target.value);
        console.log(target.value);
    }

    const handleCheckOutChange = (event) => {
        const target = event.target;
        setCheckout(target.value);
        console.log(target.value);
    }

    const handleAddRoom = () => {
        setRooms(rooms+1);
    }
    
    const handleMinusRoom = () => {
        if(rooms > 0) {
            setRooms(rooms-1);
        }
    }
    

    const handlePaxClick = () => {
        setShowPax(!showPax);
    }

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
                    <input type="date" className="datepicker-input" value={checkin} onChange={handleCheckInChange}/>
                </div>
                <div className="form-container-input-container">
                    <input type="date" className="datepicker-input" value={checkout} onChange={handleCheckOutChange}/>
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
                                <div className='display-item-input-container'>

                                    <div className='flex-item'>
                                        <button onClick={handleMinusAdult} className="pax-button">
                                        minus
                                        </button>
                                    </div>
                                    <div className='flex-item'> 
                                        <div className="pax-result">
                                            {parent}
                                        </div>
                                    </div>
                                    <div className='flex-item'>
                                        <button onClick={handleAddAdult} className="pax-button">
                                            plus
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="display-item-container">
                                <div className='display-item-name'>
                                    Children
                                </div>
                                <div className='display-item-input-container'>
                                    <div className='flex-item'>
                                        <button onClick={handleMinusChildren} className="pax-button">
                                            minus
                                        </button>
                                    </div>
                                    <div className='flex-item'>
                                        {children}
                                    </div>
                                    <div className='flex-item'>
                                        <button onClick={handleAddChildren} className="pax-button">
                                            plus
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="display-item-container">
                                <div className='display-item-name'>
                                    Rooms
                                </div>
                                <div className='display-item-input-container'>
                                    <div className='flex-item'>
                                        <button onClick={handleMinusRoom} className="pax-button">
                                            minus
                                        </button>
                                    </div>
                                    <div className='flex-item'>
                                        {rooms}
                                    </div>
                                    <div className='flex-item'>
                                        <button onClick={handleAddRoom} className="pax-button">
                                            plus
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="display-done-input-container">
                                <div className='display-item-name'></div>
                                <div className='flex-item'></div>
                                <div className='flex-item'>
                                    <button className="pax-button" onClick={handlePaxClick}>
                                        Done
                                    </button>
                                </div>
                                <div className='flex-item'></div>
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
