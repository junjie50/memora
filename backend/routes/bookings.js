const router = require('express').Router();
const BookingController = require("../controllers/BookingController") 

router.post('/bookings', BookingController.createNewBooking);

router.get('/bookings/:id', BookingController.getBookingByID);

module.exports = router;  


/*

{
    "destinationID": "WD0M",
    "totalPayment": 5000,
    "creditCardNumber": "2222222211112222",
    "cardExpiryDate": "2024-08-23",
    "numberOfAdults": 2,
    "numberOfChildren": 1,
    "numberOfNights": 3,
    "startDate": "2024-07-20",
    "endDate": "2024-07-21",
    "cvc": 123,
    "specialRequest": "No",
    "rooms": ["room1", "room2"]
}
*/