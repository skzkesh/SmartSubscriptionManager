// Handle HTTP request
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

// Import model
const User = require('../models/User');
const Subscriber = require('../models/Subscriber');

// Create a new user upon successful sign up
router.post('/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if all required fields are provided
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser){
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password:hashedPassword });
    const savedUser = await newUser.save();

    if (savedUser) {
      const successMessage = {
        message: 'User created successfully',
        userId: savedUser._id,
      };
      return res.status(201).json(successMessage); // Return success response
    } else {
      const errorMessage = { message: 'Failed to create user' };
      return res.status(500).json(errorMessage); // Return failure response
    }
  } catch (err) {
    console.error('Error during user creation:', err); // Log the full error
    // Return error response with the error message
    return res.status(400).json({ message: 'Error creating user', error: err.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    return res.status(200).json({ message: 'Login successful', userId });
  } catch (err) {
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
});

router.post('/subscriber', async (req, res) => {
  try {
    const { name, email } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const existingSubscriber = await Subscriber.findOne({ email, userId });

    if (existingSubscriber){
      return res.status(400).json({ message: 'Subscriber already in database' });
    }

    const newSubscriber = new Subscriber({ name, email });
    const savedSubscriber = await newSubscriber.save();

    if (savedSubscriber) {
      const successMessage = {
        message: 'Subscriber added successfully',
        subscriber: savedSubscriber,
      };
      return res.status(201).json(successMessage); 
    } else {
      const errorMessage = { message: 'Failed to add subscriber' };
      return res.status(500).json(errorMessage); 
    }
  }
  catch (err){

  }
});

module.exports = router;
