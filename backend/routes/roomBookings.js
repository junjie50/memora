const router = require('express').Router();
const RoomBookingController = require("../controllers/RoomBookingController") 

router.get('/roombookings/:id', RoomBookingController.getAllRoomBookingsByBookingID);
router.get('/roombookings', RoomBookingController.getAllRoomBooking);

module.exports = router;