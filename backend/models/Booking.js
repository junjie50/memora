const mongoose = require('mongoose');
var encrypt = require('mongoose-encryption');

const bookingSchema = new mongoose.Schema({
    paymentID: {type:String, unique:true },
    destinationID: {type:String},
    memberID: {type:String},
    specialRequest:  { type: String },
    numberOfAdults: { type: Number },
    numberOfChildren: { type: Number },
    numberOfNights: { type: Number },
    bookingStatus: { type: String},
    startDate: { type: String },
    endDate: { type: String},
});

var encKey = process.env.KEY_32_BYTE;
var sigKey = process.env.KEY_64_BYTE;

bookingSchema.plugin(encrypt, { encryptionKey: encKey, signingKey: sigKey, excludeFromEncryption: ['memberID', 'destinationID']});

bookingSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
      delete returnedObject.paymentID
    }
  })
  

module.exports = mongoose.model('Booking', bookingSchema);