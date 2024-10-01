const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const transactionSCHEMA = new Schema({
    seller_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    amount: { type: Number, required: true },
    type: { 
        type: String, 
        required: true, 
        enum: ['deposit_fees', 'commission', 'payment', 'sale'] // 
    },
    date: { type: Date, required: true }
});

module.exports = mongoose.model('Transaction', transactionSCHEMA);