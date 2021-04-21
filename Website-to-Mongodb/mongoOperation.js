let mongoClient = require("mongodb").MongoClient;

let url = "mongodb://localhost:27017"
var list =[];


//this function insert one json data to the CallRecordsCollection database
function insertToDatabase(course)
{
    mongoClient.connect(url, {useUnifiedTopology: true },(err1,client)=>{
        if(!err1){
            let db = client.db("meanstack");
           
            db.collection("CoursesCollection").insertOne(course,(err2,result)=>{
                    if(!err2){
                        console.log("Course added successfully");
                    }else {
                        console.log(err2.message);
                    }
                    client.close();    
                });
                
            }
        });
}


//this function delete a course record from the database
function deleteFromDatabase(courseId)
{
   // console.log(courseId);
    mongoClient.connect(url, {useUnifiedTopology: true },(err1,client)=>{
        if(!err1){
            let db = client.db("meanstack");
           
            db.collection("CoursesCollection").deleteOne({"_id":courseId},(err2,result)=>{
                if(!err2){
                    if(result.deletedCount>0){
                        console.log("Course deleted successfully")
                   }
                   else {
                        console.log("Course not present")
                   }
                }
                client.close();    
            });
            
        }
    });
}


//this function update the 'amount in a course record from the database
function updateDatabase(courseId, newAmount)
{
    mongoClient.connect(url, {useUnifiedTopology: true },(err1,client)=>{
        if(!err1){
            let db = client.db("meanstack");
           
            db.collection("CoursesCollection").updateOne({"_id":courseId},{$set:{"amount":newAmount}},(err2,result)=>{
                if(!err2){
                    if(result.modifiedCount>0){
                        console.log("Course amount updated successfully")
                   }else {
                        console.log("Amount didn't update");
                   }
            }
                client.close();    
            });
            
        }
    });
}


//this function update the 'amount in a course record from the database
function retrieveCourse()
{
    mongoClient.connect(url,{ useUnifiedTopology: true },(err1,client)=> {
        if(!err1){
            let db = client.db("meanstack");
            let cursor = db.collection("CoursesCollection").find();
           
               cursor.each((err2,doc)=> {
                        if(doc!=null){
                            storedata(doc);
                        }
                        client.close();
                        
                })     
        }  
    })
}


//this function store the given data in an array
function storedata(x){
    list.push(x);
   // console.log(x);
}

//this functions return the list from the mongodb
function getList()
{
    console.log("Retrieved successfully. List Size: " + list.length);
    return list;
}

//this function initialize the list of data
function Listinitialisation()
{
    list = [];
}

module.exports = {insertToDatabase, deleteFromDatabase, updateDatabase, retrieveCourse, getList, Listinitialisation};