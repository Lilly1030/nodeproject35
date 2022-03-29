const mongoose = require('mongoose');

const sellerProfileSchema = new mongoose.Schema({
    sellerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'Seller'
    },
    firstName:{
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    PhNo: {
        type: Number,
        required: true,
        minlength: 10,
        maxLength: 10,
    },
    city: {
        type: String,
        required: true
    },
    address:{
        type: String,
        required: true
    }

})


module.exports = mongoose.model('SellerProfile',sellerProfileSchema)