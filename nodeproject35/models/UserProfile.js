const mongoose = require('mongoose');

const userprofileSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    phNo: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('UserProfile',userprofileSchema)