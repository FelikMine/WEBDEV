import express from 'express';
import cors from 'cors';
const app = express();

const port = 3000;

app.use(express.json()); // Middleware to parse JSON requests

app.use(cors({
    origin: 'http://localhost:5173',
}));

app.get('/message', (req, res) => {
    res.json({ message: 'Hello from your API!' });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});