import Navbar from '../components/Navbar.js';
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';
// import React,{ useState } from 'react';
import React from 'react';
import './BookingConfirmed.css';
import checkBoxImage from '../assets/check_box.png';


function BookingPageConfirmed() {
    const navigate = useNavigate();
    const location = useLocation();
    // const formData = location.state || {};
    const {
        formData,
        hotelName,
        roomDetails,
        checkin,
        checkout,
        parent,
        children
      } = location.state || {};

    // const [customerLastName, setCustomerLastName] = useState("John");
    // const [customerFirstName, setCustomerFirstName] = useState("Doe");
    // const [customerGender, setCustomerGender] = useState("Mr");
    // const [customerMemberId, setCustomerMemberId] = useState("000000000");
    // const [hotelName, setHotelName] = useState("Fullerton Hotel");
    // const [roomType, setRoomType] = useState("Double Premier Room + Free Wifi Breakfast included");
    // const [checkInDate, setCheckInDate] = useState("05/06/2024");
    // const [checkOutDate, setcheckOutDate] = useState("05/07/2024");

    const handleClick = (event) => {
        event.preventDefault();
        navigate("/bookingCompleted", {
        // navigate("/testBookingCompleted", {
            state:{
                // customerLastName:formData.customerLastName,
                // customerFirstName:formData.customerFirstName,
                // customerGender: "Mr",
                // customerMemberId: formData.customerMemberId,
                // hotelName: "Fullerton Hotel",
                // roomType: "Double Premier Room + Free Wifi Breakfast included",
                // checkInDate: "05/06/2024",
                // checkOutDate: "05/07/2024"

                formData,
                hotelName,
                roomDetails,
                checkin,
                checkout,
                parent,
                children
            } 
        });
        // navigate("/test") 
    };


    return (
        <div className="container">
            <Navbar />
            
            <div class="WholeContainter">
                <div className="CheckBookingDetails">Check your booking details</div>

                <div className="BookingSummaryContainer">
                    <h2>Booking Summary</h2>
                    <p className="ForWhichUser">For Mr. {formData.customerLastName} {formData.customerFirstName} (MemberID: {formData.customerMemberId}),</p>
                    <div className="BookingSummaryBar"> 
                        <p className="HotelName">{hotelName}</p>
                        <p className="RoomType">{roomDetails.name}</p>
                    </div>

                    <div className="NoOfRoomAndPeopleBar"> 
                        <p className="NoOfRoom">1 Room</p>
                        <p className="NoOfPeoplePerRoom">{parent} Adults, {children} Children</p>
                    </div>
                    
                    <hr class="DashedLine"></hr>

                    <div className="CheckInAndOutContainer"> 
                        <div class="CheckInAndOutBar"> 
                            <p class="CheckInBar">Check in:</p>
                            <p class="CheckInDate">{checkin}</p>
                        </div>
                        <div class="CheckInAndOutBar"> 
                            <p class="CheckOutBar">Check out:</p>
                            <p class="CheckOutDate">{checkout}</p>
                        </div>
                        
                        <p class="NoOfNightsLabel">3 Nights</p>
                    </div>

                    <div className="TotalPaymentContainer"> 
                        <div class="TotalBar">
                            <p class="TotalText">Total</p>
                            <p class="TotalSGD">SGD {roomDetails.price.toFixed(2)}</p>
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
                    <button type="submit" className="ConfirmBooking" onClick={handleClick}>Confirm Booking</button>
                </div>



            </div>
        </div>
    );
}

export default BookingPageConfirmed;