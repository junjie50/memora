// const express = require('express');
// const { memberRegister } = require('../controllers/MemberRegisteredController');

// const router = express.Router();

// router.post('/register', memberRegister);

// module.exports = router;


const express = require('express');
const router = express.Router();
const MemberList = require('../models/db_member');

const bcrypt = require('bcryptjs');

router.post('/register', async (req, res) => {
    const { title, firstName, lastName, countryCode, phoneNumber, email, password } = req.body;
    console.log('Received data:', req.body);

    try {

        // // Check if member with the same email already exists
        let existingMember = await MemberList.findOne({ email });
        if (existingMember) {
            return res.status(400).json({ message: 'Email already registered' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10); //salt is 10

        const newUser = new MemberList({
            title,
            firstName,
            lastName,
            countryCode,
            phoneNumber,
            email,
            // password

            password: hashedPassword
        });

        await newUser.save();
        console.log('User saved successfully');
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error saving user:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
