const mongoose = require('mongoose');

const rSchema = new mongoose.Schema({
    region: {
        type: String,
        required: true
    },
    destination: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    desc: {
        type: String,
    },
    riders: {
        type: Array,
        required: true
    },
});

module.exports = mongoose.model('RidePost', rSchema);