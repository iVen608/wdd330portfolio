import Utilities from "./utilities.js";

export default class CreateView{
    constructor(){
        this.utilities = new Utilities();
    }
    init(){
        this.todoToggle = document.getElementById("toDoToggle");
        this.habitToggle = document.getElementById("habitToggle");
        this.todoMenu = document.getElementById("todoCreateMenu");
        this.habitMenu = document.getElementById("habitCreateMenu");
        this.alertContainer = document.getElementById("alert-container");
        this.alertText = document.getElementById("alert-text");
    }
    openToDoMenu(){
        this.utilities.removeClass(this.habitToggle, "selected");
        this.utilities.addClass(this.todoToggle, "selected");
        this.utilities.removeClass(this.todoMenu, "hidden");
        this.utilities.addClass(this.habitMenu, "hidden");
    }
    openHabitMenu(){
        this.utilities.addClass(this.habitToggle, "selected");
        this.utilities.removeClass(this.todoToggle, "selected");
        this.utilities.addClass(this.todoMenu, "hidden");
        this.utilities.removeClass(this.habitMenu, "hidden");
    }
    notify(menu){
        this.alertText.textContent = `${menu} created`;
        this.utilities.addClass(this.alertContainer, 'alert-popup');
        window.setTimeout(() => {this.utilities.removeClass(this.alertContainer, 'alert-popup');}, 2250);
        
    } 
    resetFields(){
        document.getElementById("todoInput").value = '';
        document.getElementById("habitInput").value = '';
    } 
}