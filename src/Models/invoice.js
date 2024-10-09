const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const invoiceSCHEMA = new Schema({
    sale_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Sale', required: true },
    buyer_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    amount: {type : Number, required : true},
    date: { type: Date, default: Date.now, required: true }
});

module.exports = mongoose.model('Game Label', invoiceSCHEMA);