// Handle HTTP request
const express = require('express');
const router = express.Router();
const users = [];

// Import MongoDB models
const User = require('../models/User');

// Handle the sign-up route
router.post('/sign-up', async (req, res) => {
  const { email, name, password } = req.body;

  if (!email || !name || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const emailProcessed = email.trim().toLowerCase();
  const existingUser = await User.findOne({ email: emailProcessed });

  if (existingUser) {
    return res.status(400).json({ message: 'User already exists' });
  }

  try {
    // Save user to MongoDB 
    const user = new User({ name, email: emailProcessed, password });
    await user.save();

    res.status(201).json({ message: "User registered", userId: user._id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// New sign up
router.post('/register', async (req, res) => {
  const { email, name, password } = req.body;

  // Check if user already exists
  if (!email || !name || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const emailProcessed = email.trim().toLowerCase();
  const existingUser = await User.findOne({ email: emailProcessed });

  if (existingUser) {
    return res.status(400).json({ message: 'User already exists' });
  }

  // Store user
  users.push({ username, email, password });
  res.status(201).send('User created');
});

// Login to existing account
router.post('/log-in', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    if (existingUser.password != password) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    return res.status(200).json({ message: 'Login successful', userId: existingUser._id });
  } catch (err) {
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;