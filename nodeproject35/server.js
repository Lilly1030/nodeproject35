const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Category = require('./models/category')

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


app.post("/admin/category",async (req,res)=>{
    const category = new Category(req.body)
    const cate = await category.save()
    res.json(cate)
})









app.listen(5000);