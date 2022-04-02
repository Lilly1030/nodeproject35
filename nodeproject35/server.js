const express = require('express');
const app = express();
const cors = require('cors');
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

const MobileFeature = require('./models/MobileFeature')
const LaptopFeature = require('./models/LaptopFeature')
const HeadphonesFeature = require('./models/HeadphonesFeature')
const swaggerUi = require('swagger-ui-express')
const YAML = require('yamljs')
const swaggerDocument = YAML.load('./swagger.yaml')

app.use(express.json())
app.use(cors());

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument)
);

mongoose.connect("mongodb+srv://madhesh:dobOct2001@cluster0.exwrl.mongodb.net/dreambasket?retryWrites=true&w=majority",{
    useNewUrlParser: true,
  })
mongoose.set('toJSON',{
  virtuals: true,
  transform: (doc,converted)=> {
    delete converted._id;
  }
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
app.get("/users",cors(),async (req,res)=>{
  const user = await User.find({})
  user_json= JSON.stringify(user)
  res.json(user)
})

app.post("/users",cors(),async (req,res)=>{

  const newUser = new User(req.body)
  const user = await newUser.save()
  res.json(user)
})

//Category
app.post("/categories",cors(),async (req,res)=>{
    const category = new Category(req.body)
    const cate = await category.save()
    res.json(cate)
})

app.get("/categories",cors(),async (req,res)=>{
  const cat = await Category.find({})
  
  res.header('Content-Range','category 0-20/20')
  res.json(cat)
})

app.get('/categories/:id',cors(), async (req,res)=>{
    const cat = await Category.findById({"_id": req.params.id})
    res.json(cat)
})

//Brand

app.post("/brands",cors(), async (req,res)=>{
  const bran = new Brand(req.body)
  const b = await bran.save()
  res.json(b)
})
app.get("/brands",cors(), async (req,res)=>{
  const bran = await Brand.find({})
  // const b = JSON.stringify(bran)
  res.json(bran)
})

app.get('/brands/:id',cors(), async (req,res)=>{
  const brand_id = await Brand.findById({"_id": req.params.id})
  res.json(brand_id)
})
// Brands for Categories


app.get("/categories/:id/brands",cors(), async (req,res)=>{
  const bran = await Brand.find({Category: req.params.id})
  // const b = JSON.stringify(bran)
  res.json(bran)
})

//Profile
app.get("/user/:id/userProfile",cors(),async (req,res)=>
{
  const userProfile = await UserProfile.find({userId: req.params.id})
  // const userProf= JSON.stringify(userProfile)
  res.json(userProfile)
})



app.post("/user/:id/userprofile",cors(),async (req,res)=>{

  const userprofile= new UserProfile({...req.body,userId: req.params.id})
  const profile= await userprofile.save()
  res.json(profile)
})

// app.get("/user/:id/useraddress",async (req,res)=>
// {
//   const userProfile = await UserProfile.find({})
//   // const userProf= JSON.stringify(userProfile)
//   res.json(userProfile)
// })

//Seller
app.post("/sellers",cors(),async (req,res)=>{
  
  console.log(req.body);
  const seller_temp= new Seller(req.body)
  const seller_t = await seller_temp.save()
  res.json(seller_t)
})

app.get("/sellers",cors(),async (req,res)=>{
  const seller = await Seller.find({})
  res.json(seller)
})

app.get("/sellers/:id",cors(), async(req,res)=>{
  const seller = await Seller.findById({ "_id": req.params.id})
})


// Seller profile
app.post('/sellers/:id/sellerprofile',cors(), async(req,res)=>{
  const sellerprofile = new SellerProfile({...req.body,sellerId: req.params.id})
  const profile = await sellerprofile.save()
  res.json(profile)
})


app.get('/sellers/:id/sellerprofile',cors(), async(req,res)=>{

  const sellerprofile = await SellerProfile.find({sellerId: req.params.id})
  res.json(sellerprofile) 
})

//MobileFeatures

app.post('/mobilefeatures',cors(),async(req,res)=>{
  const mf = new MobileFeature(req.body)
  const mf1 = await mf.save()
  res.json(mf1)
})

app.get('/mobilefeatures',cors(), async(req,res)=>{
  const mobilef = await MobileFeature.find({})
  res.json(mobilef)
})

//LaptopFeatures
app.post('/laptopfeatures',cors(),async(req,res)=>{
  const lf = new LaptopFeature(req.body)
  const lf1 = await lf.save()
  res.json(lf1)
})

app.get('/laptopfeatures',cors(), async(req,res)=>{
  const lapf = await LaptopFeature.find({})
  res.json(lapf)
})

//Headphonefeatures
app.post('/headphonefeatures',cors(), async(req,res)=>{
  const hf = new HeadphoneFeature(req.body)
  const hf1 = await hf.save()
  res.json(hf1)
})

app.get('/headphonefeatures',cors(), async(req,res)=>{
  const heaf = await HeadphoneFeature.find({})
  res.json(heaf)
})


// Product


//Image Upload

app.post('/product/upload',cors(),async(req, res)=>{
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

app.get('/product/upload',cors(),async(req,res)=>{
  // const product = Product.find({"_id":req.params.id}).populate(Image)
  const img = await Image.find({})
  res.json(img)
})




app.listen(5000,()=>{
  console.log("listening......")
});