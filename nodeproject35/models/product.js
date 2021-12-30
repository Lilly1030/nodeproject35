const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
      Name :{
          type:String
      },
      Category : {
          type: String

      },
      Brand : {
          type: String
      }

      
    
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);