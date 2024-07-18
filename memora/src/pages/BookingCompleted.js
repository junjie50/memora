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

            </div>
        </div>
    );
}
  
export default BookingCompleted;
  