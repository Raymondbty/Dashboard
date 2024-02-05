const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3001;
const axios = require('axios');

app.use(bodyParser.json());
app.use(cors());

const users = [];

app.post('/register', (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  if (users.find(user => user.email === email)) {
    return res.status(400).json({ success: false, message: 'User already exists' });
  }

  users.push({ firstName, lastName, email, password });

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

const CLIENT_ID = '870640262687-vk8bviuch1pb3i0nch17q2gc46kuek9l.apps.googleusercontent.com';
const CLIENT_SECRET = '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';
const REDIRECT_URI = 'http://localhost:3001/auth/youtube/callback'

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