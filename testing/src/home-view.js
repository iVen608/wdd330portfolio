import Utilities from "./utilities.js";
export default class HomeView{
    constructor(){
        this.utilities = new Utilities();
    }
    displayTime(name){
        const hours = new Date().getHours();
        const titleText = document.getElementById("titleText");
        if(hours > 3 && hours < 11){
            titleText.textContent = "Good morning, " + name;
        }else if(hours > 10 && hours < 17){
            titleText.textContent = "Good afternoon, " + name;
        } else {
            titleText.textContent = "Good evening, " + name;
        }
    }

    displayTemperature(temp ,displayUnit){
        document.getElementById("tempText").innerHTML = temp + displayUnit;
    }

    toggleListElementButtons(element){
        const parent = element.parentNode;
        const buttonContainer = parent.lastChild;
        if(buttonContainer.classList.contains("hidden")){
            this.utilities.toggleClass(buttonContainer, "hidden", "grid");
        } else {
            this.utilities.toggleClass(buttonContainer, "grid", "hidden");
        }
    }

    toggleListElementHabit(id, value, streak, frequency){
        const element = document.querySelector(`[data-id='${id}']`);
        if(value === true){
            this.utilities.toggleClass(element, "color-scheme-border", "white-border");
            element.children[1].textContent = `Streak: ${streak} (${frequency})`
            Array.from(element.children[2].children).forEach((e) => {
                this.utilities.toggleClass(e, "color-scheme-border", "opacity-0");
                if(e.hasAttribute("data-delete")) {
                    this.utilities.toggleClass(e, "opacity-0", "white-border");
                }
        })
    }
    }

    appendToList(element){
        document.getElementById("listContainer").appendChild(element);
    }

    removeListElement(id){
        const element = document.querySelector(`[data-id='${id}']`);
        element.remove();
    }

    toggleListElement(id, value){
        const element = document.querySelector(`[data-id='${id}']`);
        if(value === true){
            this.utilities.toggleClass(element, "color-scheme-border", "white-border");
            Array.from(element.children[2].children).forEach((e) => {
                this.utilities.toggleClass(e, "color-scheme-border", "white-border");
                if(e.hasAttribute("data-focus")) {
                    this.utilities.addClass(e, "opacity-0");
                } else if(e.hasAttribute("data-toggle")){
                    e.textContent = 'Undo';
                }
            });
        } else {
            this.utilities.toggleClass(element, "white-border", "color-scheme-border");
            Array.from(element.children[2].children).forEach((e) => {
                this.utilities.toggleClass(e, "white-border", "color-scheme-border");
                if(e.hasAttribute("data-focus")) {
                    this.utilities.removeClass(e, "opacity-0");
                }
                if(e.hasAttribute("data-toggle")){
                    e.textContent = 'Complete';
                }
            });
        }  
    }

}