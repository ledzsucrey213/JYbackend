const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstname: { type: String, required: false },
    name: { type: String, required: false },
    email: { type: String, required: false, unique: true },
    address: { type: String, required: false },
    password: { type: String, required: false },
    role: { type: String, enum: ['seller', 'buyer', 'admin', 'manager'], required: true }
});

module.exports = mongoose.model('User', userSchema);
