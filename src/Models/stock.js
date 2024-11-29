const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const stockSchema = new Schema({
    games_id: [{ type: String, required: true }],
    seller_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    games_sold: [{ type: String, required : true }] })

module.exports = mongoose.model('Stock', stockSchema);
