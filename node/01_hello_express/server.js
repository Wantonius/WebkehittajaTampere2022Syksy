const express = require("express");

let app = express();

app.use(function(req,res,next) {
	console.log("Hi! I am filter");
	return next();
})

app.get("/",function(req,res) {
	return res.status(200).json({"message":"Hello World"})
})

app.listen(3001);

console.log("Running in port 3001");