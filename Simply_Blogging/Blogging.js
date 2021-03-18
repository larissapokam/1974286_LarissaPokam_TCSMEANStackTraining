
var blogList = [];
//var objList = {};
var index = 0;
var count = 0;

//This function get input from the user and save it to and object
function getInput()
{
    var inputObj = {};

    inputObj.title = document.getElementById("title").value;
    inputObj.article = document.getElementById("article").value;
    var imageI = document.getElementById("img");//.files[0].name;
    if(imageI.getAttribute('src') == "")
    {
        imageI = "defaultImage.jpg"
    }

    inputObj.imag = imageI;
   
    //console.log(inputObj);
   
    return inputObj;
}


/*this function display the information to the html page
function Display(data)
{
    document.getElementById("titleInfo").innerHTML=data.title;
    document.getElementById("ArticleInfo").innerHTML=data.article;
   document.getElementById("imgInfo").src=data.image;
} */

//this function clear the input in the form
function clearInput()
{
    document.getElementById("title").value = "";
    document.getElementById("article").value = "";
    document.getElementById("img").value = "";

}

//this function save all the blog list in a session Storage
function saveInfos()
{
    var blogString = JSON.stringify(blogList);//convert object to string
    sessionStorage.setItem("blogInfos", blogString);

}


function AddBlog()
{
    if(index % 4 == 0)
    {
        index = 0;
      //  clearcontent("divCol0")
    }
  
   var blog = getInput();
   blogList.push(blog);
   clearInput(); 
   saveInfos();
   // Display(blog);

    let idString =""+index;
    createdBlog(blog,idString);

    count = count + 1;
    index = index + 1;

    //save the number of blogs created
    var nberBlog = JSON.stringify(count);//convert object to string
    sessionStorage.setItem("size", nberBlog);

   console.log("index: " + index);
}


//this function create a new blog then display on the html page
function createdBlog(data, id)
{
   
    // create a new div element
    const title = document.createElement("p");
    const article = document.createElement("p");
    var img = document.createElement('img'); 
  
    // and give it some content
    const newTitle = document.createTextNode(data.title);
    const newArticle = document.createTextNode(data.article);
    img.src = data.imag;
                
    
    // add the text node to the newly created div
    title.appendChild(newTitle);
    article.appendChild(newArticle);
   
    console.log("objListlength: " + count);
    console.log("blogListlength: " + count);

    var ids = "divCol"+id;
   // if(count <= 3 )
   if ($(ids).is(':empty'))
    {
        // add the newly created element and its content into the DOM
       // var ids = "divCol"+id;
       // clearcontent(ids);
        document.getElementById(ids).appendChild(title); 
        document.getElementById(ids).appendChild(article); 
        document.getElementById(imgInfo0).appendChild(img); 
    }
    else{
        // add the newly created element and its content into the DOM
        //var ids = "divCol"+id;
        clearcontent(ids);
        document.getElementById(ids).appendChild(title); 
        document.getElementById(ids).appendChild(article); 
    }

      
}


// This function retrieve the client infos from the session storage
function retrieveInfos()
{
    if(count > 3)
    {
        index = count % 4;
      //  clearcontent("divCol0")
    }
    else
    {
        index = count;
      //  clearcontent("divCol0")
    }
    var data = sessionStorage.getItem("blogInfos");
    var objList = JSON.parse(data);

    var size = sessionStorage.getItem("size");
    console.log("size " + size);
   // count = JSON.parse(size);
    if(size == null)
    {
        count = 0;
    }
    else
    {
        count = eval(size);
    }
    
    console.log("objects: ");
    console.log(objList);

    var ind = count ;
    console.log("Count or objList length: "+ ind);

    var j = 0;
    if(count > 4)
    {
        var limit = ind-4; 

        for(let i= (ind-1); i>=limit; i--)
        {
            //displayInfos(objList[i]);
            let idString =""+j;
            createdBlog(objList[i],idString);

            console.log("ids from retrieve: " + j);
            j = j+1;
        }
    }
    else{

        for(let i= (count-1); i>=0; i--)
        {
            //displayInfos(objList[i]);
            let idString =""+j;

            console.log("j idB: " + idString);
            console.log("i =  " + i);
            
            console.log("objList[i]: " + objList[i]);

            createdBlog(objList[i],idString);

           // console.log("idB: " + j);
            j = j+1;
        }
    }

}
 

//This function clear the current content of the element id
function clearcontent(elementID) { 
    document.getElementById(elementID).innerHTML = ""; 
} 
