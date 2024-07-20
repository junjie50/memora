const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    paymentID:  { type: String },
    transactionDate: { type: String },
    totalPayment: { type: Number },
    last4Digit: { type: String},
});

transactionSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})
  

module.exports = mongoose.model('Transaction', transactionSchema);