export default class utilities{
    constructor(parentId){
        this.parentId = parentId
    }
    createView(name, timestamp, value){
        const div = document.createElement("div");
        div.classList.add("todo");
        div.id = timestamp;
        document.getElementById(this.parentId).appendChild(div);
        const submitButton = document.createElement("button");
        submitButton.classList.add("submit");
        submitButton.type = "button";
        div.appendChild(submitButton);
        const div2 = document.createElement("div");
        div.appendChild(div2);
        const nameP = document.createElement("p");
        nameP.classList.add("task")
        nameP.textContent = name;
        div2.appendChild(nameP);
        const removeButton = document.createElement("button");
        removeButton.classList.add("remove");
        removeButton.type = "button";
        removeButton.name = "removeButton";
        removeButton.innerText = "X";
        div.appendChild(removeButton);
        console.log(value);
        if(value == true){
            div.classList.add("completed");
        }
    }
    removeView(timestamp){
        document.getElementById(timestamp).remove();
    }
    toggleView(timestamp, value){
        const todo = document.getElementById(timestamp);
        if(value === false && todo.classList.contains("completed")){
            todo.classList.remove("completed")
        } else {
            todo.classList.add("completed")
        }
    }
    updateCounter(x){
        const plural = x > 1 ? "s" : "";
        document.getElementById("tracker").textContent = `${x} item${plural} left`;
    }
    removeList(){
        document.getElementById(this.parentId).innerHTML = '';
    }
    selectButton(value){
        const filter_buttons = document.querySelector("#filter-container").getElementsByTagName("button"); 
        for(let button of filter_buttons){
            if(button.value === value && !button.classList.contains("selected")){
                button.classList.add("selected")
            } else if (button.classList.contains("selected")) {
                button.classList.remove("selected");
            }
        }
    }
}