const RoomBooking = require('../models/RoomBooking');
const AppError = require('../utils/appError');

exports.getAllRoomBooking= async (req, res, next) => {
    try{
        const roomBookings = await RoomBooking.find({});
        res.status(201).json(roomBookings);
    }
    catch(err) {
      next(err);
    }
};

exports.getAllRoomBookingsByBookingID= async (req, res, next) => {
    try{
        const params = req.params;
        const roomBookings = await RoomBooking.findOne({bookingID:params.id});
        if(!roomBookings) {
            return next(new AppError(404,'error','room bookings not found'));
        }
        res.status(200).json(roomBookings);
    }
    catch(err) {
      next(err);
    }
};