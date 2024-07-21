const Booking = require('../models/Booking');
const RoomBooking = require('../models/RoomBooking');
const Transaction = require('../models/Transaction');
const Member = require('../models/Member');
const AppError = require('../utils/appError');
const paymentAPI = require('../services/payment-api');

const getDateStamp= () => {
    let date_time = new Date();

    // get current date
    // adjust 0 before single digit date
    let date = ("0" + date_time.getDate()).slice(-2);

    // get current month
    let month = ("0" + (date_time.getMonth() + 1)).slice(-2);

    // get current year
    let year = date_time.getFullYear();

    // prints date in YYYY-MM-DD format
    return year + "-" + month + "-" + date;
}

exports.createNewBooking= async (req, res, next) => {
    try{
        const {destinationID, totalPayment, creditCardNumber, cardExpiryDate, cvc, specialRequest, numberOfAdults, numberOfChildren, numberOfNights, startDate, endDate, rooms} = req.body;
        
        if(!req.headers.memberID) {
            return next(new AppError(401,'error', 'token invalid'));
        }

        // USE EXTERNAL API TO MAKE PAYMENT
        const {paymentID} = await paymentAPI.makePayment(totalPayment, creditCardNumber, cardExpiryDate, cvc)
        if(!paymentID) {
            return next(new AppError(401 ,'error','payment failed'));
        }

        // CREATE NEW TRANSACTION
        const transactionDate = getDateStamp();
        const last4Digit = creditCardNumber.substr(creditCardNumber.length-4)
        const newTransaction = new Transaction({paymentID, transactionDate, totalPayment, last4Digit});
        await newTransaction.save();
        
        // CREATE NEW BOOKING
        const bookingStatus = "Confirmed";
        const memberID = req.headers.memberID;
        const newBooking = new Booking({paymentID, destinationID, memberID, specialRequest, numberOfAdults, numberOfChildren, numberOfNights, bookingStatus, startDate, endDate});
        const savedBooking = await newBooking.save(); 
        const savedBookingID = savedBooking._id.toString();

        // CREATE ROOM BOOKINGS
        const newRoomBooking = new RoomBooking({
            bookingID:savedBookingID, roomIDs:rooms
        });

        const savedRoomBooking = await newRoomBooking.save();
        res.status(201).json(savedBooking);
    }
    catch(err) {
      next(err);
    }
};


exports.getBookingByID= async (req, res, next) => {
    try{
        // Log headers to debug
        console.log('Headers:', req.headers);

        // const memberID = req.headers.memberid || req.headers.memberID;

        if(!req.headers.memberid) {
            return next(new AppError(401,'error', 'token invalid'));
        }

        const params = req.params;
        // const {id} = req.params;
        const booking = await Booking.findById(params.id);
        // const booking = await Booking.findById(id);
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

exports.retreiveBookingHistory = async (req, res, next) => {
    //depends
};