const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const gameLabelSCHEMA = new Schema({
    seller_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    price: { type: Number, required : true},
    event_id : {type : mongoose.Schema.Types.ObjectId, required : true},
    condition: {type : String , enum: ['new', 'very good', 'good', 'poor'], required : true},
    deposit_fee : {type : Number, required : true},
    is_Sold : {type : Boolean, required : true},
    creation : {type : Date, required : true, default : Date.now()},
    is_On_Sale : {type : Boolean, default : true, required : true}

});

module.exports = mongoose.model('GameLabel', gameLabelSCHEMA);