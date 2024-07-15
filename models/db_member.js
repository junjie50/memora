// const {MongoClient} = require('mongodb')
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    title: { type: String },
    firstName: { type: String },
    lastName: { type: String },
    countryCode: { type: Number },
    phoneNumber: { type: Number },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },

});

module.exports = mongoose.model('MemberList', userSchema);

/*
MongoDB stores flexible data, ideal for diverse content, while Mongoose, a Node. js library, organizes data with validation and query building. 
MongoDB allows flexible data structuring, but Mongoose adds structure and consistency with enforceable models, enhancing code readability and maintenance.

*/