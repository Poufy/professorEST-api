const mongoose = require('mongoose');

const uniSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {type: String, required: true},
    location: {type: String, required: true},
    tuition: {type: Number, required: true},
    section: String
});

module.exports = mongoose.model("Uni", uniSchema);