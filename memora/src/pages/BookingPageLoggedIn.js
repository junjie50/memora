import Navbar from '../components/Navbar.js';
import { useNavigate } from "react-router-dom";
import './BookingPageLoggedIn.css';
import { useLocation } from 'react-router-dom';
import React,{ useState,useEffect } from 'react';
import axios from 'axios';
import {
    getCookie,
    useCheckAuthentication
} from '../services/BookingForm.js';


const BookingPageLoggedIn = () => { //need to judge whether user already login in or not, if not, redirect to loginPage, need details from viewHotelDetailsForm
    const location = useLocation();
    const navigate = useNavigate(); //Purpose: useNavigate is a hook from the react-router-dom library. It provides a function that allows navigation to different routes programmatically within your application.
    //bookingForm
    const [roomDetails, setRoomDetails] = useState(null);
    //combine bookingform and current page formdata for booking
    const [bookingPageLoggedInForm, setBookingPageLoggedInForm] = useState(null);
    const { authenticated, user } = useCheckAuthentication();
    
    useEffect(() => {
        // const token = getCookie('token');
        // if (token) {
        //     // axios.get(`/api/users/${token}`)
        //     //     .then(response => {
        //     //         // setUser(response.data);
        //     //         setAuthenticated(true);
        //     //     })
        //     //     .catch(error => {
        //     //         console.error('Authentication failed', error);
        //     //         setAuthenticated(false);
        //     //         navigate("/login"); // Redirect to login page if not authenticated
        //     //     });
        //     const authenticated = useCheckAuthentication();
        //     if (!authenticated) {
        //         navigate("/login")
        //     }
        // } else {
        //     navigate("/login"); // Redirect to login page if no token
        // }

        const bookingForm = sessionStorage.getItem('bookingForm');
        //set combined sessionStorage
        setBookingPageLoggedInForm(bookingForm);

        if (bookingForm) {
            setRoomDetails(JSON.parse(bookingForm));
            console.log('total price',roomDetails?.totalPrice?.toFixed(2));
            console.log('Room Details:', roomDetails); // Debugging line
        } else {
            navigate("/hotelListings");
        }
    }, [navigate]);

    // const { room, hotelName, checkin, checkout, parent, children } = location.state || {};
    const [formData, setFormData] = useState({ //setFormData, used to update the 'formData'
        //all of them are keys
        customerMemberId: '',
        customerFirstName: '',
        customerLastName: '',
        areaNo: '',
        teleNo: '',
        emailNo: '',
        specialRequestText: '',
        creditCardNumber: '',
        cardHolderName: '',
        billingAddress: '',
        postalCode: '',
        countryName: '',
        validUntill: '',
        cvcNo: ''
    });

    //set form data
    const handleChange = (e) => { //ensure id the same with the value (user input)!!!
        const { id, value } = e.target; //id is the id attribute of the input element, and value is the current value of the input element.
        setFormData(prevState => ({
            ...prevState, //? The spread operator ...prevState ensures that the other keys in the state object remain unchanged.
            [id]: value //It returns a new state object where the key corresponding to the id of the input element is updated with the new value. 
        }));
    };

    //combine data together
    const handleSubmit = () =>{
        const bookingLoggedInData = {
            ...formData,
            roomDetails:roomDetails
        };
        //combined to a sessionStorage
        sessionStorage.setItem('bookingPageLoggedInForm', JSON.stringify(bookingLoggedInData));
        setBookingPageLoggedInForm(bookingLoggedInData);

        // Navigate to the booking confirmed page
		navigate("/bookingConfirmed", {});
    }
    
    const handleClick_editbooking = (hotel_id) => {
        const hotelListingForm = sessionStorage.getItem('hotelListingForm');
        if(hotelListingForm){
            const state = JSON.parse(hotelListingForm);
            navigate(`/ViewHotelDetails/${state.hotel_id}`, {
                state: state
            });
        }
    };

    return (
    
        <div className="container">
            <Navbar />
            <div className="WholeContainter">

                <div className="BookHotelBar">
                    Book Hotel
                </div>

                <div className='DetailsContainer'>
                    <div className="PersonalDetailContainer">
                        <h1 className='PersonalDetailText'> Personal Details</h1>
                        <div className="BoxContainers">
                            <div className="FirstRowBar">
                                <input type="hiden" data-testid="customerMemberId" id="customerMemberId" placeholder="Member Id" className="container_box" value={'Member ID ('+user?.id + ')'} /> 
                                <input type="hiden" data-testid="customerFirstName" id="customerFirstName" placeholder="john" className="container_box"  value={user?.title}/> 
                                <input type="hiden" data-testid="customerLastName" id="customerLastName" placeholder="doe" className="container_box"  value={user?.lastName} /> 
                            </div>
                            <div className="SecondRowBar">
                                {/* <input type="hiden" data-testid="areaNo" id="areaNo" placeholder="+65" className="container_box" value={user?.lastName}/>  */}
                                <input type="hiden" data-testid="address" id="address" className="container_box" value={user?.address}/> 
                                <input type="hiden" data-testid="teleNo" id="teleNo" placeholder="12345678" className="container_box" value={user?.phoneNumber} /> 
                            </div>
                            <div className="ThirdRowBar">
                                <input type="hiden" data-testid="emailNo" id="emailNo" placeholder="johndoe@gmail.com" className="container_box" value={user?.email}/> 

                            </div>
                        </div>

                        <h2 className='SpecialRequestText'> Special Request(s)</h2>
                        <input type="text" data-testid="specialRequestText" id="specialRequestText" placeholder="Please note requests are passed to the hotel and are 
                            not guaranteed." className="request_box" required onChange={handleChange} value={formData.specialRequestText}/> 
                    </div>



                    <div className="PaymentInformationContainer">
                        <h1>Payment Information</h1>
                        <div className="pBoxContainers">
                            
                            <div className="pFirestRowBar">
                                <input type="text" id="creditCardNumber" placeholder="Credit Card Number" className="container_box" onChange={handleChange} value={formData.creditCardNumber}/> 
                            </div>
                            <div className="pSecondRowBar">
                                <input type="text" id="cardHolderName" placeholder="Card Holder" className="container_box" required onChange={handleChange} value={formData.cardHolderName} /> 
                            </div>
                            <div className="pThirdRowBar">
                                <input type="text" id="billingAddress" placeholder="Billing Address" className="container_box" required onChange={handleChange} value={formData.billingAddress}/> 
                            </div>
                            <div className="pFourthRowBar">
                                <input type="text" id="postalCode" placeholder="Postal Code" className="container_box" required onChange={handleChange} value={formData.postalCode}/> 
                            </div>
                            <div className="pFifthRowBar">
                                <input type="text" id="countryName" placeholder="Country" className="container_box" required onChange={handleChange} value={formData.countryName}/> 
                            </div>
                            <div className="pSixthRowBar">
                                <input type="text" id="validUntill" placeholder="Valid Till" className="container_box" required onChange={handleChange} value={formData.validUntill}/> 
                                <input type="text" id="cvcNo" placeholder="CVC" className="container_box" required onChange={handleChange} value={formData.cvcNo}/> 
                            </div>
                        </div>

                        {/* <button type="submit" className="ProceedBookingSummary" onClick={handleClick}>Proceed to Booking Summary</button> */}
                        <button type="submit" className="ProceedBookingSummary" onClick={handleSubmit}>Proceed to Booking Summary</button>


                    </div>

                    <div className="BookingSummaryContainerLI">
                        <h2>Booking Summary</h2>

                        <div className="BookingSummaryBar"> 
                            <p className="HotelName">{roomDetails?.hotelName}</p>
                            <p className="RoomType">Room Facility Needed (depending)</p>
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
                                {/* <p class="TotalSGD">SGD {roomDetails?.roomBooking[0]?.price.toFixed(2)}</p> */}
                                {/* SGD {roomDetails?.roomBooking?.reduce((total, room) => total + room.price, 0).toFixed(2)} */}


                            </div>
                            <p className="IncludeTaxSentence">Includes tax recovery charges and service fees</p>
                            <button type="submit" className="EditBookingBar" onClick={handleClick_editbooking}>Edit Booking</button>
                        </div>
                    </div>
                </div>
                

            </div>
        </div>
    );
}
  
export default BookingPageLoggedIn;