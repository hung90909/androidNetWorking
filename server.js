const express = require('express');
const handlebars = require('express-handlebars');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const methods = require('method-override');

const test = require("./controler/controlerTest")
const app = express();
app.use(bodyparser.urlencoded({ extended: true }))
app.use(bodyparser.json())
app.use(express.json())
app.use(methods("_method"))
const port = 9999;
mongoose.connect('mongodb://localhost:27017/managerLab')
    .then(function () {
        console.log("ket noi thanh cong !")
    })
    .catch(function (err) {
        console.log("error: " + err)
    })

app.use("/test", test)

app.listen(port, function () {
    console.log("running port " + port)
}) 