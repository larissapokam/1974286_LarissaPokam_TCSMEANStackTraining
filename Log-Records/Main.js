let records = require("./CreateRecords");
let scan = require("readline-sync");

//this function ask the number of data the user want to enter
function repeat(){
    let count = scan.question("\nHow many data do you want to enter? ");

    for(let i=0; i<count; i++)
    {
        console.log("\nEnter the details of log " + (i+1))
        let data = records.getDetails();
        records.saveData(data); 

    }
    
}

repeat();
console.log("\nData red from json file are: \n")
records.readData();