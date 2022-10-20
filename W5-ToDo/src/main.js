import ls from "./ls.js";
import ToDos from "./ToDos.js";
import utilities from "./utilities.js";
const storageKey = "todos"
const lsHanlder = new ls(storageKey);
const ToDosHandler = new ToDos("todo-container");
const utilitiesHandler = new utilities("todo-container");
if(lsHanlder.getSavedItems() === null){
    lsHanlder.setSavedItems([]);
}

const saved = lsHanlder.getSavedItems();
ToDosHandler.setToDos(saved);
console.log(saved);

function bindRemoveEvent(id){
    const div = document.getElementById(String(id));
    div.lastChild.addEventListener("touchend", (e) => {
        ToDosHandler.removeToDo(id);
        utilitiesHandler.removeView(id);
        utilitiesHandler.updateCounter(ToDosHandler.getTotalTasksLeft());
        lsHanlder.setSavedItems(ToDosHandler.getToDos());
    }, false)
}

function bindCompleteEvent(id){
    const div = document.getElementById(String(id));
    div.firstElementChild.addEventListener("touchend", (e) => {
        const value = ToDosHandler.toggleCompleted(id);
        utilitiesHandler.toggleView(id, value);
        utilitiesHandler.updateCounter(ToDosHandler.getTotalTasksLeft());
        lsHanlder.setSavedItems(ToDosHandler.getToDos());
    }, false)
}

function renderView(list){
    list.forEach(element => {
        utilitiesHandler.createView(element.title, element.id, element.completed);
        bindRemoveEvent(element.id);
        bindCompleteEvent(element.id);
    });
}



document.getElementById("new-button").addEventListener("touchend", (e) => {
    const name = document.getElementById("new-reminder").value;
    utilitiesHandler.updateCounter(ToDosHandler.getTotalTasksLeft());
    if(name === ""){
        return;
    }
    const timestamp = Date.now();
    ToDosHandler.addToDo(name, timestamp);
    console.log(ToDosHandler.getToDos());
    lsHanlder.setSavedItems(ToDosHandler.getToDos());
    utilitiesHandler.createView(name, timestamp);
    bindRemoveEvent(timestamp);
    bindCompleteEvent(timestamp);
    document.getElementById("new-reminder").value = "";
}, false);

utilitiesHandler.updateCounter(ToDosHandler.getTotalTasksLeft());
const filter_buttons = document.querySelector("#filter-container").getElementsByTagName("button"); 
for(let button of filter_buttons){
    button.addEventListener("touchend", (e)=> {
        if(button.classList.contains("selected") === false){
            const filtered = ToDosHandler.getFilteredList(button.value);
            utilitiesHandler.selectButton(button.value);
            utilitiesHandler.removeList();
            renderView(filtered);
        }
    }, false)
}

window.addEventListener("load", () => {
    renderView(ToDosHandler.getToDos());
  });

    /*.forEach(button => {
    console.log(button.value);
}

)
/*let submit_buttons = document.getElementsByClassName("submit");
for(let button of submit_buttons){
    button.parentElement.id = Date.now();
    button.addEventListener("touchstart", (e) => {
        e.stopPropagation();
        e.preventDefault();
        if(button.parentElement.classList.contains("completed")){
            button.parentElement.classList.remove("completed")
        } else {
            button.parentElement.classList.add("completed")
        }
        console.log(Date.now());
    }, false);
    button.addEventListener("click", (e) => {
        e.stopPropagation();
        e.preventDefault();
        if(button.parentElement.classList.contains("completed")){
            button.parentElement.classList.remove("completed")
        } else {
            button.parentElement.classList.add("completed")
        }
        console.log(Date.now());
    }, false);
}*/