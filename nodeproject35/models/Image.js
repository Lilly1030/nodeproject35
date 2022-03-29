const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'Product'
    },
    name: {
        type: String,
        required: true
    },
    image: {
        data: Buffer,
        contentType: String
    }
})

module.exports = mongoose.model('Image',imageSchema)