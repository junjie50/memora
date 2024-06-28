import Navbar from '../components/Navbar.js';
import { useNavigate } from "react-router-dom";
import './BookingPageLoggedIn.css';

function BookingPageLoggedIn() {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate("/test") 
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
                                <p>Member Id</p>
                                <p>John</p>
                                <p>Doe</p>
                            </div>
                            <div class="SecondRowBar">
                                <p>+65</p>
                                <p>12345678</p>
                            </div>
                            <div class="ThirdRowBar">
                                <p>johndoe@gmail.com</p>
                            </div>
                        </div>

                        <h2 className='SpecialRequestText'> Special Request(s)</h2>

                        <div className="RequestBar">
                            <p>Please note requests are passed to the hotel and are 
                            not guaranteed.</p>
                        </div>
                    </div>



                    <div class="PaymentInformationContainer">
                        <h1>Payment Information</h1>
                        <div class="pBoxContainers">
                            
                            <div class="pFirestRowBar">
                                <p>Credit Card Number</p>
                            </div>
                            <div class="pSecondRowBar">
                                <p>Card Holder</p>
                            </div>
                            <div class="pThirdRowBar">
                                <p>Billing Address</p>
                            </div>
                            <div class="pFourthRowBar">
                                <p>Postal Code</p>
                            </div>
                            <div class="pFifthRowBar">
                                <p>Country</p>
                            </div>
                            <div class="pSixthRowBar">
                                <p>Valid Till</p>
                                <p>CVC</p>
                            </div>
                        </div>
                        <button type="submit" className="ProceedBookingSummary" onClick={handleClick}>Proceed to Booking Summary</button>

                    </div>

                    <div className="BookingSummaryContainer">
                        <h2>Booking Summary</h2>

                        <div className="BookingSummaryBar"> 
                            <p className="HotelName">Royal Plaza On Scotts</p>
                            <p className="RoomType">Double Premier Room + Free Wifi Breakfast included</p>
                            <p className="NoOfRoom">1 Room</p>
                            <p className="NoOfPeoplePerRoom">2 Adults per room</p>
                        </div>

                        <hr class="DashedLine"></hr>

                        <div className="CheckInAndOutContainer"> 
                            <div class="CheckInAndOutBar"> 
                                <p class="CheckInBar">Check in:</p>
                                <p class="CheckInDate">15 Jun 2024</p>
                            </div>
                            <div class="CheckInAndOutBar"> 
                                <p class="CheckOutBar">Check out:</p>
                                <p class="CheckOutDate">18 Jun 2024</p>
                            </div>
                            
                            <p class="NoOfNightsLabel">3 Nights</p>
                        </div>

                        <div className="TotalPaymentContainer"> 
                            <div class="TotalBar">
                                <p class="TotalText">Total</p>
                                <p class="TotalSGD">SGD 298.55</p>
                            </div>
                            <p className="IncludeTaxSentence">Includes tax recovery charges and service fees</p>
                            <button type="submit" className="EditBookingBar" onClick={handleClick}>Edit Booking</button>
                        </div>
                    </div>
                </div>
                

            </div>
        </div>
    );
}
  
  export default BookingPageLoggedIn;