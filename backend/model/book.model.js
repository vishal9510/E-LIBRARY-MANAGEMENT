const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    author: {
        type: String,
        required: true,
        trim: true,
    },
    genre: {
        type: String,
        required: true,
        trim: true,
    },
    totalCopies: {
        type: Number,
        required: true,
        min: 1,
    },
    availableCopies: {
        type: Number,
        required: true,
        min: 0,
        validate: {
            validator: function (value) {
                return value <= this.totalCopies; // availableCopies can't exceed totalCopies
            },
            message: 'Available copies cannot exceed total copies.',
        },
    },
    borrowedBy: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
    ], // List of users who borrowed the book
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Book', bookSchema);
