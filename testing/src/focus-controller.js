import Utilities from "./utilities.js";
import User from './user.js';
export default class FocusController{
    constructor(){
        this.user;
        this.utilities = new Utilities();
        this.timeout;
        this.clock_timer;
    }
    //Initializes settings controller
    init(){
        const user = this.utilities.getUser();
        this.user = new User(user.color, user.position, user.name, user.todo, user.habit, user.focus);
        console.log(this.user.getFocus());
        this.utilities.updateColor(this.user.color);
        this.addEvents();
    }
    addEvents(){
        console.log("a");
        document.getElementById("timer").addEventListener('change', (e) =>{
            document.getElementById("timer").classList.add("hidden");
            document.getElementById('cancel-timer').classList.remove("hidden");
            document.getElementById('timer-circle').classList.remove("hidden");
            let i = parseInt(e.target.value);
            switch(i){
                case 10000:
                    document.getElementById('timer-circle').firstElementChild.classList.add('ten-second-timer');
                    break;
                case 300000:
                    document.getElementById('timer-circle').firstElementChild.classList.add('five-minute-timer');
                    break;
                case 600000:
                    document.getElementById('timer-circle').firstElementChild.classList.add('ten-minute-timer');
                    break;
                case 900000:
                    document.getElementById('timer-circle').firstElementChild.classList.add('fifteen-minute-timer');
                    break;
                case 1200000:
                    document.getElementById('timer-circle').firstElementChild.classList.add('twenty-minute-timer');
                    break;
                case 1500000:
                    document.getElementById('timer-circle').firstElementChild.classList.add('twenty-five-minute-timer');
                    break;
                case 1800000:
                    document.getElementById('timer-circle').firstElementChild.classList.add('thirty-minute-timer');
                    break;
                case 2100000:
                    document.getElementById('timer-circle').firstElementChild.classList.add('thirty-five-minute-timer');
                    break;
                case 2400000:
                    document.getElementById('timer-circle').firstElementChild.classList.add('fourty-minute-timer');
                    break;
                case 2700000:
                    document.getElementById('timer-circle').firstElementChild.classList.add('fourty-five-timer');
                    break;
                case 3600000:
                    document.getElementById('timer-circle').firstElementChild.classList.add('one-hour-timer');
                    break;
            }
            this.clock_timer = setInterval(() => {
                const total_seconds = (i / 1000);
                const minutes = Math.floor(total_seconds / 60);
                const seconds = total_seconds - minutes * 60;
                i -= 1000;
                if(i < 0){
                    i = 0;
            }
                document.getElementById("clock-text").textContent = `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`
            }, 1000);
            this.timeout = setTimeout(() => {
                clearInterval(this.clock_timer); 
                document.getElementById("timer").style.display = 'block'}, i + 1000)
        }
        , false);
        
        document.getElementById('cancel-timer').addEventListener("click",(e) => {
            clearInterval(this.clock_timer);
            clearTimeout(this.timeout);
        }, false);
    }
    
}