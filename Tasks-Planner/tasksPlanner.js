let http = require("http");
let url = require("url");
let fs = require("fs");


let port = 9090;
var allRecords = new Array();
let main = `
    <form action="/fillTask" method="get">
         <input type="submit" value="Add Task" /> <br>
    </form>
    <form action="/deleteTask" method="get">
         <input type="submit" value="Delete Task" /> <br>
    </form>
    <form action="/viewTask" method="get">
         <input type="submit" value="Display Task" /> <br>
    </form>
`
let getTaskInfo = `
    <h1> Welcome to Larissa Tasks Planner Page </h1>
    <form action="/fillTask" method = "get">
        <label> Emp Id: </label>
        <input type="text" name="empid" /> <br>
        <label> Task Id: </label>
        <input type="text" name="taskid" /> <br>
        <label> Task: </label>
        <input type="text" name="task" /> <br>
        <label> Deadline: </label>
        <input type="date" name="date" /> <br><br>
        <input type="submit" value="Add Task" />
    </form> <br>
    <form action="/deleteTask" method="get">
         <input type="submit" value="Delete Task" /> <br>
    </form> <br>
    <form action="/viewTask" method="get">
         <input type="submit" value="Display Task" /> <br>
    </form>

`

let deleteTask= `
    <form action="/deleteTask" method = "get">
        <label> Enter the task Id: </label>
        <input type="text" name="taskid" /> <br><br>
        <input type="submit" value="Delete Task" /><br>
    </form><br>
    <form action="/fillTask" method="get">
         <input type="submit" value="Add Task" /> <br>
    </form><br>
    <form action="/viewTask" method="get">
         <input type="submit" value="Display Task" /> <br>
    </form>
`

let recordsList = `
    <table border = "1">
    <tr>
        <th> Emp Id </th>
        <th> Task Id </th>
        <th> Task </th>
        <th> Deadline </th>
    </tr>
`

let server = http.createServer((req,res)=>{
    var path = url.parse(req.url, true).pathname;

    if(req.url != "/favicon.ico"){
        if(req.url == "/")
        {
            res.setHeader("content-type", "text/html");
            res.end(getTaskInfo);
        }
        else if(path == "/fillTask")
        {
            var data = url.parse(req.url, true).query;
            let eid = data.empid;
            let tid = data.taskid;
            let tas = data.task;
            let dat = data.date;

            if(eid==undefined && tid==undefined && tas==undefined && dat==undefined)
            {

            }
            else{
                let record = {"empid":eid, "taskid":tid,"task":tas, "date":dat};
                allRecords.push(record);
                save();
            }
          //  console.log(record);
            //console.log(allRecords[0]);

            res.setHeader("content-type", "text/html");
            res.end(getTaskInfo);
        }
        else if(path == "/deleteTask")
        {
            allRecordsS = fs.readFileSync("TasksRecords.json");
            let jsonData = JSON.parse(allRecordsS.toString());
            var data = url.parse(req.url, true).query;
            let tid = data.taskid;
            //console.log(jsonData);

            for(let i=0; i<jsonData.length; i++)
            {
                let record = jsonData[i];

                if(record.taskid == tid)
                {
                    allRecords.splice(i,1);
                    break;
                }
            }
            save();

            res.setHeader("content-type", "text/html");
            res.end(deleteTask);
        }
        else if(path == "/viewTask")
        {
            recordsList = `
                <table border = "1">
                <tr>
                    <th> Emp Id </th>
                    <th> Task Id </th>
                    <th> Task </th>
                    <th> Deadline </th>
                </tr>
            `
            allRecordsS = fs.readFileSync("TasksRecords.json");
            let jsonData = JSON.parse(allRecordsS.toString());
            //console.log(jsonData);
            for(let i=0; i<jsonData.length; i++)
            {
                let record = jsonData[i];
                recordsList = recordsList + `
                    <tr>
                        <td>${record.empid} </td>
                        <td>${record.taskid} </td>
                        <td>${record.task} </td>
                        <td>${record.date} </td>
                    </tr>
                `
            }

            recordsList = recordsList + `</table> <br>
                <form action="/deleteTask" method="get">
                    <input type="submit" value="Delete Task" /> <br>
                </form> <br>
                <form action="/fillTask" method="get">
                    <input type="submit" value="Add Task" /> <br>
                </form>`;
            res.setHeader("content-type", "text/html");
            res.end(recordsList);
        }
    }
});

function save(){
    let allRecordsString = JSON.stringify(allRecords);
    fs.writeFileSync("TasksRecords.json",allRecordsString);
  //  console.log('file saved successfully');
}


server.listen(port,()=>console.log(`Server is running on port ${port}`));