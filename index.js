import express from 'express';
import { connectdb } from './db/connection.js';
import bookRouter from './src/modules/book/book.router.js';
import authorRouter from './src/modules/author/author.router.js';

const app = express();
const port = 3000;

app.use(express.json());
connectdb();

app.use('/books', bookRouter);
app.use('/authors', authorRouter);

app.listen(port, () => {
    console.log('server is running on port', port);
});
