import { Author } from "../../../db/models/author.model.js";

export const addAuthor = async (req, res, next) => {
    try {
        const newAuthor = await Author.create(req.body);
        res.status(201).json({ message: "Author added successfully", success: true, newAuthor });
    } catch (error) {
        res.status(error.cause || 500).json({ message: error.message, success: false });
    }
};

export const getAuthors = async (req, res, next) => {
    try {
        const authors = await Author.find().populate([{ path: 'books' }]);
        res.status(201).json({ authors, success: true });
    } catch (error) {
        res.status(error.cause || 500).json({ message: error.message, success: false });
    }
};

export const getAuthorById = async (req, res, next) => {
    try {
        const author = await Author.findById(req.params.id).populate([{ path: 'books' }]);
        if (!author) {
            return res.status(404).json({ message: "Author not found", success: false });
        }
        res.status(201).json({ author, success: true });
    } catch (error) {
        res.status(error.cause || 500).json({ message: error.message, success: false });
    }
};

export const updateAuthor = async (req, res, next) => {
    try {
        const updatedAuthor = await Author.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedAuthor) {
            return res.status(404).json({ message: "Author not found", success: false });
        }
        res.status(201).json({ message: "Author updated successfully", success: true, updatedAuthor });
    } catch (error) {
        res.status(error.cause || 500).json({ message: error.message, success: false });
    }
};

export const deleteAuthor = async (req, res, next) => {
    try {
        const deletedAuthor = await Author.findByIdAndDelete(req.params.id);
        if (!deletedAuthor) {
            return res.status(404).json({ message: "Author not found", success: false });
        }
        res.status(201).json({ message: "Author deleted successfully", success: true });
    } catch (error) {
        res.status(error.cause || 500).json({ message: error.message, success: false });
    }
};
