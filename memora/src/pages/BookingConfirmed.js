import Navbar from '../components/Navbar.js';
import { useNavigate } from "react-router-dom";
import './BookingConfirmed.css';
import checkBoxImage from '../assets/check_box.png';


function BookingPageConfirmed() {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate("/BookingCompleted") 
    };
    return (
        <div className="container">
            <Navbar />
            
            <div class="WholeContainter">
                <div className="CheckBookingDetails">Check your booking details</div>

                <div className="BookingSummaryContainer">
                    <h2>Booking Summary</h2>
                    <p className="ForWhichUser">For Mr. John Doe (MemberID: 123456789),</p>
                    <div className="BookingSummaryBar"> 
                        <p className="HotelName">Royal Plaza On Scotts</p>
                        <p className="RoomType">Double Premier Room + Free Wifi Breakfast included</p>
                    </div>

                    <div className="NoOfRoomAndPeopleBar"> 
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
                    </div>
                </div>

                <div className="CancellationPolicyBar"> 
                    <div class="AgreementBar">
                        <img className='CheckBoxImageBar' src={checkBoxImage} alt=''/>
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