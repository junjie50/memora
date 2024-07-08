import Navbar from '../components/Navbar.js';
import { useLocation } from 'react-router-dom';
import './BookingCompleted.css';

function BookingCompleted() {
    const location = useLocation();
    // const {
    //     customerLastName
    //     customerFirstName,
    //     customerGender,
    //     customerMemberId,
    //     hotelName,
    //     roomType,
    //     checkInDate,
    //     checkOutDate
    // } = location.state || {};

    const formData = location.state || {};

    return (
        <div className="container">
            <Navbar />
            
            <div class="WholeContainter">
                <div className='TextBar'>
                    <h1>Booking Confirmed!</h1>
                    <p>Booking ID: 9172381249</p>
                    <p>A pdf version of your booking have been sent to your email.</p>
                    <p>Thank you for choosing us for your stay.</p>
                </div>
                

                <div className="BookingSummaryContainer">
                    <h2>Booking Summary</h2>
                    <p className="ForWhichUser">For Mr. {formData.customerLastName} {formData.customerFirstName} (MemberID: {formData.customerMemberId}),</p>
                    <div className="BookingSummaryBar"> 
                        <p className="HotelName">Fullerton Hotel</p>
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
                            <p class="CheckInDate">05/06/2024</p>
                        </div>
                        <div class="CheckInAndOutBar"> 
                            <p class="CheckOutBar">Check out:</p>
                            <p class="CheckOutDate">05/07/2024</p>
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

            </div>
        </div>
    );
}
  
export default BookingCompleted;
  