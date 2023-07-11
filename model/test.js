const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const test = new Schema({
    image:String,
    text:String
})

module.exports = mongoose.model("test",test);