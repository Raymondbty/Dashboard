const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3001;

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

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});