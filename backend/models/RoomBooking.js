const mongoose = require('mongoose');
var encrypt = require('mongoose-encryption');

const roomBookingSchema = new mongoose.Schema({
    bookingID: {type: String},
    roomIDs:  { type: Array}
});

var encKey = process.env.KEY_32_BYTE;
var sigKey = process.env.KEY_64_BYTE;

roomBookingSchema.plugin(encrypt, { encryptionKey: encKey, signingKey: sigKey });

roomBookingSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })
  

module.exports = mongoose.model('RoomBooking', roomBookingSchema);