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

const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to MongoDB');
})
.catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});

const Subscriber = require('./models/Subscriber');
// Routes
router.post('/', async (req, res) => {
  try {
    const { email, name } = req.body;

    const newSubscriber = new Subscriber({ email, name });
    const saved = await newSubscriber.save();

    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Run server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// // Unsubscribe a subscriber
// app.delete('/unsubscribe', async (req, res) => {
//   const { email } = req.body;

//   try {
//     await Subscriber.findOneAndDelete({ email });
//     res.status(200).json({ success: true, message: 'Subscriber removed successfully!' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false, error: 'Failed to remove subscriber' });
//   }
// });

// // Get all subscribers
// app.get('/subscribers', async (req, res) => {
//   try {
//     const subscribers = await Subscriber.find();
//     res.status(200).json(subscribers);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false, error: 'Failed to retrieve subscribers' });
//   }
// });


  