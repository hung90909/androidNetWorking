const bodyParser = require('body-parser');
const express = require('express')
const multer = require("multer");
const test = require("../model/test")
const app = express();
app.use(bodyParser.json())
app.use(express.json())

app.get('/getData' , async (req , res) =>{
   try {
      test.find()
      .then(item => res.json(item))
   } catch (error) {
      console.log(error)
   }
})

app.post("/addData", async (req , res) =>{
   try {
      const item = new test(req.body);
      await item.save();
   } catch (error) {
      console.log(error)
   }
})
app.post("/delete", async (req , res) =>{
   try {
       await test.deleteOne({name:req.body.ten})
       .then(res.send("Thanh cong"))
   } catch (error) {
      console.log(error)
   }
})
app.put("/update", async (req , res) =>{
   try {
       await test.updateOne({name:req.body.ten},req.body)
       .then(res.send("Thanh cong"))
   } catch (error) {
      console.log(error)
   }
})


module.exports = app