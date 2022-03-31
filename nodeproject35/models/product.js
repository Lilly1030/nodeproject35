const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
      
    
      Name :{
          type:String
      },
      Category : {
         type: mongoose.Schema.Types.ObjectID,
         ref: 'Category'

      },
      Brand : {
        type: mongoose.Schema.Types.ObjectID,
        ref: 'Brand'
      },
      Images : [{type: mongoose.Schema.Types.ObjectId, ref:'Image'}],
      Price: {
          type: Number,
          required: true,
          min: 1
      },
      FeatureId: {
          type: String,
          required: true
      },
      sellerId: {
          type: mongoose.Schema.Types.ObjectID,
          ref: 'Seller'
      },
      Quantity: {
          type: Number,
          required: true,
          min: 1
      }

      
    
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);