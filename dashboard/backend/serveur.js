const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Ajout de cors
const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(cors()); // Utilisation du middleware cors

app.post('/register', (req, res) => {
  const { firstName, lastName, email, password } = req.body;

    // todo

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