// const {MongoClient} = require('mongodb')
const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
    memberID: { type: Number, unique: true },
    username: { type: String, unique: true },
    memberName: { type: String },
    memberPassword: { type: String },
    emailAddress: { type: Number, unique: true  },
    phoneNumber: { type: String, unique: true  },
    address: { type: String},
});

module.exports = mongoose.model('Member', memberSchema);

/*
MongoDB stores flexible data, ideal for diverse content, while Mongoose, a Node. js library, organizes data with validation and query building. 
MongoDB allows flexible data structuring, but Mongoose adds structure and consistency with enforceable models, enhancing code readability and maintenance.

*/