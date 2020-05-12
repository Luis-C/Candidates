const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

router.post('/authenticate', userController.authenticate);
router.post('/register', userController.register);
router.post('/allusers', userController.getAllUsers);
router.post('/updateskills', userController.update);

module.exports = router;
