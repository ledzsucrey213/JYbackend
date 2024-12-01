const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const saleSchema = new Schema({
    total_price: { type: Number, required: true },
    games_id: [{ type: mongoose.Schema.Types.ObjectId, ref: 'GameLabel', required: true }],
    buyer_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false },
    sale_date: { type: Date, required: true },
    total_commission: { type: Number, required: true },
    paid_with: { type: String, enum: ['card', 'cash'], required: true }
});

module.exports = mongoose.model('Sale', saleSchema);
