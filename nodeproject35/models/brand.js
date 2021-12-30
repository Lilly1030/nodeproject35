const mongoose = require("mongoose");

const BrandSchema = new mongoose.Schema(
  {
      Name :{
          type:String
      },
      Category : {
          type: String

      },
     

      
    
  },
  { timestamps: true }
);

module.exports = mongoose.model("Brand", BrandSchema);