import Navbar from '../components/Navbar.js';
import { useLocation } from 'react-router-dom';
import React,{ useState,useEffect } from 'react';
import './BookingCompleted.css';
import axios from 'axios';
import { getCookie, useCheckAuthentication  } from '../services/BookingForm.js';

function BookingCompleted() {
    const location = useLocation();
    const [roomDetails, setRoomDetails] = useState(null);
    // const [user, setUser] = useState(null);
    // const [authenticated, setAuthenticated] = useState(false);
    const { authenticated, user } = useCheckAuthentication();

    useEffect(() => {
        // const token = getCookie('token');
        // if (token) {
        //     axios.get(`/api/users/${token}`)
        //         .then(response => {
        //             setUser(response.data);
        //             setAuthenticated(true);
        //         })
        //         .catch(error => {
        //             console.error('Authentication failed', error);
        //             setAuthenticated(false);
        //         });
        // } else {
        // }

        const storedData = sessionStorage.getItem('bookingForm');
        if (storedData) {
            setRoomDetails(JSON.parse(storedData));
        } else {
            console.error('No form data found in sessionStorage');
        }

    }, []);

    return (
        <div className="container">
            <Navbar />
            
            <div class="WholeContainter">
                <div className='TextBar'>
                    <h1>Booking Completed!</h1>
                    <p>Booking ID: 9172381249</p>
                    <p>A pdf version of your booking have been sent to your email.</p>
                    <p>Thank you for choosing us for your stay.</p>
                </div>
                

                <div className="BookingSummaryContainer">
                    <h2>Booking Summary</h2>
                    <p className="ForWhichUser">{user?.title}. {user?.firstName} {user?.lastName}, (MemberID: {user?.id})</p>
                    <div className="BookingSummaryBar"> 
                        <p className="HotelName">{roomDetails?.hotelName}d</p>
                        <p className="RoomType">Room Type Needed (depening)</p>
                    </div>

                    <div className="NoOfRoomAndPeopleBar"> 
                        <p className="NoOfRoom">{roomDetails?.rooms} Room(s)</p>
                        <p className="NoOfPeoplePerRoom">{roomDetails?.parent} Adults, {roomDetails?.children} Children</p>
                    </div>
                    
                    <hr class="DashedLine"></hr>

                    <div className="CheckInAndOutContainer"> 
                        <div class="CheckInAndOutBar"> 
                            <p class="CheckInBar">Check in:</p>
                            <p class="CheckInDate">{roomDetails?.checkin}</p>
                        </div>
                        <div class="CheckInAndOutBar"> 
                            <p class="CheckOutBar">Check out:</p>
                            <p class="CheckOutDate">{roomDetails?.checkout}</p>
                        </div>
                        
                        <p class="NoOfNightsLabel">{roomDetails?.hotelDuration} night(s)</p>
                    </div>

                    <div className="TotalPaymentContainer"> 
                        <div class="TotalBar">
                            <p class="TotalText">Total</p>
                            <p class="TotalSGD">SGD {roomDetails?.totalPrice?.toFixed(2)}</p>
                        </div>
                        <p className="IncludeTaxSentence">Includes tax recovery charges and service fees</p>
                    </div>
                </div>

            </div>
        </div>
    );
}
  
export default BookingCompleted;
  