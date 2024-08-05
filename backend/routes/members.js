
const MemberShipController  = require('../controllers/MemberController');
const router = require('express').Router();

router.post('/users', MemberShipController.createNewMember);
// router.get('/users', MemberShipController.getAllMembers);

router.get('/users/:username', MemberShipController.getMemberWithToken);
router.put('/users/:username', MemberShipController.updateMemberWithToken);
router.delete('/users/:username', MemberShipController.deleteMemberWithToken);

// login
router.post('/users/login', MemberShipController.authenticateMember);


// //new added (not use)
// router.post('/users/forgotPassword', MemberShipController.handleForgotPassword);
// router.get('/users/email/:email', MemberShipController.getUserWithEmail);
// router.put('/users/email/:email', MemberShipController.updateProfileByEmailAddress);

module.exports = router;
