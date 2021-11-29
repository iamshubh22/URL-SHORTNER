const {MongoClient} = require("mongodb");
const client =new MongoClient("mongodb+srv://demon22:iamdemon22@cluster0.rhm8l.mongodb.net/myFirstDatabase?retryWrites=true&w=majority");
client.connect().then((mClient)=>{
    const db=mClient.db();
    db.collection("book")
    .insertOne({
        
    name:"The Lord",
     author:"RK",
    })
    .then (()=>{
    console.log("book added");
    process.exit(0);
});

});
