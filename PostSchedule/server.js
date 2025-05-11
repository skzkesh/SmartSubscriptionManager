require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
const connectDB = require('./db');
connectDB();

// Middleware
app.use(cors());
app.use(express.json());


// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/subscription', require('./routes/subscription'));

app.get('/', (req, res) => {
  res.send('Email Marketing API is running 🚀');
});

// Email sending route (optional, for later)
const nodemailer = require('nodemailer');
app.post('/send-email', async (req, res) => {
  const { to, subject, message } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject,
      text: message,
    });

    res.status(200).json({ success: true, message: 'Email sent successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Email sending failed' });
  }
});

// Start server (last!)
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
