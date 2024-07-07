import { useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar.js';

function TestBookingCompleted() {
    const location = useLocation();
    const {
        customerLastName,
        customerFirstName,
        customerMemberId,
        hotelName,
        checkInDate,
        checkOutDate
    } = location.state || {};

    return (
        <div className="container">
            <Navbar />
            <h1>Booking Completed</h1>
            <p>Customer Name: {customerFirstName} {customerLastName}</p>
            <p>Member ID: {customerMemberId}</p>
            <p>Hotel Name: {hotelName}</p>
            <p>Check-in Date: {checkInDate}</p>
            <p>Check-out Date: {checkOutDate}</p>
        </div>
    );
}

export default TestBookingCompleted;
