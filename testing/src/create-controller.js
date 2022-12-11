import jsonHelper from "./json.js";
import Utilities from "./utilities.js";
import CreateView from "./create-view.js";
import ToDos from './ToDos.js';
import Habits from './Habits.js';
import User from './user.js';
export default class CreateController{
    constructor(){
        this.user;
        this.jsonCall = new jsonHelper();
        this.nasaURL = 'https://api.nasa.gov/planetary/apod?api_key=BsBlogPZGaaKbnAWPlalYXaktliZWWnWKGLbmbzQ';
        this.boredURL = 'https://www.boredapi.com/api/activity';
        this.utilities = new Utilities();
        this.selectedMenu = 'ToDo';
        this.createView = new CreateView();
        this.todos = new ToDos();
        this.habits = new Habits();
    }
    //Initializes create controller
    async init(){
        const user = this.utilities.getUser();
        this.user = new User(user.color, user.position, user.name, user.todo, user.habit);
        this.todos.setToDos(this.user.getToDos());
        this.habits.setHabits(this.user.getHabits());
        this.utilities.updateColor(this.user.getColor());
        this.addEvents();
        this.createView.init();
        //const nasaResults = await this.jsonCall.getResults(this.nasaURL);
        //this.utilities.updateImage("backgroundImage", nasaResults.url);
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