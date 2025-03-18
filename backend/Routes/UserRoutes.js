const express = require('express');
const router = express.Router();
const UserControllers = require('../Controllers/UserController.js');



router.post('/register', UserControllers.register);

router.post('/auth', UserControllers.login);



module.exports = router;