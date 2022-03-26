const mongoose = require("mongoose")

const usersSchema = new mongoose.Schema({
    user: {
        type: Schema.Types.ObjectID,
        ref: 'User' 
    },
    userProfile:{
        type: Schema.Types.ObjectID,
        ref: 'UserProfile'
    },
    userProfileAddress:{
        type: Schema.Types.ObjectID,
        ref: 'UserProfileAddress'
    }
})

module.exports = mongoose.model('Users', usersSchema)