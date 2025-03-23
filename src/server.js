import express from 'express';
import cors from 'cors';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
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

app.post('/login', async (req, res)=> {


  const {email, password} = req.body;
  //Если не найдены значения:
  if(!email || !password) {
    return res.status(400).json({
      error: "Don't send all values"
    })
  }
  console.log( "Получаемые данные login " , email, password );

    try {

      const findUser = await pool.query("SELECT * FROM users WHERE email = $1", [email]);

      if(findUser.rows.length === 0) {
        return res.status(404).json ( {
          error: "User not found"
      })}

      const findedUser = findUser.rows[0];

      if (!password || !findedUser.password_hash) {
        return res.status(400).json({ error: 'Password or hash is missing' });
      }

      const isPasswordValid = await bcrypt.compare(password, findedUser.password_hash);

      if(!isPasswordValid) {
        return res.status(401).json ( {
          error: "Invalid password"
        })
      }
      //Сгенерируем токен
      const token = jwt.sign(
        {
          id: findUser.id,
          email: findUser.email,
          password: findUser.password
        },
        "jwt_secret_secure_key",
        {expiresIn: '6h'}
      )

      res.json({
        token,
        user: {
          userName: findedUser.username,
          email: findedUser.email,
        },
      });

    } catch (error) {
      console.error('Error during login:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
})

app.post('/register', async (req, res) => {

    const {userName, email, password} = req.body;
    console.log( "Получаемые данные ",userName, email, password );

    if( !userName || !email || !password) {
      return res.status(400).json({
        error: "Don't input all values"
      })
    }

    try {

      const saltRounds = 10; //Значение по-умолчанию
      const passwordHash = await bcrypt.hash(password, saltRounds);

      const result = await pool.query('INSERT INTO users (username, email, password_hash) VALUES ($1, $2, $3) RETURNING *',
      [userName, email, passwordHash]);

      res.status(201).json(result.rows[0]);

    } catch (error) {

      console.error('Error registering user:', error);

      if (error.code === '23505') {
        return res.status(409).json({ error: 'Email/Username already exists' });
      }
      res.status(500).json({ error: 'Internal server error' });
    }
})

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