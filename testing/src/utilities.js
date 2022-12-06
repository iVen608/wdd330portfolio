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
                color: 'blue',
                todo: [],
                habit: [],
            }
            this.storage.setSavedItems(user);
        }
        return user;
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
}