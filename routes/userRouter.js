const express = require('express');
const userModule = require('../controllers/userModule');
const router = express.Router();

// Routes
router.get('/', userModule.getUsers );
router.post('/create', userModule.createUser);
router.patch('/update/:id', userModule.updateUser);


module.exports = router;