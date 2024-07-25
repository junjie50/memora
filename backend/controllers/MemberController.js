//Logic for handling registration.
const Member = require('../models/Member');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const AppError = require('../utils/appError');

exports.createNewMember = async (req, res, next) => {
    try{
        const { username, title, firstName, lastName, phoneNumber, email, password ,address} = req.body;
        const saltRounds = 10;
        const passwordHash = await bcrypt.hash(password, saltRounds);

        const newMember = new Member({
            username,
            title,
            firstName,
            lastName,
            passwordHash,
            email,
            phoneNumber,
            address
        });

        const savedMember = await newMember.save(); 
        res.status(201).json(savedMember);
    }
    catch(err) {
      next(err);
    }
};

exports.getUserWithToken = async (req, res, next) => {
    try{
        const decodedToken = jwt.verify(req.params.token, process.env.SECRET);
        if (!decodedToken.id) {
            return res.status(401).json({ error: 'token invalid' })
          }
        const user = await Member.findById(decodedToken.id)
        res.status(200).json(user);
    }
    catch(err) {
        next(err);
    }
};

exports.getAllUsers = async (req, res, next) => {
    try{
        const members = await Member.find({})
        res.status(200)
        .send(members)
    }
    catch(err) {
      next(err);
    }
};

exports.authenticateMember = async (req, res, next) => {
    try {
        const { username, password } = req.body
        const member = await Member.findOne({ username })
        const passwordCorrect = member === null
            ? false
            : await bcrypt.compare(password, member.passwordHash)
    
        if (!(member && passwordCorrect)) {
            return next(new AppError(401, 'error', 'invalid username or password'))
        }
    
        const memberForToken = {
            username: member.username,
            id: member._id,
        }

        const token = jwt.sign(memberForToken, process.env.SECRET, { expiresIn: '1d' });

        res.status(200)
        .send({ token, username: member.username, name: member.name })
    }
    catch(err) {
        next(err);
    }
}

//new added
exports.handleForgotPassword = async (req, res, next) => {
    try {
        const {email} = req.body;
        const member = await Member.findOne({ email });

        if (!member) {
            return next(new AppError(404, 'error', 'Member not found'));
        }

        // Here can add logic to send a password reset email or token
        res.status(200).json({ message: 'Email received', email });
    } catch (err) {
        next(err);
    }
};

//new added
exports.getUserWithEmail = async (req,res,next) => {
    try{
        const {email} = req.params; //!!
        const member = await Member.findOne({email});
        res.status(200).json(member);
    }
    catch(err) {
        next(err);
    }
}

exports.updateProfileByEmailAddress = async (req,res,next) => {
    try{
        const { email } = req.params;
        const {title, firstName, lastName, username, phoneNumber, password ,address} = req.body;
        const member = await Member.findOne({email});
        console.log('member',member);
        if (!member) {
            return next(new AppError(404, 'error', 'member not found'));
        }
        if (password) {
            const saltRounds = 10;
            const passwordHash = await bcrypt.hash(password, saltRounds);
            member.passwordHash = passwordHash;
        }

        member.title = title || member.title;
        member.firstName = firstName || member.firstName;
        member.lastName = lastName || member.lastName;
        member.phoneNumber = phoneNumber || member.phoneNumber;
        member.address = address || member.address;
        member.username = username || member.username;

        const updatedMember = await member.save();
        res.status(200).json({ member: updatedMember });
    }
    catch(err) {
        next(err);
    }
}

