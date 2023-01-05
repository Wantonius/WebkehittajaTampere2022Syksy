const express = require("express");
const apiroute = require("./routes/apiroute");
const bcrypt = require("bcrypt");

let app = express();

//LOGIN DATABASES

let registeredUsers = [];
let loggedSessions = [];
const time_to_live_diff = 3600000;

//BODYPARSER

app.use(express.json());

let port = process.env.PORT || 3001;

//LOGIN MIDDLEWARE

//LOGIN API

app.post("/register",function(req,res) {
	if(!req.body) {
		return res.status(400).json({message:"Bad request"});
	}
	if(!req.body.username || !req.body.password) {
		return res.status(400).json({message:"Bad request"});
	}
	if(req.body.username.length < 4 || req.body.password.length < 8) {
		return res.status(400).json({message:"Bad request"});
	}
	for (let i=0;i<registeredUsers.length;i++) {
		if(req.body.username === registeredUsers[i].username) {
			return res.status(409).json({message:"Username is already in use"})
		}
	}
	bcrypt.hash(req.body.password,14,function(err,hash) {
		if(err) {
			console.log(err);
			return res.status(500).json({message:"Internal server error"});
		}
		let user = {
			username:req.body.username,
			password:hash
		}
		console.log(user);
		registeredUsers.push(user);
		return res.status(200).json({message:"Register success"});
	})
})

app.use("/api",apiroute);

app.listen(port);

console.log("Running in port",port);