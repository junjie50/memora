const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs'); //encrypt
const memberSchema = require('../models/db_member');

router.post('/updateProfile', async (req, res) => {
    const {email} = req.body; //based on email, search from db

    try{
        const member = await memberSchema.findOne({ email }).select('-password');; //except password (leave the box empty, let member to input)
        if (!member) {
            return res.status(400).json({ message: 'Member not found' });
        }

        //if email exists, based on the email, retreive all profile info from db and publish to UpdateProfilePage.js
        res.json({ member }); // Send member information to the client
    } catch{
        console.error(err.message);
        res.status(500).json({ message: 'Internal server error' });
    }
});

//update
router.put('/updateProfile', async (req, res) => {
    const { email, updatedInfo, newPassword } = req.body;

    try {
        if (newPassword) {
            const salt = await bcrypt.genSalt(10);
            updatedInfo.password = await bcrypt.hash(newPassword, salt);
        }
        
        const member = await memberSchema.findOneAndUpdate({ email }, updatedInfo, { new: true }).select('-password');
        if (!member) {
            return res.status(400).json({ message: 'Member not found' });
        }

        res.json({ message: 'Profile updated successfully', member });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;