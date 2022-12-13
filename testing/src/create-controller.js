import jsonHelper from "./json.js";
import Utilities from "./utilities.js";
import CreateView from "./create-view.js";
import NasaView from "./nasa-view.js";
import ToDos from './ToDos.js';
import Habits from './Habits.js';
import User from './user.js';
import nasa from "./nasa.js";

export default class CreateController{
    constructor(){
        this.user;
        this.nasaView = new NasaView();
        this.jsonCall = new jsonHelper();
        this.utilities = new Utilities();
        this.selectedMenu = 'ToDo';
        this.createView = new CreateView();
        this.todos = new ToDos();
        this.habits = new Habits();
    }
    //Initializes create controller
    async init(){
        //Initialize User
        const user = this.utilities.getUser();
        this.user = new User(user.color, user.name, user.todo, user.habit, user.focus, user.units);
        //Set ToDos from User to Object
        this.todos.setToDos(this.user.getToDos());
        //Set Habits from User to Object
        this.habits.setHabits(this.user.getHabits());
        //Update Color Scheme based on User Preferences
        this.utilities.updateColor(this.user.getColor());
        //Initializes createView to set elements to properties
        this.createView.init();
        //Call and set NASA daily picture to background
        const nasaResults = await this.jsonCall.getResults('https://api.nasa.gov/planetary/apod?api_key=BsBlogPZGaaKbnAWPlalYXaktliZWWnWKGLbmbzQ');
        this.nasaModel = new nasa(nasaResults);
        this.nasaView.displayImage(this.nasaModel.getUrl());
        this.nasaView.displayImageCopyright(this.nasaModel.getCopyright());
        //Adds event listeners
        this.addEvents();
    }
    addEvents(){
        const todoToggle = document.getElementById("toDoToggle");
        const habitToggle = document.getElementById("habitToggle");
        const submitButton = document.getElementById("submit");
        todoToggle.addEventListener("click", (e) => {
            this.createView.openToDoMenu();
            this.selectedMenu = 'ToDo';
        }, false);
        habitToggle.addEventListener("click", (e) => {
            this.createView.openHabitMenu();
            this.selectedMenu = 'Habit'
        }, false);
        submitButton.addEventListener('click', (e) => {
            const timestamp = Date.now();
            if(this.selectedMenu === 'Habit'){
                let frequency = 0;
                const habit = document.getElementById("habitInput").value;
                if(habit.trim(" ") === ""){
                    return;
                }
                const radios = document.getElementsByName("frequency");
                let radioCheck = false;
                radios.forEach((element) => {
                    if(element.checked){
                        frequency = element.value;
                        radioCheck = true;
                    }
                });
                if(radioCheck === false){
                    return;
                }
                const date = new Date();
                
                this.habits.addHabit(habit, timestamp, date, frequency);
                this.user.setHabits(this.habits.getHabits());
                
            } else {
                const todo = document.getElementById("todoInput").value;
                if(todo.trim(" ") === ""){
                    return;
                }
                this.todos.addToDo(todo, timestamp);
                this.user.setToDos(this.todos.getToDos());
            }
            this.utilities.saveUser(this.user);
            this.createView.notify(this.selectedMenu);
            this.createView.resetFields();
        }, false);
    }
}