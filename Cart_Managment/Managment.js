//This class represent and item
var Item = /** @class */ (function () {
    function Item(price, name, quantity) {
        this.count = 0;
        this.price = price;
        this.name = name;
        this.quantity = quantity;
    }
    Item.prototype.disInfo = function () {
        console.log("name is " + this.name);
        console.log("id is " + this.price);
        console.log("quantity is " + this.quantity);
    };
    return Item;
}());
var tempI = new Item(0, "temp", 1);
var list = [tempI]; // all input item
//This function add an item(name, price, quantity) to the storage
function addItem(name, price, quantityId) {
    var temp = collect(quantityId);
    var quantity = eval(temp);
    // console.log("quantity= "+quantity);
    var newItem = new Item(price, name, quantity);
    list[0].count++;
    newItem.disInfo();
    list.push(newItem);
    document.getElementById("nberItem").innerHTML = " You have: " + list[0].count + " in your cart!";
    saveInfos();
    clearQuantityInput(quantityId);
}
//This function clear the current content of the element id
function clearQuantityInput(elementID) {
    document.getElementById(elementID).innerHTML = "";
}
//This function collect input from the html scree
function collect(quantityId) {
    var quantity = document.getElementById(quantityId).value;
    var inputObj;
    if (quantity == "") {
        inputObj = "1";
    }
    else {
        inputObj = quantity;
    }
    // console.log(inputObj);
    return inputObj;
}
//this function save all the list in a session Storage
function saveInfos() {
    var blogString = JSON.stringify(list); //convert object to string
    sessionStorage.setItem("listItem", blogString);
}
function displayInfos(item) {
    console.log("display from displayInfos function: ");
    console.log(item);
    var table = document.getElementById("outputTable");
    var body = table.getElementsByTagName("tbody")[0];
    var newRow = body.insertRow(-1);
    var cell1 = newRow.insertCell(0);
    cell1.innerHTML = item.name;
    var cell2 = newRow.insertCell(1);
    cell2.innerHTML = "" + item.price;
    var cell3 = newRow.insertCell(2);
    cell3.innerHTML = "" + item.quantity;
    var cell4 = newRow.insertCell(3);
    cell4.innerHTML = "" + (item.quantity * item.price);
}
// This function retrieve the client infos from the session storage
function retrieveInfos() {
    var sum = 0;
    var data = sessionStorage.getItem("listItem");
    var list = JSON.parse(data);
    console.log("objects in retrieveInfos: ");
    console.log(list);
    var size = list.length;
    console.log("list.length: " + size);
    if (size == 1) {
        console.log("size is 1, so no item added");
        document.getElementById("nberItem").innerHTML = " You have 0 item in your cart! Please add item to checkout.";
    }
    else {
        document.getElementById("nberItem").innerHTML = " You have: " + list[0].count + " in your cart!";
        for (var i = 1; i < size; i++) {
            displayInfos(list[i]);
            sum = sum + (list[i].price * list[i].quantity);
        }
    }
    document.getElementById("total").innerHTML = "Your Total Bill is: $" + sum.toFixed(2);
}
