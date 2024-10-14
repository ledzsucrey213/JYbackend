const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reportSchema = new Schema({
    seller_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    total_earned: { type: Number, required: true },
    total_due: { type: Number, required: true },
    report_date: { type: Date, required: true },
    event_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
    stock_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Stock', required: true }
});

module.exports = mongoose.model('Report', reportSchema);
