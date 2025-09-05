const mongoose = require('mongoose');

const investmentSchema = new mongoose.Schema ({
    symbol: {
        type: String,
        required: true,
    },
    purchase_price: {
        type: Number,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
});

module.exports = mongoose.model('Investment', investmentSchema);