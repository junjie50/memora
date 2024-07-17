const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    paymentID: {type:String},
    specialRequest:  { type: String },
    numberOfAdults: { type: Number },
    numberOfChildren: { type: Number },
    numberOfNights: { type: Number },
    bookingStatus: { type: String},
    startDate: { type: String },
    endDate: { type: String},
});

bookingSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })
  

module.exports = mongoose.model('Booking', bookingSchema);