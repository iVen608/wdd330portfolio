import jsonHelper from "./json.js";
import Utilities from "./utilities.js";
import User from "./user.js";
import NasaView from "./nasa-view.js";
import nasa from "./nasa.js";

export default class SettingsController{
    constructor(){
        this.user;
        this.utilities = new Utilities();
        this.jsonCall = new jsonHelper();
        this.nasaView = new NasaView();
        this.nasaModel;
        
    }
    //Initializes settings controller
    async init(){
        //Initialize User
        const user = this.utilities.getUser();
        this.user = new User(user.color, user.name, user.todo, user.habit, user.focus, user.units);
        //Update Color Scheme based on User Preferences
        this.utilities.updateColor(this.user.color);
        //Call and set NASA daily picture to background
        const nasaResults = await this.jsonCall.getResults('https://api.nasa.gov/planetary/apod?api_key=BsBlogPZGaaKbnAWPlalYXaktliZWWnWKGLbmbzQ');
        this.nasaModel = new nasa(nasaResults);
        this.nasaView.displayImage(this.nasaModel.getUrl());
        this.nasaView.displayImageCopyright(this.nasaModel.getCopyright());
        //If user's name is set, update the input
        if(this.user.getName() !== ''){
            document.getElementById("name-input").value = this.user.name;
        }
        //Add event listeners
        this.addEvents();
        
    }

    addEvents(){
        //Adds click event to all color-palette buttons and if clicked
        //updates user's color preference and saves to local storage
        document.querySelectorAll(".color-palette").forEach((element) => {
            element.style.backgroundColor = element.dataset.color;
            element.style.backgroundColor = 'white'
            element.style.borderTop = `2px solid ${element.dataset.color}`;
            element.style.borderBottom = `2px solid ${element.dataset.color}`;
            element.style.boxShadow = `0px 0px 50px ${element.dataset.color}, inset 0px 0px 100px ${element.dataset.color}`
            element.addEventListener("click", (e) => {
                document.getElementById("color-selected").textContent = `Color selected: ${element.dataset.color.substring(0,1).toUpperCase() + element.dataset.color.slice(1)}`;
                this.utilities.updateColor(element.dataset.color);
                this.user.color = element.dataset.color;
                this.utilities.saveUser(this.user);
            }, false)    
        });
        //Adds click event to name-submit that takes the name input
        //and sets it to the user's object and saves to local storage
        document.getElementById("name-submit").addEventListener("click", (e) => {
            const inputName = document.getElementById("name-input").value;
            this.user.name = inputName;
            this.utilities.saveUser(this.user);
            document.getElementById("color-selected").textContent = "name has been changed";
        }, false);
        //Deletes saved information and recreates new User;
        document.getElementById("reset-user").addEventListener("click", (e) => {
            this.user = this.utilities.resetUser();
            this.init();
        }, false);
        const radios = document.getElementsByName("units");
        radios.forEach((element) => {
            if(element.value === this.user.units){
                element.checked = true;
            }
            element.addEventListener("change", (e) => {
                this.user.units = element.value;
                this.utilities.saveUser(this.user);
            })
        });
    }
}