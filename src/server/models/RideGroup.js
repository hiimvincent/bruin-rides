const mongoose = require('mongoose');

const rgSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('RideGroup', rgSchema);