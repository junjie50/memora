import Navbar from '../components/Navbar.js';
import { useNavigate } from "react-router-dom";
import './BookingPageLoggedIn.css';
import { useLocation } from 'react-router-dom';
import React,{ useState,useEffect } from 'react';
import axios from 'axios';





const BookingPageLoggedIn = () => {
    const location = useLocation();

    const navigate = useNavigate(); //Purpose: useNavigate is a hook from the react-router-dom library. It provides a function that allows navigation to different routes programmatically within your application.
    //Usage: The navigate function can be called with a route path and state to redirect the user to that route. In this case, it's used to navigate to the /bookingConfirmed route after the form is submitted.
    

    const { roomDetails, hotelName, checkin, checkout, parent, children } = location.state || {};

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


    // useEffect(() => {
    //     const fetchMemberInfo = async () => {
    //         try {
    //             const res = await axios.post('http://localhost:5001/api/updateProfile', { email });
    //             setMemberInfo(res.data.member); //member from: res.json({ member });
    //         } catch (err) {
    //             console.error(err.message);
    //         }
    //     };

    //     if (email) {
    //         fetchMemberInfo();
    //     }
    // }, [email]);

    const handleChange = (e) => { //ensure id the same with the value (user input)!!!
        const { id, value } = e.target; //id is the id attribute of the input element, and value is the current value of the input element.
        setFormData(prevState => ({
            ...prevState, //? The spread operator ...prevState ensures that the other keys in the state object remain unchanged.
            [id]: value //It returns a new state object where the key corresponding to the id of the input element is updated with the new value. 
        }));
    };

    const handleSubmit = (event) =>{
        event.preventDefault(); // Prevent default form submission (reloading the page during form submission)
        //Default Form Submission: When a form is submitted, the browser reloads the page and sends the form data to the server.
        // navigate('/bookingConfirmed', {state: formData}); //pass formData state as the state of the route, allow /bookingConfirmed access the submitted form data
    
        navigate('/bookingConfirmed', {
            state: {
              formData,
              hotelName,
              roomDetails,
              checkin,
              checkout,
              parent,
              children
            }
          });
    }

    // const handleClick = () => {
    //     navigate("/BookingConfirmed") 
    // };

    const handleClick_editbooking = () => {
        navigate("/viewHotelDetails") 
    };

    return (
    
        <div className="container">
            <Navbar />
            <div class="WholeContainter">

                <div className="BookHotelBar">
                    Book Hotel
                </div>

                <div className='DetailsContainer'>
                    <div class="PersonalDetailContainer">
                        <h1 className='PersonalDetailText'> Personal Details</h1>
                        <div class="BoxContainers">
                            <div class="FirstRowBar">
                                <input type="text" id="customerMemberId" placeholder="Member Id" className="container_box"  onChange={handleChange} value={formData.customerMemberId}/> 
                                <input type="text" id="customerFirstName" placeholder="john" className="container_box"  onChange={handleChange} value={formData.customerFirstName}/> 
                                <input type="text" id="customerLastName" placeholder="doe" className="container_box"  onChange={handleChange} value={formData.customerLastName} /> 
                            </div>
                            <div class="SecondRowBar">
                                <input type="text" id="areaNo" placeholder="+65" className="container_box" required onChange={handleChange} value={formData.areaNo}/> 
                                <input type="text" id="teleNo" placeholder="12345678" className="container_box" required onChange={handleChange} value={formData.teleNo} /> 
                            </div>
                            <div class="ThirdRowBar">
                                <input type="text" id="emailNo" placeholder="johndoe@gmail.com" className="container_box" required onChange={handleChange} value={formData.emailNo}/> 

                            </div>
                        </div>

                        <h2 className='SpecialRequestText'> Special Request(s)</h2>
                        <input type="text" id="specialRequestText" placeholder="Please note requests are passed to the hotel and are 
                            not guaranteed." className="request_box" required onChange={handleChange} value={formData.specialRequestText}/> 
                    </div>



                    <div class="PaymentInformationContainer">
                        <h1>Payment Information</h1>
                        <div class="pBoxContainers">
                            
                            <div class="pFirestRowBar">
                                <input type="text" id="creditCardNumber" placeholder="Credit Card Number" className="container_box" onChange={handleChange} value={formData.creditCardNumber}/> 
                            </div>
                            <div class="pSecondRowBar">
                                <input type="text" id="cardHolderName" placeholder="Card Holder" className="container_box" required onChange={handleChange} value={formData.cardHolderName} /> 
                            </div>
                            <div class="pThirdRowBar">
                                <input type="text" id="billingAddress" placeholder="Billing Address" className="container_box" required onChange={handleChange} value={formData.billingAddress}/> 
                            </div>
                            <div class="pFourthRowBar">
                                <input type="text" id="postalCode" placeholder="Postal Code" className="container_box" required onChange={handleChange} value={formData.postalCode}/> 
                            </div>
                            <div class="pFifthRowBar">
                                <input type="text" id="countryName" placeholder="Country" className="container_box" required onChange={handleChange} value={formData.countryName}/> 
                            </div>
                            <div class="pSixthRowBar">
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
                            <p className="HotelName">{hotelName}</p>
                            <p className="RoomType">{roomDetails.name}</p>
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
                            <button type="submit" className="EditBookingBar" onClick={handleClick_editbooking}>Edit Booking</button>
                        </div>
                    </div>
                </div>
                

            </div>
        </div>
    );
}
  
  export default BookingPageLoggedIn;