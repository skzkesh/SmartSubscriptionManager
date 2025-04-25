// Handle HTTP request
const express = require('express');

// Let backend receive request
const cors = require('cors');

// Parse incoming JSON request
const bodyParser = require('body-parser');

// Load .env file into process.env
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Email Marketing API is running 🚀');
  });

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });

const nodemailer = require('nodemailer');

app.post('/send-email', async (req, res) => {
  const { to, subject, message } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: 'Gmail', // or use 'SendGrid', 'Mailgun', etc.
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

  