import Navbar from '../components/Navbar.js';
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import React,{ useState,useEffect } from 'react';
import './BookingConfirmed.css';
import checkBoxImage from '../assets/check_box.png';
import axios from 'axios';

function getCookie(name) { //need to put in service
    const value = `; ${document.cookie}`; //retrieves all cookies stored in the document as a single string. document.cookie returns a string of all cookies, each separated by a semicolon and a space. By adding a leading semicolon and space (; ), the function ensures that even the first cookie in the list will be matched correctly in the next step.
    const parts = value.split(`; ${name}=`); // splits the value string into an array of substrings
    if (parts.length === 2) return parts.pop().split(';').shift(); //If the parts array has exactly two elements, it means the target cookie exists in the document. The length will be 2 if the split operation finds exactly one occurrence of ; 
    //parts.pop() retrieves the last element of the parts array, which contains the cookie's value and possibly other cookies following it.
    return null; //if the Cookie is Not Found:
}

async function getUserInfo(token){ //need to integrate
    const response = await axios.get(`http://localhost:5001/api/users/${token}`);
    return response.data;
}

function BookingPageConfirmed() {
    const navigate = useNavigate();
    const location = useLocation();
    const [authenticated, setAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const [formData, setFormData] = useState(null);
    const [token, setToken] = useState(null); // Add state for token
    const [roomDetails, setRoomDetails] = useState(null);
    const [bookingPageLoggedInForm, setBookingPageLoggedInForm] = useState(null);

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
                    navigate("/login"); // Redirect to login page if not authenticated
                });
        } else {
            navigate("/login"); // Redirect to login page if no token
        }

        const storedData = sessionStorage.getItem('bookingForm');
        if (storedData) {
            setRoomDetails(JSON.parse(storedData));
        } else {
            console.error('No form data found in sessionStorage');
        }

        //new added
        const combinedData = sessionStorage.getItem('bookingPageLoggedInForm');
        if(combinedData) {
            setBookingPageLoggedInForm(JSON.parse(combinedData));
        }


    }, [navigate]);
      

    const handleSubmitBooking = async (event) => {
        event.preventDefault();

        // if (!formData || !formData.roomDetails) {
        //     console.error('Incomplete form data');
        //     return;
        // }
        
        const token = localStorage.getItem('token');
        
        if (!token) {
            alert('User not authenticated. Please log in.');
            navigate('/login');
            return;
        }

        const bookingData = {
            // destinationID: roomDetails.countryUID,
            // totalPayment: formData.roomDetails.totalPrice,
            // creditCardNumber: formData.creditCardNumber,
            // cardExpiryDate: formData.validUntill,
            // cvc: formData.cvcNo,
            // specialRequest: formData.specialRequestText,
            // numberOfAdults: formData.roomDetails.parent,
            // numberOfChildren: formData.roomDetails.children,
            // numberOfNights: formData.roomDetails.hotelDuration, 
            // startDate: formData.roomDetails.startDate,
            // endDate: formData.roomDetails.endDate,
            // rooms: [roomDetails.id], // Ensure this is the correct format

            destinationID: roomDetails?.countryUID,
            totalPayment: roomDetails?.totalPrice?.toFixed(2),
            creditCardNumber: bookingPageLoggedInForm?.creditCardNumber,
            cardExpiryDate: bookingPageLoggedInForm?.validUntill,
            cvc: bookingPageLoggedInForm?.cvcNo,
            specialRequest: bookingPageLoggedInForm?.specialRequestText,
            numberOfAdults: roomDetails?.parent,
            numberOfChildren: roomDetails?.children,
            numberOfNights: roomDetails?.hotelDuration, 
            startDate: roomDetails?.checkin,
            endDate: roomDetails?.checkout,
            rooms: [roomDetails?.roomBooking], // Ensure this is the correct format            
        };

        try {
            const response = await axios.post('http://localhost:5001/api/bookings/', bookingData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'memberID': user?.id,
                    'Content-Type': 'application/json'
                }
            });
            // console.log(response.status);
            if (response.status === 201) {
                navigate("/bookingCompleted", {
                    state: {
                        formData
                        // hotelName,
                        // roomDetails,
                        // checkin,
                        // checkout,
                        // parent,
                        // children
                    }
                });
            } else {
                alert('Failed to complete booking. Please try again.');
            }

        } catch (error) {
            // console.log(token)
            // console.log([roomDetails?.roomBooking]);
            console.log(roomDetails?.totalPrice?.toFixed(2).toString());
            console.error('Booking failed:', error.toJSON());
            alert('An error occurred. Please try again.');
        }
        
        if (!formData) {
            return <div>Loading...</div>;
        }
    };


    return (
        <div className="container">
            <Navbar />
            
            <div class="WholeContainter">
                <div className="CheckBookingDetails">Check your booking details</div>

                <div className="BookingSummaryContainer">
                    <h2>Booking Summary</h2>
                    <p className="ForWhichUser">For {user?.title}. {user?.firstName} {user?.lastName}, (MemberID: {user?.id})</p>
                    <div className="BookingSummaryBar"> 
                        <p className="HotelName">{roomDetails?.hotelName}</p>
                        <p className="RoomType">Room Type Needed (depending)</p>
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

                <div className="CancellationPolicyBar"> 
                    <div class="AgreementBar">
                        <input className='CheckBoxBar' type="checkbox" required/>
                        <p class="AgreeCancellationBar">I agree to the Cancellation Policy and NAME's Terms of Use, Privacy Policy and promotions Terms and Conditions (if applicable).</p>
                    </div>
                    <p className="UponClicking">Upon clicking the Confirm Booking button, payment will be processed and your booking be confirmed. </p>
                    <button type="submit" className="ConfirmBooking" onClick={handleSubmitBooking}>Confirm Booking</button>
                </div>

            </div>
        </div>
    );
}

export default BookingPageConfirmed;