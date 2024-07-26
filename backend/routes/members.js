
const MemberShipController  = require('../controllers/MemberController');
const router = require('express').Router();

router.post('/users', MemberShipController.createNewMember);

router.get('/users', MemberShipController.getAllUsers);

router.get('/users/:token', MemberShipController.getUserWithToken);

// login
router.post('/users/login', MemberShipController.authenticateMember);


//new added
router.post('/users/forgotPassword', MemberShipController.handleForgotPassword);
router.get('/users/email/:email', MemberShipController.getUserWithEmail);
router.put('/users/email/:email', MemberShipController.updateProfileByEmailAddress);

module.exports = router;
