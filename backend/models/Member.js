const mongoose = require('mongoose');
var encrypt = require('mongoose-encryption');

const memberSchema = new mongoose.Schema({
    username: { type: String, unique: true },
    title:  { type: String },
    firstName: { type: String },
    lastName: { type: String },
    passwordHash: { type: String },
    email: { type: String },
    phoneNumber: { type: String},
    address: { type: String},
});

var encKey = process.env.KEY_32_BYTE;
var sigKey = process.env.KEY_64_BYTE;

memberSchema.plugin(encrypt, { encryptionKey: encKey, signingKey: sigKey });

memberSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject.__v
      // the passwordHash should not be revealed
      delete returnedObject.passwordHash
    }
  })
  

module.exports = mongoose.model('Member', memberSchema);

/*
MongoDB stores flexible data, ideal for diverse content, while Mongoose, a Node. js library, organizes data with validation and query building. 
MongoDB allows flexible data structuring, but Mongoose adds structure and consistency with enforceable models, enhancing code readability and maintenance.
*/