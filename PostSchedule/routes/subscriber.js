// Handle HTTP request
const express = require('express');
const router = express.Router();

// Import model
const Subscriber = require('../models/Subscriber');

router.post('/getAllSubscriber', async (req, res) => {
    try {
        const subscribers = Subscriber.find();
        res.status(200).json(subscribers);
    }
    catch (err){
        res.status(500).json({ message: 'Failed to fetch subscribers', error: err.message });
    }
});

module.exports = router;