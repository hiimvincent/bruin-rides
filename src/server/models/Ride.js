const mongoose = require('mongoose');

const rSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true
    },
    dest: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    meetPlc: {
        type: Number,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    riders: {
        type: Array,
        required: true
    },
    owner: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Ride', rSchema);