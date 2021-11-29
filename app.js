const express = require('express');
const {nanoid} =require('nanoid');
const ejs = require ('ejs');
let db;
const { MongoClient } = require('mongodb');

const app =express();
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended : true }));


const client = new MongoClient("mongodb+srv://demon22:<Password>@cluster0.rhm8l.mongodb.net/myFirstDatabase?retryWrites=true&w=majority");
client.connect().then(function(mClient){
    const db =mClient.db(); 
    console.log("Database is connected ")
    app.listen(7000,function(){
        console.log("Server Started");
});


app.get("/",function(req,res){
    res.render("index");
});

app.get("/:slug",function(req,res){
    console.log(req.params.slug);
    db.collection("urlshort")
    .findOne({ShortUrl : req.params.slug})
    .then(function(document){
        console.log(document);
        res.status(301).redirect( document.longUrl.startsWith("https://")||document.longUrl.startsWith("http://")?document.longUrl:"https://"+document.longUrl);
      
    })
    .catch(function(error){
        console.error(error);
        res.send("Path not found");
    });
    
});


app.post("/api/newurl",function(req,res){
    const longUrl = req.body.longUrl;
    const ShortUrl = nanoid(6);    
    db.collection("urlshort")
    .insertOne({longUrl , ShortUrl})
    .then(function(){
        res.json({ShortUrl});
    });
   
});



});
