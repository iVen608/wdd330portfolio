import jsonHelper from "./json.js";
import Utilities from "./utilities.js";

export default class BreakController{
    constructor(){
        this.user;
        this.jsonCall = new jsonHelper();
        this.nasaURL = 'https://api.nasa.gov/planetary/apod?api_key=BsBlogPZGaaKbnAWPlalYXaktliZWWnWKGLbmbzQ';
        this.boredURL = 'https://www.boredapi.com/api/activity';
        this.utilities = new Utilities();
    }
    //Initializes break controller
    async init(){
        this.user = this.utilities.getUser();
        this.utilities.updateColor(this.user.color);
        this.addEvents();
        const nasaResults = await this.jsonCall.getResults(this.nasaURL);
        this.utilities.updateImage("backgroundImage", nasaResults.url);
        this.getActivity();
    }

    async getActivity(){
        const activityResults = await this.jsonCall.getResults(this.boredURL);
        document.getElementById("break-suggestion").textContent = activityResults.activity;
    }
    addEvents(){
        document.getElementById('refresh-icon').addEventListener('click', (e) => {
            this.getActivity();
        }, false)
    }
    
}