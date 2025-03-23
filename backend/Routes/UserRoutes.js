const express = require('express');
const router = express.Router();
const UserControllers = require('../Controllers/UserController.js');
const authMiddleware = require('../middlewares/authMiddleware.js');



router.post('/register', UserControllers.register);

router.post('/auth', UserControllers.login);

router.get('/me', authMiddleware , UserControllers.getme);

router.put('/update', authMiddleware, UserControllers.updateProfile);



module.exports = router;