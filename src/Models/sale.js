const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const saleSCHEMA = new Schema({
    game_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Game', required: true },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    sale_price: { type: Number, required: true },
    sale_date: { type: Date, default: Date.now, required: true},
    quantity_sold: { type: Number, required: true },
    commission: { type: Number, required: true},
});

module.exports = mongoose.model('Sale', saleSCHEMA);