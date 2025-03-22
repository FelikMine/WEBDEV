import express from 'express';
import cors from 'cors';
import pkg from 'pg';
const { Pool } = pkg;

const app = express();
const port = 3000;

const pool = new Pool({
    host: 'localhost',
    port: 5432,
    database: 'onlineStore',
    user: 'postgres',
    password: 'postgres',
});

app.use(express.json()); // Middleware to parse JSON requests
app.use(cors({
    origin: 'http://localhost:5173',
}));

app.get('/message', (req, res) => {
    res.json({ message: 'Hello from your API!' });
});

// Эндпоинты для работы с базой данных:
app.get('/user', async (req, res) => {

    const { email } = req.query;

    if (!email) {
        return res.status(400).json({ error: 'Email is required' });
    }

    try {
      const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json(result.rows[0]);
    //   res.json(result.rows);
    } catch (error) {
      console.error('Error fetching todos:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});