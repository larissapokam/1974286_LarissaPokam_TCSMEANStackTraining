
function displayInfos(clientInfo)
{

   // var clientInfo = retrieveInfos();

    console.log("display");
    console.log(clientInfo);

    var table = document.getElementById("clientTable");
    var body = table.getElementsByTagName("tbody")[0];
    var newRow = body.insertRow(body.length);

    var cell1 = newRow.insertCell(0);
    cell1.innerHTML = clientInfo.name;

    var cell2 = newRow.insertCell(1);
    cell2.innerHTML = clientInfo.projectName;

    var cell3 = newRow.insertCell(2);
    cell3.innerHTML = clientInfo.budget;


}

// This function retrieve the client infos from the session storage
function retrieveInfos()
{
    var sum = 0;
    var data = sessionStorage.getItem("clientInfos");
    var objList = JSON.parse(data);
    
    console.log("objects: ");
    console.log(objList);

    var ind = objList.length;
    console.log("index: "+ ind);

    for(let i=0; i<ind; i++)
    {
        displayInfos(objList[i]);
        sum = sum + eval(objList[i].budget);
    }
  
    document.getElementById("total").innerHTML = "The total budget for all the project is: " + sum;
}