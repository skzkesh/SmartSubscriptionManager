require('dotenv').config();
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
const connectDB = require('./db');
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

const users = []; // In-memory user storage for demonstration
const SECRET_KEY = 'your_secret_key'; // Replace with your secret key

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/subscription', require('./routes/subscription'));

app.get('/', (req, res) => {
  res.send('Email Marketing API is running 🚀');
});

// Start server (last!)
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
