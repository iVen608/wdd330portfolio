let submit_buttons = document.getElementsByClassName("submit");



for(let button of submit_buttons){
    button.parentElement.id = Date.now();
    button.addEventListener("touchstart", (e) => {
        e.stopPropagation();
        e.preventDefault();
        if(button.parentElement.classList.contains("completed")){
            button.parentElement.classList.remove("completed")
        } else {
            button.parentElement.classList.add("completed")
        }
        console.log(Date.now());
    }, false);
    button.addEventListener("click", (e) => {
        e.stopPropagation();
        e.preventDefault();
        if(button.parentElement.classList.contains("completed")){
            button.parentElement.classList.remove("completed")
        } else {
            button.parentElement.classList.add("completed")
        }
        console.log(Date.now());
    }, false);
}