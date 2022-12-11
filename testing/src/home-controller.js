import jsonHelper from "./json.js";
import nasa from "./nasa.js";
import Utilities from "./utilities.js";
import HomeView from "./home-view.js";
import User from "./user.js";

export default class HomeController{
    constructor(){
        this.user;
        this.utilities = new Utilities();
        this.jsonCall = new jsonHelper();
        this.homeView = new HomeView();
        this.nasaModel;
    }

    async init(){
        const nasaResults = await this.jsonCall.getResults('https://api.nasa.gov/planetary/apod?api_key=BsBlogPZGaaKbnAWPlalYXaktliZWWnWKGLbmbzQ');
        this.utilities.updateImage("backgroundImage", nasaResults.url);
        this.nasaModel = new nasa(nasaResults);
        const user = this.utilities.getUser();
        this.user = new User(user.color, user.position, user.name, user.todo, user.habit, user.focus);
        console.log(this.user);
        this.utilities.updateColor(this.user.getColor());
        this.homeView.displayTime(this.user.getName());
        window.setInterval(this.homeView.displayTime(this.user.getName()), 6000);
        this.homeView.buildView(this.user);
        this.addEventListeners();
        console.log(this.user.focused);
    }

    
    deleteElement(id){
        if(this.user.todo.filter(e => e.id === id).length > 0){
            console.log("z")
            const index = this.user.todo.findIndex(x => x.id === id);
            console.log(index);
            this.user.todo.splice(index, 1);
        } else if (this.user.habit.filter(e => e.id === id).length > 0){
            console.log("w")
            const index = this.user.habit.findIndex(x => x.id === id);
            this.user.habit.splice(index, 1);
        }
        this.utilities.saveUser(this.user);
        this.homeView.removeListElement(id);
    }

    focusElement(id){
        this.user.setFocus(id);
        this.utilities.saveUser(this.user);
        window.location.href = "./view/focus.html";
    }

    addEventListeners(){
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
                const parentId = parseInt(element.parentElement.parentElement.dataset.id);
                this.focusElement(parentId);}, false)
        });
    }
}



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


//Change color scheme

const listContainer = document.getElementById("listContainer");
function colorPalette(){
    for(let r = 0; r < 5; r++){
        for(let g = 0; g < 5; g++){
            const div = document.createElement("div");
                div.style.backgroundColor = `rgb(${r*51}, ${g*51}, ${g*51})`;
                const hexLabel = document.createElement("p");
                hexLabel.textContent = `${r*51}, ${g*51}, ${g*51}`;
                div.appendChild(hexLabel);
                listContainer.appendChild(div);
        }
    }
};




//colorPalette();
