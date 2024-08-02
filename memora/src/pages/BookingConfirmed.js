import Navbar from '../components/Navbar.js';
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import React,{ useState,useEffect } from 'react';
import './BookingConfirmed.css';
import checkBoxImage from '../assets/check_box.png';
import axios from 'axios';
import { getCookie, submitBookingDetails,useCheckAuthentication  } from '../services/BookingForm.js';

function BookingPageConfirmed() {
    const navigate = useNavigate();
    const location = useLocation();
    const [formData, setFormData] = useState(null);
    const [roomDetails, setRoomDetails] = useState(null);
    const [bookingPageLoggedInForm, setBookingPageLoggedInForm] = useState(null);
    const { authenticated, user } = useCheckAuthentication();

    useEffect(() => {
        const token = getCookie('token');
        const storedData = sessionStorage.getItem('bookingForm');
        if (storedData) {
            setRoomDetails(JSON.parse(storedData));
            console.log('Room Details:', roomDetails); // Debugging line
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
        const token = localStorage.getItem('token');
        if (!token) {
            alert('User not authenticated. Please log in.');
            navigate('/login');
            return;
        }

        const bookingData = {
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

        await submitBookingDetails(bookingData, token, user?.id, navigate);
        
        if (!formData) {
            return <div>Loading...</div>;
        }


    };

    return (
        <div className="container">
            <Navbar />
            
            <div className="WholeContainter">
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
                    
                    <hr className="DashedLine"></hr>

                    <div className="CheckInAndOutContainer"> 
                        <div className="CheckInAndOutBar"> 
                            <p className="CheckInBar">Check in:</p>
                            <p className="CheckInDate">{roomDetails?.checkin}</p>
                        </div>
                        <div className="CheckInAndOutBar"> 
                            <p className="CheckOutBar">Check out:</p>
                            <p className="CheckOutDate">{roomDetails?.checkout}</p>
                        </div>
                        
                        <p className="NoOfNightsLabel">{roomDetails?.hotelDuration} night(s)</p>
                    </div>

                    <div className="TotalPaymentContainer"> 
                        <div className="TotalBar">
                            <p className="TotalText">Total</p>
                            <p className="TotalSGD">SGD {roomDetails?.totalPrice?.toFixed(2)}</p>
                        </div>
                        <p className="IncludeTaxSentence">Includes tax recovery charges and service fees</p>
                    </div>
                </div>

                <div className="CancellationPolicyBar"> 
                    <div className="AgreementBar">
                        <input className='CheckBoxBar' data-testid="agreementCheckbox" type="checkbox" required/>
                        <p className="AgreeCancellationBar">I agree to the Cancellation Policy and NAME's Terms of Use, Privacy Policy and promotions Terms and Conditions (if applicable).</p>
                    </div>
                    <p className="UponClicking">Upon clicking the confirm booking button, payment will be processed and your booking be confirmed. </p>
                    <button type="submit" className="ConfirmBooking" onClick={handleSubmitBooking}>Confirm Booking</button>
                </div>

            </div>
        </div>
    );
}

export default BookingPageConfirmed;