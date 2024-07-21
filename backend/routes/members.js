
const MemberShipController  = require('../controllers/MemberController');
const router = require('express').Router();

router.post('/users', MemberShipController.createNewMember);

router.get('/users', MemberShipController.getAllUsers);

router.get('/users/:token', MemberShipController.getUserWithToken);

// login
router.post('/users/login', MemberShipController.authenticateMember);


//new added (still work on)
router.post('/users/forgotPassword', MemberShipController.handleForgotPassword);
router.post('/users/:email', MemberShipController.updateProfileByEmailAddress);

module.exports = router;
