import Navbar from '../components/Navbar.js';
import { useNavigate } from "react-router-dom";
import './BookingPageNotLoggedIn.css';
// function BookHotelBar(){

// }

// function PersonalDetailBar(){
    
// }

// function BookingSummaryBar(){
    
// }

function BookingPageNotLoggedIn() {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate("/viewHotelDetails") 
        //要导航到绝对路径 http://localhost:3000/bookingConfirmed，需要将路径前面加上 /，这样 React Router 就会识别为绝对路径。
    };
    const handleClick_register = () => {
        navigate("/register") 
    };
    const handleClick_login = () => {
        navigate("/login") 
    };
    return (
        <div className="container">
            <Navbar />

            <div className="WholeContainter">

                <div className="BookHotelBar">
                    Book Hotel
                </div>

                <div className="DetailsContainerNL"> 
                    <div className="PersonalDetailContainerNL">
                        <div className="PersonalDetailsBar">
                            <h2>Personal Details</h2>
                            <div className='LoginRegisterText'>Login/Register for an account to proceed with the booking</div>
                            <div className="PersonalDetailsButtonsBar">
                                <button className="LoginButton" onClick={handleClick_login}>Login</button>
                                <button className="RegisterButton" onClick={handleClick_register}>Register </button>
                            </div>
                        </div>
                    </div>

                    <div className="BookingSummaryContainerNL">
                        <h2>Booking Summary</h2>

                        <div className="BookingSummaryBar"> 
                            <p className="HotelName">Royal Plaza On Scotts</p>
                            <p className="RoomType">Double Premier Room + Free Wifi Breakfast included</p>
                            <p className="NoOfRoom">1 Room</p>
                            <p className="NoOfPeoplePerRoom">2 Adults per room</p>
                        </div>

                        <hr className="DashedLine"></hr>

                        <div className="CheckInAndOutContainer"> 
                            <div className="CheckInAndOutBar"> 
                                <p className="CheckInBar">Check in:</p>
                                <p className="CheckInDate">15 Jun 2024</p>
                            </div>
                            <div className="CheckInAndOutBar"> 
                                <p className="CheckOutBar">Check out:</p>
                                <p className="CheckOutDate">18 Jun 2024</p>
                            </div>
                            
                            <p className="NoOfNightsLabel">3 Nights</p>
                        </div>

                        <div className="TotalPaymentContainer"> 
                            <div className="TotalBar">
                                <p className="TotalText">Total</p>
                                <p className="TotalSGD">SGD 298.55</p>
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

export default BookingPageNotLoggedIn;


/*
<h1> Book Hotel </h1>
<h1> Personal Details </h1>
<h1> Login/Register for an account to proceed with the booking </h1>
*/