const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs'); // for password hashing
const jwt = require('jsonwebtoken'); // for generating JWT tokens
const memberSchema = require('../models/db_member'); // adjust as per schema

// Load environment variables
require('dotenv').config(); //JWT_SECRET=your_secret_key, solve secretOrPrivateKey must have a value (any string)

// POST /api/login
router.post('/', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if member exists
        const member = await memberSchema.findOne({ email });

        if (!member) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Validate password
        const isMatch = await bcrypt.compare(password, member.password);

        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // if (password != member.password) {//without checking hash, simply check (work)
        //     return res.status(400).json({ message: 'Invalid credentials' });
        // }

        // If credentials are valid, generate JWT token
        const payload = {
            member: {
                id: member.id // assuming member schema has an 'id' field
            }
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '1h' }, // token expires in 1 hour, adjust as needed
            (err, token) => {
                if (err) throw err;
                res.json({ token }); // send token back to client
            }
        );
        
        // res.status(200).json({ message: 'Login successful' , member});
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
