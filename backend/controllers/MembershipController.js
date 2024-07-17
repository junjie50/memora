//Logic for handling registration.
const Member = require('../models/db_member');


const membersRouter = express.Router();
const Member = require('../models/Member');

membersRouter.post('/', (req, res) => {
    const {title, firstName, lastName, countryCode, phoneNumber, email, password} = req.body;
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
        res.status(500).json({ error: err.message });
})
