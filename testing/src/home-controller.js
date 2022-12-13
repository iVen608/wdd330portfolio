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
        this.homeView.buildView(this.user);
        //Adds event listeners
        this.addEvents();
        console.log(this.user);
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

    focusElement(id){
        this.user.setFocus(id);
        this.utilities.saveUser(this.user);
        window.location.href = "./view/focus.html";
    }

    addEvents(){
        document.querySelectorAll('[data-title]').forEach((element) => {
            element.addEventListener("click", (e) => {this.homeView.toggleListElementButtons(element);}, false)
            console.log("a");
        });
        document.querySelectorAll('[data-delete]').forEach((element) => {
            element.addEventListener("click", (e) => {
                const parentId = parseInt(element.parentElement.parentElement.dataset.id);
                this.deleteElement(parentId);}, false)
        });
        document.querySelectorAll('[data-focus]').forEach((element) => {
            element.addEventListener("click", (e) => {
                const parentId = parseInt(element.parentElement.parentElement.dataset.id);
                this.focusElement(parentId);}, false)
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
            console.log(tempResults);
            const displayUnit = units == 'imperial' ? '°F' : units == 'metric' ? '°C' :  'K';
            this.homeView.displayTemperature(Math.ceil(tempResults.main.temp), displayUnit);
        }catch(err){
            console.log(err);
        }
    }
}





