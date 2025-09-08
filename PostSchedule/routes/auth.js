require('dotenv').config();
// Handle HTTP request
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Import MongoDB models
const User = require('../models/User');

// Secret key
const secretKey = process.env.JWT_SECRET;

// Middleware to authenticate the JWT
const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization'].split(' '[1]);
  
  if (!token){
    return res.status(401).json({ message: 'Access denied: No token provided' });
  }

  jwt.verify(token, secretKey, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }
    req.user = user; // Attach user info to request
    next();
  })
}
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

  try {
    // Save user to MongoDB 
    const user = new User({ name, email: emailProcessed, password });
    await user.save();

    res.status(201).json({ message: "User registered", userId: user._id });
  }
  catch (error) {
    res.status(500).json({ error: error.message });
  }
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
    
    // Generate JWT token
    const token = jwt.sign({ userId: existingUser._id }, secretKey, { expiresIn: '1h' });
    return res.status(200).json({ message: 'Login successful', userId: existingUser._id, token});

  } catch (err) {
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
});

router.get('/me', authenticateToken, async(req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password');
    if (!user){
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  }
  catch (err) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;