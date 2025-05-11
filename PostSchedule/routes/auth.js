const express = require('express');
const router = express.Router();

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

// router.post('/subscriber', async (req, res) => {
//   try {
//     const { name, email, userId } = req.body;

//     if (!email || !password) {
//       return res.status(400).json({ message: 'All fields are required' });
//     }

//     const existingSubscriber = await Subscriber.findOne({ email, userId });

//     if (existingSubscriber){
//       return res.status(400).json({ message: 'Subscriber already in database' });
//     }

//     const newSubscriber = new Subscriber({ name, email, userId });
//     const savedSubscriber = await newSubscriber.save();

//     if (savedSubscriber) {
//       const successMessage = {
//         message: 'Subscriber added successfully',
//         subscriber: savedSubscriber,
//       };
//       return res.status(201).json(successMessage); 
//     } else {
//       const errorMessage = { message: 'Failed to add subscriber' };
//       return res.status(500).json(errorMessage); 
//     }
//   }
//   catch (err){
//     return res.status(500).json({ error: err.message });
//   }
// });

router.post('/get-name', async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.status(200).json({ name: user.name });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});


module.exports = router;
