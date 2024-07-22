import Navbar from '../components/Navbar.js';
import { useLocation } from 'react-router-dom';
import React,{ useState,useEffect } from 'react';
import './BookingCompleted.css';
import axios from 'axios';

function getCookie(name) { //need to put in service
    const value = `; ${document.cookie}`; //retrieves all cookies stored in the document as a single string. document.cookie returns a string of all cookies, each separated by a semicolon and a space. By adding a leading semicolon and space (; ), the function ensures that even the first cookie in the list will be matched correctly in the next step.
    const parts = value.split(`; ${name}=`); // splits the value string into an array of substrings
    if (parts.length === 2) return parts.pop().split(';').shift(); //If the parts array has exactly two elements, it means the target cookie exists in the document. The length will be 2 if the split operation finds exactly one occurrence of ; 
    //parts.pop() retrieves the last element of the parts array, which contains the cookie's value and possibly other cookies following it.
    return null; //if the Cookie is Not Found:
}

async function getUserInfo(token){ //need integrate
    const response = await axios.get(`http://localhost:5001/api/users/${token}`);
    return response.data;
}

function BookingCompleted() {
    const location = useLocation();
    const [roomDetails, setRoomDetails] = useState(null);
    const [user, setUser] = useState(null);
    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {
        const token = getCookie('token');
        if (token) {
            axios.get(`/api/users/${token}`)
                .then(response => {
                    setUser(response.data);
                    setAuthenticated(true);
                })
                .catch(error => {
                    console.error('Authentication failed', error);
                    setAuthenticated(false);
                });
        } else {
        }

        const storedData = sessionStorage.getItem('bookingForm');
        if (storedData) {
            setRoomDetails(JSON.parse(storedData));
        } else {
            console.error('No form data found in sessionStorage');
        }

    }, []);
    

    // const {
    //     customerLastName
    //     customerFirstName,
    //     customerGender,
    //     customerMemberId,
    //     hotelName,
    //     roomType,
    //     checkInDate,
    //     checkOutDate
    // } = location.state || {};

    // const formData = location.state || {};

    // const {
    //     formData,
    //     hotelName,
    //     roomDetails,
    //     checkin,
    //     checkout,
    //     parent,
    //     children
    //   } = location.state || {};

    return (
        <div className="container">
            <Navbar />
            
            <div class="WholeContainter">
                <div className='TextBar'>
                    <h1>Booking Confirmed!</h1>
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
  