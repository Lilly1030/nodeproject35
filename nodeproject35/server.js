const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Category = require('./models/category')
const User = require('./models/User')

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
app.get("/admin/category",async (req,res)=>{
    const cat = await Category.find({})
    cat_json= JSON.stringify(cat)
    res.json(cat)
})

app.get("/admin/user",async (req,res)=>{
  const user = await User.find({})
  user_json= JSON.stringify(user)
  res.json(user)
})


app.post("/admin/category",async (req,res)=>{
    const category = new Category(req.body)
    const cate = await category.save()
    res.json(cate)
})









app.listen(5000);