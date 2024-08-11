import mongoose from "mongoose";

export const connectdb = () => {
    mongoose.connect('mongodb://localhost:27017/book_author')
    .then(() => {
        console.log("db is connected successfully");
    })
    .catch((err) => {
        console.log("failed to connect to db", err);
    });
};
