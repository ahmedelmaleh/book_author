import { model, Schema } from "mongoose";

export const bookSchema = new Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: Schema.ObjectId, ref: 'Author', required: true },
    publishedDate: { type: Date, default: Date.now }
});

export const Book = model('Book', bookSchema);
