const express = require('express');
const bcrypt = require('bcrypt');
const user = require('../models/user');

const router = express.Router();

router.post('/register', async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await user.createUser(firstName, lastName, email, hashedPassword);

    console.log('User created:', newUser);

    res.status(200).json({ success: true, message: 'Registration successful', user: newUser });
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

module.exports = router;