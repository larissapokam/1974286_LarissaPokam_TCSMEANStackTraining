let fs = require("fs");
let scan = require("readline-sync");


//This function take input from the user and return the json object in string format
function getDetails(){
    var obj = "";
   
   let fname = scan.question("Enter your first name: ");
   let lname = scan.question("Enter your lname: ");
   let gender = scan.question("Enter your gender: ");
   let email =  scan.question("Enter your email: ");       
    
   debugger;
   obj = obj + '{"fname":"'+fname + '","lname":"'+lname + '","gender":"'+gender + '","email":"'+email ;
  
   return obj;
   
}


//This function save input to JSON file
function saveData(input){

    let date_ob = new Date();
    
    let day = ("0" + date_ob.getDate()).slice(-2); // current date
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);  // current month
    let year = date_ob.getFullYear(); // current year

    let hours = date_ob.getHours();// current hours
    let minutes = date_ob.getMinutes(); // current minutes
    let seconds = date_ob.getSeconds();   // current seconds

    let date = month + "-" + day + "-" + year;  //date in YYYY-MM-DD format
    let time = hours + ":" + minutes + ":" + seconds; //time in HH:MM format

    debugger;

    input = input + '","date":"'+ date + '","time":"'+ time + '"}\n'

    fs.writeFileSync("records.json", input,{flag:"a"},(err)=>{
        if(err){
            console.log("There was an error while writing to the records.json file");
        }
        else{
            console.log("Record stored in the records.json file successfully...")
        }
    })
  
    
}


//This function read data from the JSON file
function readData(){
    
    fs.readFile("records.json",(err,data)=>{
        if(err){
            console.log("There was an error while reading the records.json file");
        }
        else{
            let datas = data.toString();
            debugger;
            console.log(datas);
           
        }
    });
    
}

module.exports = {
    getDetails,
    saveData,
    readData
}