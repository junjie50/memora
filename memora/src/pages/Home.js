import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar.js';
import Image from '../assets/home_background.png';
import Footer from '../components/footer.js';
import CountrySelect from "../components/Autocomplete.js"
import { useNavigate } from "react-router-dom";
import './Home.css'
import { formatGuest } from '../utils/HomeUtils.js';
import {retrieveHotelsByDestinationID} from '../services/ascenda-api.js';

function Home(props) {
    const navigate = useNavigate();
    const [error, setError] = useState("");

    const handleClick = () => {
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);
        const checkinDate = new Date(checkin);
        const checkoutDate = new Date(checkout);

        if (!checkin || !checkout || !selectedCountry) {
            setError("All fields must be filled in");
            return;
        }
        if (checkoutDate <= checkinDate) {
            setError("Check-out date must be after check-in date");
            return;
        }
        if (checkinDate < currentDate || checkoutDate < currentDate) {
            setError("Dates cannot be earlier than the current date");
            return;
        }
        setError("");
        const guests = formatGuest(rooms, parent, children);
        const state = {
            checkin,
            checkout,
            parent,
            children,
            countryUID,
            selectedCountry,
            rooms,
            hotelDuration,
            guests
        }
        sessionStorage.setItem("homeForm", JSON.stringify(state));
        navigate("/hotelListings", {
            state: state
        });
    };

    // States
    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    const [children, setChildren] = useState(1);
    const [parent, setParent] = useState(2);
    const [checkin, setCheckin] = useState("");
    const [checkout, setCheckout] = useState("");
    // Calculate initial hotel duration
    const initialDuration = (new Date(checkout) - new Date(checkin)) / (1000 * 60 * 60 * 24);

    const [rooms, setRooms] = useState(1);
    const [showPax, setShowPax] = useState(false);
    const [countryUID, setCountryUID] = useState("");
    const [selectedCountry, setSelectedCountry] = useState("");
    const [hotelDuration, setHotelDuration] = useState(initialDuration);

    const handleCountrySelect = (uid, label) => {
        setCountryUID(uid);
        retrieveHotelsByDestinationID(uid);
        setSelectedCountry(label);
    };

    const handleMinusAdult = () => {
        if(parent > 1) {
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

    useEffect(() => {
        if (checkin && checkout) {
            console.log(checkin, checkout);
            const checkinDate = new Date(checkin);
            const checkoutDate = new Date(checkout);
            const duration = (checkoutDate.getTime() - checkinDate.getTime()) / (1000* 60 * 60 * 24); // Convert milliseconds to days
            setHotelDuration(duration);
            console.log("Hotel duration (nights):", duration);
        }
    }, [checkin, checkout])

    const handleCheckInChange = (event) => {
        const target = event.target;
        setCheckin(target.value);
    }

    const handleCheckOutChange = (event) => {
        const target = event.target;
        setCheckout(target.value);
    }

    const handleAddRoom = () => {
        setRooms(rooms+1);
    }
    
    const handleMinusRoom = () => {
        if(rooms > 1) {
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
                    <CountrySelect id="country-select-demo" onCountrySelect={handleCountrySelect} />
                    </div>
                </div>
                <div className="form-container-input-container">
                    <input type="date" aria-label="checkin" className="datepicker-input" value={checkin} onChange={handleCheckInChange}/>
                </div>
                <div className="form-container-input-container">
                    <input type="date" aria-label="checkout" className="datepicker-input" value={checkout} onChange={handleCheckOutChange}/>
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
                                        <button onClick={handleMinusAdult} className="pax-button" data-testid="minus-adult-button">
                                        minus
                                        </button>
                                    </div>
                                    <div className='flex-item'> 
                                        <div className="pax-result" data-testid="adult-count">
                                            {parent}
                                        </div>
                                    </div>
                                    <div className='flex-item'>
                                        <button onClick={handleAddAdult} className="pax-button" data-testid="plus-adult-button">
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
                                        <button onClick={handleMinusChildren} className="pax-button" data-testid="minus-children-button">
                                            minus
                                        </button>
                                    </div>
                                    <div className='flex-item' data-testid="children-count">
                                        {children}
                                    </div>
                                    <div className='flex-item'>
                                        <button onClick={handleAddChildren} className="pax-button" data-testid="plus-children-button">
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
                                        <button onClick={handleMinusRoom} className="pax-button" data-testid="minus-room-button">
                                            minus
                                        </button>
                                    </div>
                                    <div className='flex-item' data-testid="room-count">
                                        {rooms}
                                    </div>
                                    <div className='flex-item'>
                                        <button onClick={handleAddRoom} className="pax-button" data-testid="plus-room-button">
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
                <div className="error-message-container">
                    {error && <div className="error-message">{error}</div>}
                </div>
            </div>
            <div className="activities-carousell">
            </div>
            <Footer />
        </div>
    );
}

export default Home;