const express = require('express');
const bcrypt = require('bcrypt');
const pool = require('../db');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(express.json());
app.use(cors());

const PORT = 3001;

// Log when the server is started
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Discord OAuth2 configuration
const discordClientId = '1170627038776934400';
const discordClientSecret = 'jjEdsFomjDu1zwQH3BT8wxxEE5txEho2';
const discordRedirectUri = 'http://localhost:3001/auth/discord/callback';

// Route for initiating Discord authentication
app.get('/auth/discord', (req, res) => {
  res.redirect(`https://discord.com/api/oauth2/authorize?client_id=${discordClientId}&redirect_uri=${discordRedirectUri}&response_type=code&scope=identify%20email`);
});

// Callback route for Discord OAuth2
app.get('/auth/discord/callback', async (req, res) => {
  const code = req.query.code;

  // Exchange code for access token
  try {
    const tokenResponse = await axios.post('https://discord.com/api/oauth2/token', {
      client_id: discordClientId,
      client_secret: discordClientSecret,
      code: code,
      redirect_uri: discordRedirectUri,
      grant_type: 'authorization_code'
    });

    const accessToken = tokenResponse.data.access_token;

    // Get user information using the access token
    const userResponse = await axios.get('https://discord.com/api/users/@me', {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });

    const { id, username, discriminator, email } = userResponse.data;

    // Save or retrieve user in the database here using the obtained user information

    res.json({ id, username, discriminator, email });
  } catch (error) {
    console.error('Error during Discord callback:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Route for registration
app.post('/register', async (req, res) => {
  console.log("Reached /register route");
  const { first_name, last_name, email, password } = req.body;

  try {
    const userExists = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

    // exist ?
    if (userExists.rows.length > 0) {
      return res.status(400).json({ message: 'User already exists with this email' });
    }

    // hash psw
    const hashedPassword = await bcrypt.hash(password, 10);

    // add user to datapool
    const newUser = await pool.query(
      'INSERT INTO users (first_name, last_name, email, password_hash) VALUES ($1, $2, $3, $4) RETURNING *',
      [first_name, last_name, email, hashedPassword]
    );

    res.status(201).json(newUser.rows[0]);
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Route for login
app.post('/login', async (req, res) => {
  console.log("Reached /login route");
  const { email, password } = req.body;

  try {
    // take user
    const user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

    if (user.rows.length === 0) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // check pswd
    const passwordMatch = await bcrypt.compare(password, user.rows[0].password_hash);

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // bonus: token
    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = app;