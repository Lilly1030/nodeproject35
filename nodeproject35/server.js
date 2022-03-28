const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Category = require('./models/category')
const User = require('./models/User')
const UserProfile = require('./models/UserProfile')
const Seller = require('./models/Seller')
const Brand = require('./models/brand')

const a = new User({username: "varshini", password: "38279829189", email: "kvsgsdajah"})
a.save().then(() => console.log('Successfully inserted'));

app.use(express.json())



mongoose.connect("mongodb+srv://madhesh:dobOct2001@cluster0.exwrl.mongodb.net/dreambasket?retryWrites=true&w=majority",{
    useNewUrlParser: true,
  })

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});

//User
app.get("/admin/user",async (req,res)=>{
  const user = await User.find({})
  user_json= JSON.stringify(user)
  res.json(user)
})

//Category
app.post("/admin/category",async (req,res)=>{
    const category = new Category(req.body)
    const cate = await category.save()
    res.json(cate)
})

app.get("/admin/category",async (req,res)=>{
  const cat = await Category.find({})
  cat_json= JSON.stringify(cat)
  res.json(cat)
})

app.get('/admin/category/:id', async (req,res)=>{
    const cat = await Category.findById({"_id": req.params.id})
    res.json(cat)
})

//Brand

app.post("/admin/brands", async (req,res)=>{
  const bran = new Brand(req.body)
  const b = await bran.save()
  res.json(b)
})
app.get("/admin/brands", async (req,res)=>{

})

//Profile
app.get("/admin/UserProfile",async (req,res)=>
{
  const userProfile = await UserProfile.find({})
  // const userProf= JSON.stringify(userProfile)
  res.json(userProfile)
})


app.post("/admin/userprofile",async (req,res)=>{

  const userprofile= new UserProfile(req.body)
  const profile = await userprofile.save()
  res.json(profile)
})

app.get("/admin/useraddress",async (req,res)=>
{
  const userProfile = await UserProfile.find({})
  // const userProf= JSON.stringify(userProfile)
  res.json(userProfile)
})


app.post("/admin/userprofile",async (req,res)=>{

  const userprofile= new UserProfile(req.body)
  const profile = await userprofile.save()
  res.json(profile)
})

//Seller
app.post("/admin/seller",async (req,res)=>{
  const seller_temp= new Seller(req.body)
  const seller_t = await seller_temp.save()
  res.json(seller_t)
})

app.get("/admin/seller",async (req,res)=>{
  const seller = await Seller.find({})
  res.json(seller)
})
app.listen(5000);