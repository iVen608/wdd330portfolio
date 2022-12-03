import ls from "./ls.js";

export default class Utilities{
    constructor(){
        this.storage = new ls('user');
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
                color: '',
                todo: [],
                habit: [],
            }
            this.storage.setSavedItems(user);
        }
        console.log(user);
        return user;
    }
    saveUser(user){
        this.storage.setSavedItems(user);
    }
    updateColor(color){
        document.documentElement.style.setProperty('--color-selection', color);
    }
}