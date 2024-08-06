const mongoose = require('mongoose');
var encrypt = require('mongoose-encryption');

// table
const transactionSchema = new mongoose.Schema({
    paymentID:  { type: String, unique:true},
    transactionDate: { type: String },
    totalPayment: { type: Number },
    last4Digit: { type: String},
})

var encKey = process.env.KEY_32_BYTE;
var sigKey = process.env.KEY_64_BYTE;

transactionSchema.plugin(encrypt, { encryptionKey: encKey, signingKey: sigKey });

transactionSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Transaction', transactionSchema);