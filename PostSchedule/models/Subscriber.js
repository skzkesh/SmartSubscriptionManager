const mongoose = require('mongoose');

const SubscriberSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true, // optional, so no duplicate emails
    lowercase: true,
    trim: true,
  },
  name: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',
    required: true,
  },
});

module.exports = mongoose.model('Subscriber', SubscriberSchema);
