// Handle HTTP request
const express = require('express');
const router = express.Router();

// Import model
const User = require('../models/User');
const Subscription = require('../models/Subscription');

// Create and save new campaign to database
router.post('/add-subscription', async (req, res) => {
    try {
      const { 
        userId,
        name, 
        category,
        normalizedAmount,
        normalizedBillingCycle,
        startDate,
        nextBillingDate,
        notes,  
      } = req.body;
  
      // Check if all required fields are provided
      if (!name || !category || !normalizedAmount || !normalizedBillingCycle || !startDate) {
        return res.status(400).json({ message: 'All fields are required' });
      }
  
      const newSubscription = new Subscription({ 
        userId, 
        name, 
        amount: normalizedAmount, 
        billingCycle: normalizedBillingCycle, 
        startDate: new Date(startDate), 
        nextBillingDate: new Date(nextBillingDate), 
        category, 
        notes 
      });

      const success = await newSubscription.save();
  
      if (success) {
        const successMessage = {
          message: 'Subscription created successfully',
        };
        return res.status(201).json(successMessage); 
      } else {
        const errorMessage = { message: 'Failed to create sub' };
        return res.status(500).json(errorMessage);
      }
    } catch (err) {
      return res.status(400).json({ message: 'Error creating sub', error: err.message });
    }
});



// Get all subscriptions by the user
// routes/subscription.js
router.post('/get-subscription-all', async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    const subscriptions = await Subscription.find({ email });

    return res.status(200).json({ subscriptions });
  } catch (err) {
    console.error('Error fetching subscriptions:', err);
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
});


module.exports = router;