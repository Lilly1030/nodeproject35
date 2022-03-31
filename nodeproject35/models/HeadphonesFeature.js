const mongoose = require('mongoose')

const headphonesFeatureSchema = new mongoose.Schema({
    categoryID:{
        type: mongoose.Schema.Types.ObjectID,
        ref: 'Category'
    },
    Color: {
        type: String,
        required: true
    },
    ConnectorType: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('HeadphonesFeatureFeature',HeadphonesFeatureSchema)