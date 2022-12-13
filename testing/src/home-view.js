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
        console.log("a");
        const parent = element.parentNode;
        const buttonContainer = parent.lastChild;
        if(buttonContainer.classList.contains("hidden")){
            this.utilities.removeClass(buttonContainer, "hidden");
            this.utilities.addClass(buttonContainer, "grid");
        } else {
            this.utilities.removeClass(buttonContainer, "grid");
            this.utilities.addClass(buttonContainer, "hidden");
        }
    }

    removeListElement(id){
        const element = document.querySelector(`[data-id='${id}']`);
        element.remove();
    }

    buildView(user) {
        document.getElementById("listContainer").innerHTML = '';
        const buttons = function(parentNode, id){
            const div = document.createElement("div");
            div.classList.add('hidden', 'col-3', 'small-padding');
            parentNode.appendChild(div);
            parentNode.dataset.id = id;
            const button = document.createElement("button");
            button.classList.add('rounded-corners', 'black-background', 'color-scheme-border', 'border-left-none', 'border-right-none', 'white-text');
            button.textContent = "Toggle";
            button.dataset.toggle = 'toggle';
            div.appendChild(button);
            const button1 = document.createElement("button");
            button1.classList.add('rounded-corners', 'black-background', 'color-scheme-border', 'border-left-none', 'border-right-none', 'white-text');
            button1.textContent = "Focus";
            button1.dataset.focus = 'focus';
            div.appendChild(button1);
            const button2 = document.createElement("button");
            button2.classList.add('rounded-corners', 'black-background', 'color-scheme-border', 'border-left-none', 'border-right-none', 'white-text');
            button2.textContent = "Delete";
            button2.dataset.delete = 'delete';
            div.appendChild(button2);
        }
        user.getToDos().forEach((element) => {
            const div = document.createElement("div");
            div.classList.add( 'black-background', 'color-scheme-border', 'hundred-width', 'rounded-corners', 'small-padding', 'small-margin-top');
            document.getElementById("listContainer").appendChild(div);
            const p = document.createElement("p");
            p.textContent = element.title;
            p.dataset.title = 'listTitle';
            p.classList.add('centered-text');
            div.appendChild(p);
            buttons(div, element.id);
            p.addEventListener("click", (e) => {
                
            }, false)
        });
        user.getHabits().forEach((element) => {
            const div = document.createElement("div");
            div.classList.add( 'black-background', 'color-scheme-border', 'hundred-width', 'rounded-corners', 'small-padding', 'small-margin-top');
            document.getElementById("listContainer").appendChild(div);
            const p = document.createElement("p");
            p.textContent = element.habit;
            p.classList.add('centered-text');
            div.appendChild(p);
            buttons(div, element.id);
            p.addEventListener("click", (e) => {
                e.stopPropagation();
                if(div.lastChild.classList.contains("hidden")){
                    this.utilities.removeClass(div.lastChild, "hidden");
                    this.utilities.addClass(div.lastChild, "grid");
                } else {
                    this.utilities.removeClass(div.lastChild, "grid");
                    this.utilities.addClass(div.lastChild, "hidden");
                }
            }, false)
        })
    }
}