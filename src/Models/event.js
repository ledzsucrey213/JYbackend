const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema({
    name: { type: String, required: true },
    start: { type: Date, required: true },
    end: { type: Date, required: true },
    is_active: { type: Boolean, required: true },
    commission: { type: Number, required: true }
});

module.exports = mongoose.model('Event', eventSchema);
