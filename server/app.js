import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { vacationRouter } from './router/vacation_router.js';
import dbMiddleware from './dbConnect.js';

const PORT = process.env.PORT || 8080;
const app = express();
app.use(cors());
app.use(morgan(`dev`));
app.use(express.json());
app.use(dbMiddleware);
app.use(`/vacations`, vacationRouter);
app.use((req, res) => {
    res.status(404).send(`404: request not found`);
});

app.get(`/`, (req, res) => {
    res.send(`Hello World!`);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Server is running at http://localhost:${PORT}`);
});