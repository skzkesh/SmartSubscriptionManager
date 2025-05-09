// Handle HTTP request
const express = require('express');
const router = express.Router();

// Import model
const Campaign = require('../models/Campaign');

// Create and save new campaign to database
router.post('/saveCampaign', async (req, res) => {
    try {
      const { title, subject, message, userId } = req.body;
  
      // Check if all required fields are provided
      if (!title || !subject || !message) {
        return res.status(400).json({ message: 'All fields are required' });
      }
  
      const newCampaign = new Campaign({ title, subject, message, userId });
      const savedCampaign = await newCampaign.save();
  
      if (savedCampaign) {
        const successMessage = {
          message: 'Campaign created successfully',
        };
        return res.status(201).json(successMessage); // Return success response
      } else {
        const errorMessage = { message: 'Failed to create campaign' };
        return res.status(500).json(errorMessage); // Return failure response
      }
    } catch (err) {
      console.error('Error during campaign creation:', err); // Log the full error
      // Return error response with the error message
      return res.status(400).json({ message: 'Error creating user', error: err.message });
    }
});


// Retrieve all campaign
router.post('/getAllCampaign', async (req, res) => {
    try {
        const campaigns = Campaign.find();
        res.status(200).json(campaigns);
    }
    catch (err){
        res.status(500).json({ message: 'Failed to fetch campaigns', error: err.message });
    }
});

module.exports = router;