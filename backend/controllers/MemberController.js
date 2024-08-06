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

exports.getMemberWithToken = async (req, res, next) => {
    try{
        if(!req.headers.memberID) {
            return res.status(401).json({ error: 'token invalid' })
          }
        const user = await Member.findById(req.headers.memberID);
        if(!user) {
            return res.status(401).json({ error: 'user does not exists' })
        }
        res.status(200).json(user);
    }
    catch(err) {
        next(err);
    }
};

exports.getAllMembers = async (req, res, next) => {
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

        const token = jwt.sign(memberForToken, process.env.SECRET, { expiresIn: '1h' });

        res.status(200)
        .send({ token, username: member.username, name: member.name })
    }
    catch(err) {
        next(err);
    }
}

// //new added
// exports.handleForgotPassword = async (req, res, next) => {
//     try {
//         const {email} = req.body;
//         const member = await Member.findOne({ email });

//         if (!member) {
//             return next(new AppError(404, 'error', 'Member not found'));
//         }

//         // Here can add logic to send a password reset email or token
//         res.status(200).json({ message: 'Email received', email });
//     } catch (err) {
//         next(err);
//     }
// };

// //new added
// exports.getMemberWithEmail = async (req,res,next) => {
//     try{
//         const {email} = req.params; //!!
//         const member = await Member.findOne({email});
//         res.status(200).json(member);
//     }
//     catch(err) {
//         next(err);
//     }
// }

exports.updateMemberWithToken = async (req,res,next) => {
    try{
        if(!req.headers.memberID) {
            return res.status(401).json({ error: 'token invalid' })
          }
        const {password} = req.body;
        if (password) {
            const saltRounds = 10;
            const passwordHash = await bcrypt.hash(password, saltRounds);
            delete req.body.password;
            req.body.passwordHash = passwordHash;
        }

        const member = await Member.findById(req.headers.memberID);
        for(var key in req.body) {
            if(member[key]) {
                member[key] = req.body[key];
            }
        }
        const updatedMember  = await member.save();

        if (!updatedMember) {
            return next(new AppError(404, 'error', 'member not found'));
        }
        res.status(200).json(updatedMember);
    }
    catch(err) {
        next(err);
    }
}

exports.deleteMemberWithToken = async (req,res,next) => {
    try{
        if(!req.headers.memberID) {
            return res.status(401).json({ error: 'token invalid' })
          }
        const deletedMember = await Member.findByIdAndDelete({_id:req.headers.memberID});

        if (!deletedMember) {
            return next(new AppError(404, 'error', 'member not found'));
        }
        res.status(200).json(deletedMember);
    }
    catch(err) {
        next(err);
    }
}

// exports.updateProfileByEmailAddress = async (req,res,next) => {
//     try{
//         if(!req.headers.memberID) {
//             return next(new AppError(404, 'error', 'Unauthorized Access'));
//         }
//         const { email } = req.params;
//         const {title, firstName, lastName, username, phoneNumber, password ,address} = req.body;
//         const member = await Member.findOne({email});
//         console.log('member',member);
//         if (!member) {
//             return next(new AppError(404, 'error', 'member not found'));
//         }
//         if (password) {
//             const saltRounds = 10;
//             const passwordHash = await bcrypt.hash(password, saltRounds);
//             member.passwordHash = passwordHash;
//         }

//         member.title = title || member.title;
//         member.firstName = firstName || member.firstName;
//         member.lastName = lastName || member.lastName;
//         member.phoneNumber = phoneNumber || member.phoneNumber;
//         member.address = address || member.address;
//         member.username = username || member.username;

//         const updatedMember = await member.save();
//         res.status(200).json({ member: updatedMember });
//     }
//     catch(err) {
//         next(err);
//     }
// }

// exports.updateMemberWithToken = async (req,res,next) => {
//     try{
//         //new added
//         const { username } = req.params; // Get username from route params
//         const {title, firstName, lastName, phoneNumber, password ,address} = req.body;

//         console.log('Received update request for user:', username);
//         console.log('Password received:', password ? 'Yes' : 'No');

//         //new added
//         let updateData = {
//             title,
//             firstName,
//             lastName,
//             phoneNumber,
//             address
//         };

//         if (password) {
//             const saltRounds = 10;
//             const passwordHash = await bcrypt.hash(password, saltRounds);
//             updateData.passwordHash = passwordHash;
//             console.log('Password hashed and added to updateData');
//         }

//         console.log('Update data:', updateData);

//         // const document = {
//         //     title:title,
//         //     firstName:firstName,
//         //     lastName:lastName,
//         //     username:username,
//         //     phoneNumber:phoneNumber,
//         //     password:password,
//         //     address:address
//         // }
//         // const updatedMember = await Member.findByIdAndUpdate({_id:req.headers.memberID}, req.body, {returnDocument:"after"});

//         const updatedMember = await Member.findOneAndUpdate(
//             { username: username },
//             updateData,
//             { new: true, runValidators: true }
//         );

//         if (!updatedMember) {
//             return next(new AppError(404, 'error', 'member not found'));
//         }

//         console.log('Member updated:', updatedMember);
//         res.status(200).json(updatedMember);
//     }
//     catch(err) {
//         next(err);
//     }
// }

// exports.deleteMemberWithToken = async (req,res,next) => {
//     try{
//         const deletedMember = await Member.findByIdAndDelete({_id:req.headers.memberID});

//         if (!deletedMember) {
//             return next(new AppError(404, 'error', 'member not found'));
//         }
//         res.status(200).json(deletedMember);
//     }
//     catch(err) {
//         next(err);
//     }
// }


