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
                                <input type="text" id="memberId" placeholder="Member Id" className="container_box" required /> 
                                <input type="john" id="firstName" placeholder="john" className="container_box" required /> 
                                <input type="doe" id="lastName" placeholder="doe" className="container_box" required /> 
                            </div>
                            <div class="SecondRowBar">
                                <input type="text" id="areaNo" placeholder="+65" className="container_box" required /> 
                                <input type="text" id="teleNo" placeholder="12345678" className="container_box" required /> 
                            </div>
                            <div class="ThirdRowBar">
                                <input type="text" id="emailNo" placeholder="johndoe@gmail.com" className="container_box" required /> 

                            </div>
                        </div>

                        <h2 className='SpecialRequestText'> Special Request(s)</h2>
                        <input type="text" id="specialRequestText" placeholder="Please note requests are passed to the hotel and are 
                            not guaranteed." className="request_box" required /> 
                    </div>



                    <div class="PaymentInformationContainer">
                        <h1>Payment Information</h1>
                        <div class="pBoxContainers">
                            
                            <div class="pFirestRowBar">
                                <input type="text" id="creditCardNo" placeholder="Credit Card Number" className="container_box" required /> 
                            </div>
                            <div class="pSecondRowBar">
                                <input type="text" id="cardHolderName" placeholder="Card Holder" className="container_box" required /> 
                            </div>
                            <div class="pThirdRowBar">
                                <input type="text" id="billingAddress" placeholder="Billing Addressr" className="container_box" required /> 
                            </div>
                            <div class="pFourthRowBar">
                                <input type="text" id="postalCode" placeholder="Postal Code" className="container_box" required /> 
                            </div>
                            <div class="pFifthRowBar">
                                <input type="text" id="countryName" placeholder="Country" className="container_box" required /> 
                            </div>
                            <div class="pSixthRowBar">
                                <input type="text" id="validUntill" placeholder="Valid Till" className="container_box" required /> 
                                <input type="text" id="cvcNo" placeholder="CVC" className="container_box" required /> 
                            </div>
                        </div>
                        <button type="submit" className="ProceedBookingSummary" onClick={handleClick}>Proceed to Booking Summary</button>

                    </div>

                    <div className="BookingSummaryContainerLI">
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