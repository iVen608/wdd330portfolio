import jsonHelper from "./json.js";
import Utilities from "./utilities.js";
import User from "./user.js";
import nasa from "./nasa.js";
import NasaView from "./nasa-view.js";


export default class BreakController{
    constructor(){
        this.user;
        this.jsonCall = new jsonHelper();
        this.nasaView = new NasaView();
        this.utilities = new Utilities();
        this.nasaModel;
    }
    //Initializes break controller
    async init(){
        //Initialize User
        const user = this.utilities.getUser();
        this.user = new User(user.color, user.name, user.todo, user.habit, user.focus, user.units);
        //Update Color Scheme based on User Preferences
        this.utilities.updateColor(this.user.getColor());
        //Call and set NASA daily picture to background
        const nasaResults = await this.jsonCall.getResults('https://api.nasa.gov/planetary/apod?api_key=BsBlogPZGaaKbnAWPlalYXaktliZWWnWKGLbmbzQ');
        this.nasaModel = new nasa(nasaResults);
        this.nasaView.displayImage(this.nasaModel.getUrl());
        this.nasaView.displayImageCopyright(this.nasaModel.getCopyright());
        //Adds event listeners
        this.addEvents();
        //Gets the first activity on load
        this.getActivity();
    }

    async getActivity(){
        const activityResults = await this.jsonCall.getResults('https://www.boredapi.com/api/activity');
        document.getElementById("break-suggestion").textContent = activityResults.activity;
    }
    addEvents(){
        document.getElementById('refresh-icon').addEventListener('click', (e) => {
            this.getActivity();
        }, false)
    }
    
}