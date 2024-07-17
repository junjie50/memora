const mongoose = require('mongoose');

const roomBookingSchema = new mongoose.Schema({
    bookingID: {type: String},
    roomIDs:  { type: Array}
});

roomBookingSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })
  

module.exports = mongoose.model('RoomBooking', roomBookingSchema);