// Handle HTTP request
const express = require('express');
const router = express.Router();

// Import User model
const User = require('../models/User');

// Create a new user upon successful sign up
router.post('/signup', async (req, res) => {
  try {
    console.log('Request Body:', req.body);
    // Extract user data from the request body
    const { name, email, password } = req.body;

    // Check if all required fields are provided
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Create a new user instance
    const newUser = new User({ name, email, password });

    // Save the new user to the database
    const savedUser = await newUser.save();

    // If the user is successfully saved
    if (savedUser) {
      const successMessage = {
        message: 'User created successfully',
        user: savedUser,
      };
      console.log(successMessage); // Log success
      return res.status(201).json(successMessage); // Return success response
    } else {
      const errorMessage = { message: 'Failed to create user' };
      console.log(errorMessage); // Log failure
      return res.status(500).json(errorMessage); // Return failure response
    }
  } catch (err) {
    console.error('Error during user creation:', err); // Log the full error
    // Return error response with the error message
    return res.status(400).json({ message: 'Error creating user', error: err.message });
  }
});

module.exports = router;
