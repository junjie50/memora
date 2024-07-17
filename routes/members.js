
const  MemberShipController  = require('../controllers/MemberController');
const router = require('express').Router();

router.post('/users', MemberShipController.createNewMember);

router.get('/users', MemberShipController.getAllUsers);

router.get('/users/:id', MemberShipController.getUserByID);

router.get('/users/:id', MemberShipController.getAllUsers);

// login
router.post('/users/login', MemberShipController.authenticateMember);

module.exports = router;
