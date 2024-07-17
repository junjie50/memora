// const express = require('express');
// const { memberRegister } = require('../controllers/MemberRegisteredController');

// const router = express.Router();

// router.post('/register', memberRegister);

// module.exports = router;



// const router = require('express').Router();
// const MemberList = require('../models/Member');

// router.post('/register', async (req, res) => {
//     const { title, firstName, lastName, countryCode, phoneNumber, email, password } = req.body;
//     console.log('Received data:', req.body);

//     try {
//         const newUser = new MemberList({
//             title,
//             firstName,
//             lastName,
//             countryCode,
//             phoneNumber,
//             email,
//             password
//         });

//         await newUser.save();
//         console.log('User saved successfully');
//         res.status(201).json({ message: 'User registered successfully' });
//     } catch (error) {
//         console.error('Error saving user:', error);
//         res.status(500).json({ message: 'Server error' });
//     }
// });

// module.exports = router;
