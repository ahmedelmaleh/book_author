import { Author } from "../../../db/models/author.model.js";
import { Book } from "../../../db/models/book.model.js";

export const addBook = async (req, res, next) => {
    try {
        const newBook = await Book.create(req.body);
        await Author.findByIdAndUpdate(newBook.author, {
            $push: { books: newBook._id }
        });
        res.status(201).json({ message: "Book added successfully", success: true, newBook });
    } catch (error) {
        res.status(error.cause || 500).json({ message: error.message, success: false });
    }
};

export const getBooks = async (req, res, next) => {
    try {
        const books = await Book.find().populate([{ path: 'author' }]);
        res.status(201).json({ books, success: true });
    } catch (error) {
        res.status(error.cause || 500).json({ message: error.message, success: false });
    }
};

export const getBookById = async (req, res, next) => {
    try {
        const book = await Book.findById(req.params.id).populate([{ path: 'author' }]);
        if (!book) {
            return res.status(404).json({ message: "Book not found", success: false });
        }
        res.status(201).json({ book, success: true });
    } catch (error) {
        res.status(error.cause || 500).json({ message: error.message, success: false });
    }
};

export const updateBook = async (req, res, next) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) {
            return res.status(404).json({ message: "Book not found", success: false });
        }
        if (req.body.author && req.body.author !== book.author.toString()) {
            await Author.findByIdAndUpdate(book.author, {
                $pull: { books: book._id }
            });
            await Author.findByIdAndUpdate(req.body.author, {
                $push: { books: book._id }
            });
        }
        const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(201).json({ message: "Book updated successfully", success: true, updatedBook });
    } catch (error) {
        res.status(error.cause || 500).json({ message: error.message, success: false });
    }
};

export const deleteBook = async (req, res, next) => {
    try {
        const book = await Book.findByIdAndDelete(req.params.id);
        if (!book) {
            return res.status(404).json({ message: "Book not found", success: false });
        }
        await Author.findByIdAndUpdate(book.author, {
            $pull: { books: book._id }
        });
        res.status(201).json({ message: "Book deleted successfully", success: true });
    } catch (error) {
        res.status(error.cause || 500).json({ message: error.message, success: false });
    }
};
