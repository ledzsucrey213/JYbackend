const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSCHEMA = new Schema({
    name: { type: String, required: true },
    start: { type: Date, required: true},
    end: { type: Date, required: true },
    is_active: { type: Boolean, default : true, required: true },
});

module.exports = mongoose.model('Event', eventSCHEMA);