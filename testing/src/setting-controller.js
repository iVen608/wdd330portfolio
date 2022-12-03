import jsonHelper from "./json.js";
import Utilities from "./utilities.js";

export default class SettingsController{
    constructor(){
        this.user;
        this.utilities = new Utilities();
        this.jsonCall = new jsonHelper();
        this.nasaURL = 'https://api.nasa.gov/planetary/apod?api_key=BsBlogPZGaaKbnAWPlalYXaktliZWWnWKGLbmbzQ';
        
    }
    //Initializes settings controller
    async init(){
        this.user = this.utilities.getUser();
        this.utilities.updateColor(this.user.color);
        this.addEvents();
        const nasaResults = await this.jsonCall.getResults(this.nasaURL);
        this.utilities.updateImage("backgroundImage", nasaResults.url);
        if(this.user.name !== ''){
            document.getElementById("name-input").value = this.user.name;
        }
    }

    addEvents(){
        //Adds click event to all color-palette buttons and if clicked
        //updates user's color preference and saves to local storage
        document.querySelectorAll(".color-palette").forEach((element) => {
            element.style.backgroundColor = element.dataset.color;
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
        }, false);;
    }
}