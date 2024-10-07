const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const gameLabelSCHEMA = new Schema({
    game_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Game', required: true },
    buyer_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    creation: { type: Date, default: Date.now, required: true }
});

module.exports = mongoose.model('Game Label', gameLabelSCHEMA);