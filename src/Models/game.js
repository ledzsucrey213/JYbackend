const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const gameSCHEMA = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true},
    price: { type: Number, required: true },
    event_id : {type : mongoose.Schema.Types.ObjectId, ref: 'Event', required : true},
    seller_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    stock_quantity: { type: Number, required: true },
    condition: { 
        type: String, 
        required: true, 
        enum: ['new', 'very good', 'good', 'poor'],  // game's conditions
    }
});

module.exports = mongoose.model('Game', gameSCHEMA);