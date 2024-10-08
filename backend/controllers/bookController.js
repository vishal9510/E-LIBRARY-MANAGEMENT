const Book = require('../model/book.model');

const addBook = async (req, res) => {
    const { title, author, genre,  totalCopies,  } = req.body;
    const book = await Book.create({
        title,
        author,
        availableCopies:totalCopies,
        genre,
        totalCopies,
    });

    res.status(201).json(book);
};

const getBooks = async (req, res) => {
    const books = await Book.find();
    res.json(books);
};

const updateBook = async (req, res) => {
    const { id } = req.params;
    const { title, author, genre, totalCopies, } = req.body;
    const book = await Book.findByIdAndUpdate(
        id,
        { title, author, genre, totalCopies, availableCopies:totalCopies, },
        { new: true }
    );
    res.json(book);
};

const deleteBook = async (req, res) => {
    const { id } = req.params;
    await Book.findByIdAndDelete(id);
    res.json({ message: 'Book deleted' });
};

module.exports = {
    addBook,
    getBooks,
    updateBook,
    deleteBook,
};