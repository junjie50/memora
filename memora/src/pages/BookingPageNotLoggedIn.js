import Navbar from '../components/Navbar.js';
import './BookingPageNotLoggedIn.css';

// function BookHotelBar(){

// }

// function PersonalDetailBar(){
    
// }

// function BookingSummaryBar(){
    
// }

function BookingPageNotLoggedIn() {
  return (
    <div className="container">
        <Navbar />

        <div class="WholeContainter">

            <div className="BookHotelBar">
                Book Hotel
            </div>

            <div className="DetailsContainer"> 
                <div className="PersonalDetailContainer">
                    <div className="PersonalDetailsBar">
                        <h2>Personal Details</h2>
                        <p>Login/Register for an account to proceed with the booking</p>
                        <div className="PersonalDetailsButtonsBar">
                        <button className="LoginButton">Login</button>
                        <button className="RegisterButton">Register</button>
                        </div>
                    </div>
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
                        <button className="EditBookingBar">Edit Booking</button>
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