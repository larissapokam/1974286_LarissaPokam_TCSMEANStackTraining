
var clientsList = []; //list of all submited clients

//function that get information (input) from the submitted form
function getInfos()
{
    var clientInfos = {}; //Object that represents a client
    clientInfos.name = document.getElementById("clientName").value;
    clientInfos.projectName = document.getElementById("projectName").value;
    clientInfos.budget = document.getElementById("Budget").value;

   // console.log("hey");
    console.log(clientInfos);
    return clientInfos;
}

//this function add new given infos to the storage
function add()
{
   // alert("in add");
    var clientInfo = getInfos(); //get the infos

    clientsList.push(clientInfo); //save the infos 

    clearInput(); 

   // saveInfos(); 

   // displayInfos();
}

//this function save all the clients infos in a session Storage
function saveInfos()
{
    var clientString = JSON.stringify(clientsList);//convert object to string
    sessionStorage.setItem("clientInfos", clientString);

}

//this function clear the input in the form
function clearInput()
{
    document.getElementById("clientName").value = "";
    document.getElementById("projectName").value = "";
    document.getElementById("Budget").value = "";

}

