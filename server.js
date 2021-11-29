const express = require('express');
const ejs = require('ejs');
const app=express();
const fs=require('fs');
const path=require('path');
//const value = ejs.render("Hello <%= name %> , Welcome to my code",{
//    name : "Shubh"
//} );
//console.log(value);

app.get("/", function(req, res){
    const data = fs.readFileSync(path.join(__dirname,"index.html")).toString();
    const value =ejs.render(data, { name : "demon" });
    console.log(value);
  res.send(value);
});

app.listen(7000, function(){
    console.log("Server Started");
});