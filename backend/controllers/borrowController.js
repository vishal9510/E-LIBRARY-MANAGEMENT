const Borrow = require('../model/borrow.model');
const Book = require('../model/book.model');

const borrowBook = async (req, res) => {
    const { bookId, dueDate } = req.body;
    const book = await Book.findById(bookId);

    if (book && book.availableCopies > 0) {
        // Create the borrow record
        const borrow = await Borrow.create({
            user: req.user._id,
            book: book._id,
            dueDate,
        });

        // Update book availability and borrowedBy array
        book.availableCopies -= 1;
        book.borrowedBy.push(req.user._id);
        await book.save();

        // Add the borrow record to the user
        req.user.borrowedBooks.push(borrow._id);
        await req.user.save();

        res.status(201).json(borrow);
    } else {
        res.status(400).json({ message: 'No available copies' });
    }
};


const returnBook = async (req, res) => {
    const { id } = req.params;
    const borrow = await Borrow.findById(id).populate('book');

    if (borrow) {
        if (borrow.status === 'returned') {
            return res.status(400).json({ message: 'Book already returned' });
        }

        // Set return date and update status
        borrow.returnDate = Date.now();
        borrow.status = 'returned';
        await borrow.save();

        // Update the book's available copies and remove the user from the borrowedBy list
        const book = await Book.findById(borrow.book._id);
        book.availableCopies += 1;
        book.borrowedBy.pull(req.user._id); // Remove user from borrowedBy
        await book.save();

        res.json({ message: 'Book returned' });
    } else {
        res.status(404).json({ message: 'Borrow record not found' });
    }
};



module.exports = {
    borrowBook,
    returnBook,
};
