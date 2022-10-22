const express = require('express');
const router = express.Router();
const subjectsModule = require('../controllers/subjectsModule');
// Routes
router.get('/', subjectsModule.getSubjects);
router.post('/add', subjectsModule.addSubject );

module.exports = router;