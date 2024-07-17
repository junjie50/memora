const Booking = require('../models/Booking');
const RoomBooking = require('../models/RoomBooking');
const AppError = require('../utils/appError');

exports.createNewBooking= async (req, res, next) => {
    try{
        const { paymentID, specialRequest, numberOfAdults, numberOfChildren, numberOfNights, startDate, endDate, rooms} = req.body;
        const bookingStatus = "Confirmed";
        const newBooking = new Booking({paymentID, specialRequest, numberOfAdults, numberOfChildren, numberOfNights, bookingStatus, startDate, endDate});

        const savedBooking = await newBooking.save(); 
        const savedBookingID = savedBooking._id.toString();
        console.log(rooms);
        // Make the room booking for this booking
        const newRoomBooking = new RoomBooking({
            bookingID:savedBookingID, roomIDs:rooms
        });

        const savedRoomBooking = await newRoomBooking.save();
        console.log(savedRoomBooking)
        res.status(201).json(savedBooking);
    }
    catch(err) {
      next(err);
    }
};


exports.getBookingByID= async (req, res, next) => {
    try{
        const  params = req.params;

        const booking = await Booking.findById(params.id);
        if(!booking) {
            return next(new AppError(404,'error','booking not found'));
        }
        console.log(booking);
        res.status(200).json(booking);
    }
    catch(err) {
      next(err);
    }
};