let app = require("express")();
let http = require("http").Server(app);   // to load the library we have run port number using hhtp module 
let io = require("socket.io")(http);
let mongoClient = require("mongodb").MongoClient;

let url = "mongodb://localhost:27017"

//this function insert one json data to the CallRecordsCollection database
function insertToDatabase(data)
{
    mongoClient.connect(url, {useUnifiedTopology: true },(err1,client)=>{
        if(!err1){
            let db = client.db("meanstack");
           // db.collection("Product").insertOne({_id:102,pname:"Laptop",price:95000},(err2,result)=>{
            db.collection("ChatLogCollection").insertOne(data,(err2,result)=>{
                    if(!err2){
                        console.log(result.insertedCount);
                    }else {
                        console.log(err2.message);
                    }
                    client.close();    
                });
                
            }
        });
}

app.get("/",(req,res)=> {
    res.sendFile(__dirname+"/index.html");
})

io.on("connection",(socket)=> {
   // console.log("Client connected to application.....\n\n");
    
    socket.on("chat",(msg)=> {
        var dataJson = JSON.parse(msg)
        insertToDatabase(dataJson);
        console.log(dataJson);
    })
})


http.listen(9090,()=>console.log('server running on port number 9090\n\n'));