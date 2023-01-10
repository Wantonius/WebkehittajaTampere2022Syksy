const express = require("express");
const mongoose = require("mongoose");

let app = express();

let port = process.env.port || 3000;

const mongodb_url = process.env.MONGODB_URL;
const mongodb_user = process.env.MONGODB_USER;
const mongodb_password = process.env.MONGODB_PASSWORD;

const url ="mongodb+srv://"+mongodb_user+":"+mongodb_password+"@"+mongodb_url+"/testdatabase?retryWrites=true&w=majority"

mongoose.connect(url).then(
() => console.log("Connected to mongo atlas"),
(error) => console.log("Failed to connect to mongo atlas. Reason",error)
)

app.listen(port);

console.log("Running in port",port);