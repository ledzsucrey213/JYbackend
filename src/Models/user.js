const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSCHEMA = new Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    nom: { type: String, required: true },
    prenom: { type: String, required: true },
    role: { 
        type: String, 
        required: true, 
        enum: ['seller', 'buyer', 'admin'],  // 
    }
});

module.exports = mongoose.model('User', userSCHEMA);