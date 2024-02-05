const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3001;
const axios = require('axios');
const { Pool } = require('pg');
require('dotenv').config();
const userRoutes = require('./routes/user');

app.use(bodyParser.json());
app.use(cors());

const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
});

const users = [];

app.use('/user', userRoutes);

app.post('/register', (req, res) => {
  console.log('Received registration request:', req.body);

  const { firstName, lastName, email, password } = req.body;

  if (users.find(user => user.email === email)) {
    console.log('User already exists.');
    return res.status(400).json({ success: false, message: 'User already exists' });
  }

  users.push({ firstName, lastName, email, password });

  console.log('Registration successful.');
  res.status(200).json({ success: true, message: 'Registration successful' });
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (email === 'amaury.bariety@gmail.com' && password === 'password') {
    res.status(200).json({ success: true, message: 'Login successful' });
  } else {
    res.status(401).json({ success: false, message: 'Login failed' });
  }
});

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;

app.get('/auth/youtube', (req, res) => {
  const authUrl = `https://accounts.google.com/o/oauth2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=https://www.googleapis.com/auth/youtube.readonly&response_type=code`;
  res.redirect(authUrl);
});

app.get('/auth/youtube/callback', async (req, res) => {
  const { code } = req.query;

  try {
    const tokenResponse = await axios.post('https://oauth2.googleapis.com/token', null, {
      params: {
        code,
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        redirect_uri: REDIRECT_URI,
        grant_type: 'authorization_code',
      },
    });

    const accessToken = tokenResponse.data.access_token;

    youtubeAuthSuccess = true;

    res.redirect('http://localhost:3000/Dashboard#/youtube?authSuccess=true');
  } catch (error) {
    console.error('Erreur lors de l\'authentification :', error);
    res.redirect('http://localhost:3000/Dashboard#/youtube?authSuccess=false');
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});