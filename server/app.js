import express from `express`;
import cors from `cors`;
import morgan from `morgan`;
import dotenv from `dotenv`;


const app = express();
app.use(cors());
app.use(morgan(`dev`));
app.use(express.json());

app.get(`/`, (req, res) => {
    res.send(`Hello World!`);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

