//Logic for handling registration.

const Member = require('../models/db_member');

exports.memberRegister = async (req, res) => {
    const { title, firstName, lastName, countryCode, phoneNumber, email, password } = req.body;

    try {
        const user = new Member({
            title,
            firstName,
            lastName,
            countryCode,
            phoneNumber,
            email,
            password
        });

        await user.save();
        res.status(201).json({ message: 'Member registered successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
