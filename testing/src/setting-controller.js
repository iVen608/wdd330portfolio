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
        try{
            const coords = await this.utilities.getGeoLocation();
            //units can either be imperial, standard, or metric
            const units = 'metric';
            const url = this.utilities.buildTemperatureUrl(coords.coords.latitude, coords.coords.longitude, units);
            const lat = coords.coords.latitude;
            const lon = coords.coords.longitude;
            const tempResults = await this.jsonCall.getResults('https://api.openweathermap.org/data/2.5/weather?lat='+ lat +'&lon=' + lon + '&units=' + units + '&appid=942be51159fb8974885b140d119e7493');
            console.log(tempResults);
            const displayUnit = units == 'imperial' ? '°F' : units == 'metric' ? '°C' :  'K';
            this.utilities.displayTemperature(Math.ceil(tempResults.main.temp), displayUnit);
        }catch(err){
            console.log(err);
        }
        
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

        document.getElementById("reset-user").addEventListener("click", (e) => {
            this.user = this.utilities.resetUser();
            this.init();
        }, false)
    }
}