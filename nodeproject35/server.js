const express = require('express');
const app = express();
const mongoose = require('mongoose');
const multer = require('multer')
const Category = require('./models/category')
const User = require('./models/User')
const UserProfile = require('./models/UserProfile')
const Seller = require('./models/Seller')
const Brand = require('./models/brand')
const SellerProfile = require('./models/SellerProfile')
const Image = require('./models/Image')
const Product = require('./models/product')

app.use(express.json())



mongoose.connect("mongodb+srv://madhesh:dobOct2001@cluster0.exwrl.mongodb.net/dreambasket?retryWrites=true&w=majority",{
    useNewUrlParser: true,
  })

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads')
  },
  filename : (req, file, cb) => {
    cb(null, file.originalname)
  }
})
const upload = multer({storage: storage}).single('testimage')


//User
app.get("/user",async (req,res)=>{
  const user = await User.find({})
  user_json= JSON.stringify(user)
  res.json(user)
})

//Category
app.post("/category",async (req,res)=>{
    const category = new Category(req.body)
    const cate = await category.save()
    res.json(cate)
})

app.get("/category",async (req,res)=>{
  const cat = await Category.find({})
  cat_json= JSON.stringify(cat)
  res.json(cat)
})

app.get('/category/:id', async (req,res)=>{
    const cat = await Category.findById({"_id": req.params.id})
    res.json(cat)
})

//Brand

app.post("/brands", async (req,res)=>{
  const bran = new Brand(req.body)
  const b = await bran.save()
  res.json(b)
})
app.get("/brands", async (req,res)=>{
  const bran = await Brand.find({})
  const b = JSON.stringify(bran)
  res.json(b)
})

//Profile
app.get("/user/:id/userProfile",async (req,res)=>
{
  const userProfile = await UserProfile.find({userId: req.params.id})
  // const userProf= JSON.stringify(userProfile)
  res.json(userProfile)
})


app.post("/user/:id/userprofile",async (req,res)=>{

  const userprofile= new UserProfile({...req.body,userId: req.params.id})
  const profile = await userprofile.save()
  res.json(profile)
})

// app.get("/user/:id/useraddress",async (req,res)=>
// {
//   const userProfile = await UserProfile.find({})
//   // const userProf= JSON.stringify(userProfile)
//   res.json(userProfile)
// })





//Seller
app.post("/seller",async (req,res)=>{
  const seller_temp= new Seller(req.body)
  const seller_t = await seller_temp.save()
  res.json(seller_t)
})

app.get("/seller",async (req,res)=>{
  const seller = await Seller.find({})
  res.json(seller)
})


// Seller profile
app.post('/seller/:id/sellerprofile', async(req,res)=>{
  const sellerprofile = new SellerProfile({...req.body,sellerId: req.params.id})
  const profile = await sellerprofile.save()
  res.json(profile)
})


app.get('/seller/:id/sellerprofile', async(req,res)=>{
  const sellerprofile = await SellerProfile.find({sellerId: req.params.id})
  res.json(sellerprofile) 
})


// Product

// app.post('/seller/:id/product', async(req,res)=>{
//   const product = new Product({

//   })
// })


//Image Upload

app.post('/product/upload',async(req, res)=>{
   upload(req, res, (err)=>{
    if(err){
      console.log(err)
    }
    else{
      // const newProduct = newProduct(req.body)


      const newImage = new Image({
        name : req.body.name,
        image: {
          data: req.file.filename,
          contentType: 'image/png'
        }
      })
      newImage.save().then(()=>{
        res.json(newImage)
      })
      // const product = Product.find({"_id":req.params.id})
      // product.images.push(img._id)
      // product.save(done)
      // res.json(img)
    }
  })
})

app.get('/product/upload',async(req,res)=>{
  // const product = Product.find({"_id":req.params.id}).populate(Image)
  const img = await Image.find({})
  res.json(img)
})

app.listen(5000);