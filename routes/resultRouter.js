const express = require('express');
const resultModule = require('../controllers/resultModule');
const router = express.Router();


// Routes

router.get('/display-entries', resultModule.displayEntries);
router.post('/create', resultModule.createEntry);
router.patch('/update/:id', resultModule.updateEntry);
router.delete('/delete/:id', resultModule.deleteEntry);
router.post('/filter-result-by-student', resultModule.filterResultByStudent);
router.post('/filter-result-by-subject', resultModule.filterResultBySubject);
router.get('/:id', resultModule.displayEntry);

module.exports = router;