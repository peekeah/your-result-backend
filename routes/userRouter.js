const express = require('express');
const userModule = require('../controllers/userModule');
const router = express.Router();
const auth = require('../middlewares/auth');

// Routes
router.post('/signup', userModule.signup);
router.post('/login', userModule.login);
router.patch('/update/:id', userModule.updateUser);

router.get('/', auth.authenticateToken, auth.authorizeUser, userModule.getAllUsers, userModule.getUsers );
router.get('/users-list', auth.authenticateToken, auth.authorizeUser, userModule.getAllUsers);



module.exports = router;