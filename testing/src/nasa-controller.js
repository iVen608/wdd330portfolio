import jsonHelper from "./json.js";
import Utilities from "./utilities.js";
import User from "./user.js";
import nasa from "./nasa.js";
import NasaView from "./nasa-view.js";

export default class NasaController{
    constructor(){
        this.user;
        this.nasaModel;
        this.nasaView = new NasaView();
        this.jsonCall = new jsonHelper();
        this.nasaURL = 'https://api.nasa.gov/planetary/apod?api_key=BsBlogPZGaaKbnAWPlalYXaktliZWWnWKGLbmbzQ';
        this.utilities = new Utilities();
    }
    //Initializes break controller
    async init(){
        //Initialize User
        const user = this.utilities.getUser();
        this.user = new User(user.color, user.name, user.todo, user.habit, user.focus, user.units);
        //Update Color Scheme based on User Preferences
        this.utilities.updateColor(this.user.color);
        //Call and set NASA daily picture to background
        const nasaResults = await this.jsonCall.getResults(this.nasaURL);
        this.nasaModel = new nasa(nasaResults);
        this.utilities.updateImage("backgroundImage", this.nasaModel.getUrl());
        this.nasaView.displayDailyResult(this.nasaModel.getTitle(), this.nasaModel.getDescription());
        this.nasaView.displayImageCopyright(this.nasaModel.getCopyright());
    }
    
}