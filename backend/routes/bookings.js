const router = require('express').Router();
const BookingController = require("../controllers/BookingController") 

router.post('/bookings', BookingController.createNewBooking);

router.get('/bookings/:id', BookingController.getBookingByID);

module.exports = router;