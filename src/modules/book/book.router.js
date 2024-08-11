import { Router } from "express";
import { addBook, getBooks, getBookById, updateBook, deleteBook } from "./book.controller.js";

const bookRouter = Router();

bookRouter.post("/", addBook);
bookRouter.get("/", getBooks);
bookRouter.get("/:id", getBookById);
bookRouter.patch("/:id", updateBook);
bookRouter.delete("/:id", deleteBook);

export default bookRouter;
