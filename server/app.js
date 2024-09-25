import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { postRouter } from './router/post_router.js';
import { dbConnect } from './dbConnect.js';

dbConnect();
const PORT = process.env.PORT || 8080;
const app = express();
app.use(cors());
app.use(morgan(`dev`));
app.use(express.json());

app.get(`/`, (req, res) => {
    res.send(`Hello World!`);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

