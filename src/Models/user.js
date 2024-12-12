const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

const userSchema = new Schema({
    firstname: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    address: { type: String, required: false},
    password: { type: String, required: false },
    role: { type: String, enum: ['seller', 'buyer', 'admin', 'manager'], required: true }
});


// Hashage du mot de passe avant de sauvegardera
userSchema.pre('save', async function(next) {
    if (this.isModified('password') && (this.role === 'admin' || this.role === 'manager')) {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    }
    next();
});


module.exports = mongoose.model('User', userSchema);