import { model, Schema } from "mongoose";

export const authorSchema = new Schema({
    name: { type: String, required: true },
    bio: { type: String },
    birthDate: { type: Date },
    books: [{ type: Schema.ObjectId, ref: 'Book' }]
});

export const Author = model('Author', authorSchema);
