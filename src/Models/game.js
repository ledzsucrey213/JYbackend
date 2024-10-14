const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const gameSchema = new Schema({
    name: { type: String, required: true },
    editor: { type: String, required: true },
    description: { type: String, required: true }
});

module.exports = mongoose.model('Game', gameSchema);
