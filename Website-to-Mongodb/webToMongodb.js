let http = require("http");
let url = require("url");
let mongoClient = require("mongodb").MongoClient;
let mongo = require("./mongoOperation");

let port = 9090;
let main = `
    <h1> Course Platform </h1>
    <form action="/addCourse" method="get">
         <input type="submit" value="Add Course" /> <br>
    </form>
    <form action="/updateCourse" method="get">
         <input type="submit" value="Update Course" /> <br>
    </form>
    <form action="/deleteCourse" method="get">
         <input type="submit" value="Delete Course" /> <br>
    </form>
    <form action="/retrieveCourse" method="get">
         <input type="submit" value="retrieve Course(s)" /> <br>
    </form>
`

let retrieveCourses= `
    <h1> Click the Display button to see the list </h1>
    <form action="/viewCourse" method="get">
        <input type="submit" value="Display Course(s) list" /> <br>
    </form><br>
    
`

let getCourseInfo = `
    <h1> Use this form to add a course </h1>
    <form action="/addCourse" method = "get">
        <label> Course Id: </label>
        <input type="text" name="cid" /> <br><br>
        <label> Course Name: </label>
        <input type="text" name="cname" /> <br><br>
        <label> Description: </label>
        <textarea name="cdescription"> </textarea><br> <br>
        <label> Amount: </label>
        <input type="number" name="camount" /> <br><br>
        <input type="submit" value="Add" />
    </form> <br> <br>
    <form action="/updateCourse" method="get">
         <input type="submit" value="Update Course" /> <br>
    </form><br>
    <form action="/deleteCourse" method="get">
         <input type="submit" value="Delete Course" /> <br>
    </form> <br>
    <form action="/retrieveCourse" method="get">
        <input type="submit" value="retrieve Course(s)" /> <br>
    </form>

`

let updateCourse= `
    <h1> Use this form to update a course amount</h1>
    <form action="/updateCourse" method = "get">
        <label> Enter the course Id: </label>
        <input type="text" name="cid" /> <br><br>
        <label> Enter the course new Amount: </label>
        <input type="number" name="camount" /> <br><br>
        <input type="submit" value="Update" /><br>
    </form><br>
    <form action="/addCourse" method="get">
         <input type="submit" value="Add Course" /> <br>
    </form><br>
    <form action="/deleteCourse" method="get">
         <input type="submit" value="Delete Course" /> <br>
    </form> <br>
    <form action="/retrieveCourse" method="get">
        <input type="submit" value="retrieve Course(s)" /> <br>
    </form>
`

let deleteCourse= `
    <h1> Use this form to delete a course </h1>
    <form action="/deleteCourse" method = "get">
        <label> Enter the course Id: </label>
        <input type="text" name="cid" /> <br><br>
        <input type="submit" value="Delete" /><br>
    </form><br>
    <form action="/addCourse" method="get">
         <input type="submit" value="Add Course" /> <br>
    </form><br>
    <form action="/updateCourse" method="get">
         <input type="submit" value="Update Course" /> <br>
    </form><br>
    <form action="/retrieveCourse" method="get">
        <input type="submit" value="retrieve Course(s)" /> <br>
    </form>
`

let courseList = `
    <h1>Here is the list of your current registered course(s)</h1>
    <table border = "1">
    <tr>
        <th> Course Id </th>
        <th> Course Name</th>
        <th> Description </th>
        <th> Amount </th>
    </tr>
`

let server = http.createServer((req,res)=>{
    var path = url.parse(req.url, true).pathname;

    if(req.url != "/favicon.ico"){
        if(req.url == "/")
        {
            res.setHeader("content-type", "text/html");
            res.end(main);
        }
        else if(path == "/addCourse")
        {
            var data = url.parse(req.url, true).query;
            let cid = data.cid;
            let cname = data.cname;
            let cdescr = data.cdescription;
            let amount = eval(data.camount);

            if(cid==undefined && cname==undefined && cdescr==undefined && amount==undefined)
            {

            }
            else{
                let course = {"_id":cid, "name":cname,"description":cdescr, "amount":amount};
                mongo.insertToDatabase(course);
               
            }

            res.setHeader("content-type", "text/html");
            res.end(getCourseInfo);
        }
        else if(path == "/deleteCourse")
        {
           var data = url.parse(req.url, true).query;
           if(data.cid==undefined )
           {

           }
           else{
               let cid = data.cid;
                mongo.deleteFromDatabase(cid);
           }

            res.setHeader("content-type", "text/html");
            res.end(deleteCourse);
        }
        else if(path == "/updateCourse")
        {
           var data = url.parse(req.url, true).query;
           if(data.cid==undefined )
           {

           }
           else{
               //let cidN = eval(data.cid);
               let cidN = data.cid;
               let newAmount = eval(data.camount);
               mongo.updateDatabase(cidN,newAmount);
           }

            res.setHeader("content-type", "text/html");
            res.end(updateCourse);
        }

        else if(path == "/retrieveCourse")
        {

            courseList = `
            <h1>Here is the list of your current registered course(s)</h1>
            <table border = "1">
            <tr>
                <th> Course Id </th>
                <th> Course Name</th>
                <th> Description </th>
                <th> Amount </th>
            </tr>
        `
            mongo.Listinitialisation();
            mongo.retrieveCourse();
            res.setHeader("content-type", "text/html");
            res.end(retrieveCourses);
        }

       else if(path == "/viewCourse")
        {
            courseList = `
                <table border = "1">
                <tr>
                    <th> Course Id </th>
                    <th> Name </th>
                    <th> Description </th>
                    <th> Amount </th>
                </tr>
            `
         
            let list = mongo.getList();
        
           for(let i=0; i<list.length; i++)
           {
               let course = list[i];
               courseList = courseList + `
                   <tr>
                       <td>${course._id} </td>
                       <td>${course.name} </td>
                       <td>${course.description} </td>
                       <td>${course.amount} </td>
                   </tr>
               `
           }
            courseList = courseList + `</table> <br><br>
                
                <form action="/addCourse" method="get">
                    <input type="submit" value="Add Course" /> <br>
                </form><br>
                <form action="/updateCourse" method="get">
                 <input type="submit" value="Update Course" /> <br>
                </form><br>
                <form action="/deleteCourse" method="get">
                    <input type="submit" value="Delete Course" /> <br>
                </form>
             `;
                
            res.setHeader("content-type", "text/html");
            res.end(courseList);
        } 
    }
});


server.listen(port,()=>console.log(`Server is running on port ${port}`));