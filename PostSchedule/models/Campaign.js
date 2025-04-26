const mongoose = require('mongoose');

const campaignSchema = new mongoose.Schema ({
    subject: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    }
});

module.exports = mongoose.model('Campaign', campaignSchema);