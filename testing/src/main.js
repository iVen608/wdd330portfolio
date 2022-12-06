import jsonHelper from "./json.js";
import nasa from "./nasa.js";
import Utilities from "./utilities.js";

const weatherURL = 'https://api.openweathermap.org/data/2.5/weather?lat=33.3703&lon=-112.5838&units=imperial&appid=942be51159fb8974885b140d119e7493';
const nasaURL = 'https://api.nasa.gov/planetary/apod?api_key=BsBlogPZGaaKbnAWPlalYXaktliZWWnWKGLbmbzQ';
let user;
function updateTime(){
    const hours = new Date().getHours();
    const mins = new Date().getMinutes();
    const titleText = document.getElementById("titleText");
    
    if(hours > 3 && hours < 11){
        titleText.textContent = "Good morning, " + user.name;// + mins;
    }else if(hours > 10 && hours < 17){
        titleText.textContent = "Good afternoon, " + user.name;// + mins;
    } else {
        titleText.textContent = "Good evening, " + user.name;// + mins;
    }
}

async function loadScreen(){
    const jsonCall = new jsonHelper();
    const nasaResults = await jsonCall.getResults(nasaURL);
    const utilities = new Utilities();
    utilities.updateImage("backgroundImage", nasaResults.url);
    const nasaHolder = new nasa(nasaResults);
    user = utilities.getUser();
    utilities.updateColor(user.color);
    console.log(nasaHolder.getUrl());
    document.querySelectorAll("button").forEach((element) => {
        element.addEventListener("click", (e) => {
          element.classList.add("selected");
        }, false);
    });
    updateTime();
    window.setInterval(updateTime, 6000);
    user.todo.forEach((element) => {
        const div = document.createElement("div");
        div.classList.add( 'black-background', 'color-scheme-border', 'hundred-width', 'rounded-corners', 'small-padding', 'small-margin-top');
        document.getElementById("listContainer").appendChild(div);
        const p = document.createElement("p");
        p.textContent = element.title;
        p.classList.add('centered-text');
        div.appendChild(p);
    });
    user.habit.forEach((element) => {
        const div = document.createElement("div");
        document.getElementById("listContainer").appendChild(div);
        const p = document.createElement("p");
        p.textContent = element.habit;
        div.appendChild(p);
    })
}

window.addEventListener("load", (e) => {
    loadScreen();
    
});
const menuWheel = document.getElementById("menuWheel");
const menuIcon = document.getElementById("menu-icon");

document.getElementById("menuButton").addEventListener("click", e => {
    if(menuWheel.classList.contains('visible') && menuIcon.classList.contains('x')){
        menuWheel.classList.remove('visible');
        setTimeout(() =>{menuIcon.classList.remove('x');}, 500)
        menuWheel.classList.add("invisible");
    }else if(menuWheel.classList.contains('invisible')){
        menuWheel.classList.add('visible');
        menuWheel.classList.remove("invisible");
        setTimeout(() =>{menuIcon.classList.add('x');}, 500)
    }else {
        menuWheel.classList.add('visible');
        setTimeout(() =>{menuIcon.classList.add('x');}, 500)
    }
});


//Change color scheme

const listContainer = document.getElementById("listContainer");
function colorPalette(){
    for(let r = 0; r < 5; r++){
        for(let g = 0; g < 5; g++){
            const div = document.createElement("div");
                div.style.backgroundColor = `rgb(${r*51}, ${g*51}, ${g*51})`;
                const hexLabel = document.createElement("p");
                hexLabel.textContent = `${r*51}, ${g*51}, ${g*51}`;
                div.appendChild(hexLabel);
                listContainer.appendChild(div);
        }
    }
};




//colorPalette();
