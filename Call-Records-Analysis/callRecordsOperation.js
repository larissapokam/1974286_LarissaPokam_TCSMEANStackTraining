let fs = require("fs");
let mongoClient = require("mongodb").MongoClient;

let url = "mongodb://localhost:27017"

//this function read the data from the json file
function getCallData(){
    let data = fs.readFileSync("call_data.json");
    let jsonString = data.toString();
    let anotherJSON = JSON.parse(jsonString);

    return anotherJSON;
}

//this function insert one json data to the CallRecordsCollection database
function insertToDatabase(data)
{
    mongoClient.connect(url, {useUnifiedTopology: true },(err1,client)=>{
        if(!err1){
            let db = client.db("meanstack");
           // db.collection("Product").insertOne({_id:102,pname:"Laptop",price:95000},(err2,result)=>{
            db.collection("CallRecordsCollection").insertOne(data,(err2,result)=>{
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

//this function get and save ALL the json data to the database
function saveAllCallDatatoDatabase(){
    let data = new Array();
    data = getCallData();

    for(let i=0; i<data.length; i++)
    {
        insertToDatabase(data[i]);
    }
}


saveAllCallDatatoDatabase();