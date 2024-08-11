import { Router } from "express";
import { addAuthor, getAuthors, getAuthorById, updateAuthor, deleteAuthor } from "./author.controller.js";

const authorRouter = Router();

authorRouter.post("/", addAuthor);
authorRouter.get("/", getAuthors);
authorRouter.get("/:id", getAuthorById);
authorRouter.patch("/:id", updateAuthor);
authorRouter.delete("/:id", deleteAuthor);

export default authorRouter;
