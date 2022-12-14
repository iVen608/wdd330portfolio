import jsonHelper from "./json.js";
import nasa from "./nasa.js";
import Utilities from "./utilities.js";
import HomeView from "./home-view.js";
import NasaView from "./nasa-view.js";
import User from "./user.js";
import ToDos from './ToDos.js';
import Habits from './Habits.js';


export default class HomeController{
    constructor(){
        this.user;
        this.utilities = new Utilities();
        this.jsonCall = new jsonHelper();
        this.homeView = new HomeView();
        this.nasaView = new NasaView();
        this.nasaModel;
        this.todos = new ToDos();
        this.habits = new Habits();
    }

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
        //Call and set NASA daily picture to background
        const nasaResults = await this.jsonCall.getResults('https://api.nasa.gov/planetary/apod?api_key=BsBlogPZGaaKbnAWPlalYXaktliZWWnWKGLbmbzQ');
        this.nasaModel = new nasa(nasaResults);
        this.nasaView.displayImage(this.nasaModel.getUrl());
        this.nasaView.displayImageCopyright(this.nasaModel.getCopyright());
        //Home page Specific Functions
        //Gets tempurature based on GeoLocation
        this.getTemperature();
        //Customized greeting based on time of day
        this.homeView.displayTime(this.user.getName());
        //Build todo/habit list
        this.renderToDoList();
        this.renderHabitList();
        //this.homeView.buildView(this.user);
        //Adds event listeners
        this.addEvents();
    }

    
    deleteElement(id){
        //If the id is in ToDo
        if(this.user.todo.filter(e => e.id === id).length > 0){
            this.todos.removeToDo(id);
        //Else is in Habit
        } else if (this.user.habit.filter(e => e.id === id).length > 0){
            this.habits.removeHabit(id);
        //If not in either
        } else {
            return;
        }
        this.utilities.saveUser(this.user);
        this.homeView.removeListElement(id);
    }

    toggleElement(id){
        //If the id is in ToDo
        if(this.user.todo.filter(e => e.id === id).length > 0){
            const value = this.todos.toggleCompleted(id);
            this.homeView.toggleListElement(id, value);
        //Else is in Habit
        } else if (this.user.habit.filter(e => e.id === id).length > 0){
            const streak = this.habits.addStreak(id);
            const frequency = this.habits.getFrequency(id);
            this.homeView.toggleListElementHabit(id, true, streak, frequency);
        //If not in either
        } else {
            return;
        }
        this.utilities.saveUser(this.user);
    }

    buttons(parentNode, id, value, option){
        const div = document.createElement("div");
        div.classList.add('hidden', 'col-3', 'small-padding');
        parentNode.appendChild(div);
        parentNode.dataset.id = id;
        const button = document.createElement("button");
        button.classList.add('rounded-corners', "color-scheme-border", 'black-background', 'border-left-none', 'border-right-none', 'white-text');
        button.textContent = "Complete";
        button.dataset.toggle = 'toggle';
        div.appendChild(button);
        const button1 = document.createElement("button");
        button1.classList.add('rounded-corners', "color-scheme-border", 'black-background', 'border-left-none', 'border-right-none', 'white-text');
        button1.textContent = "Focus";
        button1.dataset.focus = 'focus';
        div.appendChild(button1);
        const button2 = document.createElement("button");
        button2.classList.add('rounded-corners', "color-scheme-border", 'black-background', 'border-left-none', 'border-right-none', 'white-text');
        button2.textContent = "Delete";
        button2.dataset.delete = 'delete';
        if(value === false && option === "habit"){
            this.utilities.toggleClass(button, "color-scheme-border", "opacity-0");
            this.utilities.toggleClass(button1, "color-scheme-border", "opacity-0");
            this.utilities.toggleClass(button2, "color-scheme-border", "white-border");
        } else if(value === true && option === "todo"){
            this.utilities.toggleClass(button, "color-scheme-border", "white-border");
            button.textContent = "Undo";
            this.utilities.toggleClass(button1, "color-scheme-border", "opacity-0");
            this.utilities.toggleClass(button2, "color-scheme-border", "white-border");
        }
        div.appendChild(button2);
    }

    renderToDoList(){
        this.todos.getToDos().forEach(todo => {
            const div = document.createElement("div");
            div.classList.add( 'black-background', 'hundred-width', 'rounded-corners', 'small-padding', 'small-margin-top');
            if(todo.completed === false){
                div.classList.add("color-scheme-border");
            } else {
                div.classList.add("white-border");
            }
            document.getElementById("listContainer").appendChild(div);
            const p = document.createElement("p");
            p.textContent = todo.title;
            p.dataset.title = 'listTitle';
            p.classList.add('centered-text');
            const p2 = document.createElement("p");
            p2.classList.add('centered-text');
            p2.textContent = "ToDo";
            div.appendChild(p);
            div.appendChild(p2);
            this.buttons(div, todo.id, todo.completed, "todo");
            this.homeView.appendToList(div);
        });
    }

    renderHabitList(){
        this.habits.getHabits().forEach((habit) => {
            const div = document.createElement("div");
            div.classList.add( 'black-background', 'color-scheme-border', 'hundred-width', 'rounded-corners', 'small-padding', 'small-margin-top');
            document.getElementById("listContainer").appendChild(div);
            const p = document.createElement("p");
            p.textContent = habit.habit;
            p.dataset.title = 'listTitle';
            const p2 = document.createElement("p");
            p2.textContent = `Streak: ${habit.streak} (${habit.frequency})`;
            p.classList.add('centered-text');
            p2.classList.add('centered-text');
            p2.dataset.title = 'listTitle';
            const value = this.habits.validDate(habit.id);
            if(value === false){
                this.utilities.toggleClass(div, "color-sheme-border", "white-border");
            }
            div.appendChild(p);
            div.appendChild(p2);
            this.buttons(div, habit.id, value, "habit");
        })
    }

    focusElement(id){
        this.user.setFocus(id);
        this.utilities.saveUser(this.user);
        window.location.href = "./view/focus.html";
    }

    addEvents(){
        document.querySelectorAll('[data-title]').forEach((element) => {
            element.addEventListener("click", (e) => {this.homeView.toggleListElementButtons(element);}, false)
        });
        document.querySelectorAll('[data-delete]').forEach((element) => {
            element.addEventListener("click", (e) => {
                const parentId = parseInt(element.parentElement.parentElement.dataset.id);
                this.deleteElement(parentId);}, false)
        });
        document.querySelectorAll('[data-focus]').forEach((element) => {
            element.addEventListener("click", (e) => {
                if(element.classList.contains("opacity-0")){
                    return;
                }
                const parentId = parseInt(element.parentElement.parentElement.dataset.id);
                this.focusElement(parentId);}, false)
        });

        document.querySelectorAll('[data-toggle]').forEach((element) => {
            element.addEventListener("click", (e) => {
                if(element.classList.contains("opacity-0")){
                    return;
                }
                const parentId = parseInt(element.parentElement.parentElement.dataset.id);
                this.toggleElement(parentId);}, false)
        });
        const menuWheel = document.getElementById("menuWheel");
        const menuIcon = document.getElementById("menu-icon");

        document.getElementById("menuButton").addEventListener("click", e => {
            if(menuWheel.classList.contains('visible') && menuIcon.classList.contains('x')){
                menuWheel.classList.remove('visible');
                setTimeout(() =>{menuIcon.classList.remove('x');}, 500)
                menuWheel.classList.add("invisible");
            }else if(menuWheel.classList.contains('invisible')){
                menuWheel.classList.add('visible');
                menuWheel.classList.remove("invisible");
                setTimeout(() =>{menuIcon.classList.add('x');}, 500)
            }else {
                menuWheel.classList.add('visible');
                setTimeout(() =>{menuIcon.classList.add('x');}, 500)
            }
        });
    }

    async getTemperature(){
        try{
            const coords = await this.utilities.getGeoLocation();
            //units can either be imperial, standard, or metric
            const units = this.user.getUnits();
            const lat = coords.coords.latitude;
            const lon = coords.coords.longitude;
            const tempResults = await this.jsonCall.getResults('https://api.openweathermap.org/data/2.5/weather?lat='+ lat +'&lon=' + lon + '&units=' + units + '&appid=942be51159fb8974885b140d119e7493');
            const displayUnit = units == 'imperial' ? '°F' : units == 'metric' ? '°C' :  'K';
            this.homeView.displayTemperature(Math.ceil(tempResults.main.temp), displayUnit);
        }catch(err){
            console.log(err);
        }
    }
}





