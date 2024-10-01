const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const stockSCHEMA = new Schema({
    game_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Game', required: true },
    seller_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    quantity_sold: { type: Number, required: true },
    stock_quantity: { type: Number, required: true }
});

module.exports = mongoose.model('Stock', stockSCHEMA);