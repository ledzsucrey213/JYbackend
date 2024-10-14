const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const invoiceSchema = new Schema({
    sale_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Sale', required: true },
    buyer_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

module.exports = mongoose.model('Invoice', invoiceSchema);
