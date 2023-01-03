const express = require("express");

let app = express();

//MIDDLEWARE

app.use(express.json());

//DATABASE

let database = [];
let id = 100;

//REST API

app.get("/api/contact",function(req,res) {
	return res.status(200).json(database);
})

app.post("/api/contact",function(req,res) {
	let contact = {
		...req.body
	}
	contact.id = id;
	id++;
	database.push(contact);
	return res.status(201).json(contact);
})

app.delete("/api/contact/:id",function(req,res) {
	let tempId = parseInt(req.params.id,10);
	for(let i=0;i<database.length;i++) {
		if(database[i].id === tempId) {
			database.splice(i,1);
			return res.status(200).json({"message":"Success"});
		}
	}
	return res.status(404).json({message:"Not found"});
})

app.put("/api/contact/:id",function(req,res) {
	let tempId = parseInt(req.params.id,10);
	let contact = {
		...req.body,
		id:tempId
	}
	for(let i=0;i<database.length;i++) {
		if(database[i].id === tempId) {
			database.splice(i,1,contact);
			return res.status(200).json({message:"Success"})
		}
	}
	return res.status(404).json({message:"Not found"})
})

app.listen(3001);

console.log("Running in port 3001");