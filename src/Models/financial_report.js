const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const financialReportSCHEMA = new Schema({
    seller_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    total_sales: { type: Number, required: true },
    total_deposits: { type: Number, required: true },
    total_commission: { type: Number, required: true },
    balance_due: { type: Number, required: true },
    report_date: { type: Date, default : Date.now,  required: true }
});

module.exports = mongoose.model('Financial Report', financialReportSCHEMA);