const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const { borrowBook, returnBook } = require('../controllers/borrowController');
const router = express.Router();

router.post('/borrow', protect, borrowBook);
router.put('/return/:id', protect, returnBook);

module.exports = router;
