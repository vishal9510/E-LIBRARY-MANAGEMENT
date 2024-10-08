const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const { addBook, getBooks, updateBook, deleteBook } = require('../controllers/bookController');
const router = express.Router();



router.get('/getBooks', getBooks);
router.post('/addBook', protect, addBook);
router.put('/updateBook/:id', protect, updateBook);
router.delete('/deleteBook/:id', protect, deleteBook);

module.exports = router;
