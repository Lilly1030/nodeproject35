const mongoose = require('mongoose');

const userprofileSchema = new mongoose.Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    firstName: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    phNo: {
        type: Number,
        required: true,
        min: [10, 'Phone Number must be of length 10 digits'],
        max: [10, 'Phone Number must be of length 10 digits']
    }
})

module.exports = mongoose.model('UserProfile',userprofileSchema)