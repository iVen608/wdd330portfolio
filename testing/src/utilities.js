import ls from "./ls.js";
import jsonHelper from "./json.js";

 export default class Utilities{
    constructor(){
        this.storage = new ls('user');
        this.lat;
        this.lon;
        this.tempUrl;
        this.jsonCall = new jsonHelper();
    }
    updateImage(element, url){
        document.getElementById(element).src = url;
    }
    getUser(){
        let user = this.storage.getSavedItems();
        if(user === null){
            user = {
                position: {lat: '0', lon: '0'},
                name: '',
                focus: 'blue',
                color: 'red',
                todo: [],
                habit: [],
                units: 'imperial',
            }
            this.storage.setSavedItems(user);
        }
        return user;
    }
    resetUser(){
        this.storage.deleteSavedItem();
        return this.getUser();
    }
    saveUser(user){
        this.storage.setSavedItems(user);
    }
    updateColor(color){
        document.documentElement.style.setProperty('--color-selection', color);
    }
    addClass(element, className){
        if(element.classList.contains(className)){
            return;
        }
        element.classList.add(className);
    }
    removeClass(element, className){
        if(!element.classList.contains(className)){
            return;
        }
        element.classList.remove(className);
    }

    toggleClass(element, fromClass, toClass){
        this.removeClass(element, fromClass);
        this.addClass(element, toClass);
    }

    buildTemperatureUrl(lat, lon, units){
        return `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&appid=942be51159fb8974885b140d119e7493'`;
    }

    async getGeoLocation(){
        return new Promise(function(resolve, reject){
            navigator.geolocation.getCurrentPosition(resolve, reject);
        });
    }
}