// Create todo date
let todayDate = new Date();
let date = todayDate.getFullYear()+'-'+(todayDate.getMonth()+1)+'-'+todayDate.getDate();
let time = todayDate.getHours() + ":" + todayDate.getMinutes() + ":" + todayDate.getSeconds();
var dateTime = time +' '+' ['+date+']';

//Create item checking
const CHECK_ITEM ="fa-check-circle";
const UNCHECK_ITEM ="fa-circle-thin";
const STRIKE = "lineThrough";

//Store item details
let listItem, id;

//get Item from local
let toDoData = localStorage.getItem("TODO", JSON.stringify(listItem));

if(toDoData){
    listItem = JSON.parse(toDoData);
    id = listItem.length;
    loadListItem(listItem);
}
else{
    listItem = [];
    id = 0;
}

// load todo items
function loadListItem(array){
    array.forEach(function(item){
        addToDoList(item.name, item.id, item.dateTime, item.completed, item.deleted);
    });
}

// Add item inside the content
function addToDoList(toDoItem, itemId, createdTime, itemDone, itemDelete){
    if(itemDelete){
        return;
    }
    let complete = itemDone ? CHECK_ITEM : UNCHECK_ITEM;
    let strike = itemDone ? STRIKE : "";
    const itemList = `
        <li class = "item">
            <i class="fa ${complete}" job = "finish" id = "${itemId}" class = "checkbox" aria-hidden="true"></i>
            <p class = "text ${strike}">${toDoItem}</p>
            <p id ="date">${createdTime}</p>
            <i class="fa fa-times de"  job = "remove" id = "${itemId}" aria-hidden="true"></i>
        </li>
        `;
    const insertPosition = "beforeend";
    list.insertAdjacentHTML(insertPosition, itemList);
}

// Complete the item inside the content
function completeItem(element){
    element.classList.toggle(CHECK_ITEM);
    element.classList.toggle(UNCHECK_ITEM);
    element.parentNode.querySelector(".text").classList.toggle(STRIKE);
    // let strikeText = document.getElementById("todoItem");
    // strikeText.querySelector(".text").classList.toggle(STRIKE);
    listItem[element.id].completed = listItem[element.id].completed ? false : false;
}

// Remove the todo item
function removeItem(element){
    element.parentNode.parentNode.removeChild(element.parentNode);
    listItem[element.id].deleted = true;
}

// To check the Keypress or not
document.addEventListener("keyup", function(event){
    if(event.keyCode == 13)
    {
        let toDoItem = input.value;
        if (toDoItem){
            addToDoList(toDoItem, id, dateTime, false, false);
            listItem.push({
                name: toDoItem,
                id: id,
                completed: false,
                deleted: false,
                dateTime: dateTime
            });
            localStorage.setItem("TODO", JSON.stringify(listItem));
            id++;
        }
        input.value ="";
    }
});

// Check the job is complete or not
list.addEventListener("click", function(event){
    let element = event.target;
    let elementJob = element.attributes.job.value;
    if(elementJob == "finish"){
        completeItem(element);
    }
    else if(elementJob == "remove"){
        removeItem(element);
    }
    localStorage.setItem("TODO", JSON.stringify(listItem));
});

