//Logic for handling registration.
const Member = require('../models/Member');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const AppError = require('../utils/appError');

const getTokenFrom = request => {
    const authorization = request.get('authorization');
    if (authorization && authorization.startsWith('Bearer ')) {
        return authorization.replace('Bearer ', '');
    }
    return null;
}

exports.createNewMember = async (req, res, next) => {
    try{
        const { username, title, firstName, lastName, phoneNumber, email, password ,address} = req.body;
        const saltRounds = 10;
        console.log(req.body);
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
        res.status(201).json(user);
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

        const token = jwt.sign(memberForToken, process.env.SECRET);

        res.status(200)
        .send({ token, username: member.username, name: member.name })
    }
    catch(err) {
        next(err);
    }

}


