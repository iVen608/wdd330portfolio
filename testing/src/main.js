import jsonHelper from "./json.js";
import nasa from "./nasa.js";

const weatherURL = 'https://api.openweathermap.org/data/2.5/weather?lat=33.3703&lon=-112.5838&units=imperial&appid=942be51159fb8974885b140d119e7493';
const nasaURL = 'https://api.nasa.gov/planetary/apod?api_key=BsBlogPZGaaKbnAWPlalYXaktliZWWnWKGLbmbzQ';

function updateTime(){
    const hours = new Date().getHours();
    const mins = new Date().getMinutes();
    const titleText = document.getElementById("titleText");
    
    if(hours > 3 && hours < 11){
        titleText.textContent = "Good morning, ";// + mins;
    }else if(hours > 10 && hours < 17){
        titleText.textContent = "Good afternoon, ";// + mins;
    } else {
        titleText.textContent = "Good evening, ";// + mins;
    }
}

async function loadScreen(){
    const jsonCall = new jsonHelper();
    const nasaResults = await jsonCall.getResults(nasaURL);
    document.getElementById("backgroundImage").src = nasaResults.url;
    const nasaHolder = new nasa(nasaResults);
    //console.log(nasaHolder.getUrl());
    document.querySelectorAll("button").forEach((element) => {
        element.addEventListener("click", (e) => {
          element.classList.add("selected");
        }, false);
    });
    window.setInterval(updateTime, 6000);
}

window.addEventListener("load", (e) => {
    loadScreen();
    
});
const menuWheel = document.getElementById("menuWheel");


document.getElementById("menuButton").addEventListener("click", e => {
    if(menuWheel.classList.contains('visible')){
        console.log("a");
        menuWheel.classList.remove('visible');
        menuWheel.classList.add("invisible");
    }else if(menuWheel.classList.contains('invisible')){
        menuWheel.classList.add('visible');
        menuWheel.classList.remove("invisible");
    }else {
        menuWheel.classList.add('visible');
    }
});


//Change color scheme
document.documentElement.style.setProperty('--color-selection', 'orange');

