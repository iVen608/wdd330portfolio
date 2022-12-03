import Utilities from "./utilities.js";

export default class FocusController{
    constructor(){
        this.user;
        this.utilities = new Utilities();
        this.timeout;
        this.clock_timer;
    }
    //Initializes settings controller
    init(){
        this.user = this.utilities.getUser();
        this.utilities.updateColor(this.user.color);
        this.addEvents();
    }
    addEvents(){
        console.log("a");
        document.getElementById("timer").addEventListener('change', (e) =>{
            document.getElementById("timer").style.display = 'none';
            document.getElementById('cancel-timer').style.display = 'block';
            let i = parseInt(e.target.value);
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
            this.timeout = setTimeout(() => {clearInterval(this.clock_timer); document.getElementById("timer").style.display = 'block'}, i + 1000)
        }
        , false);
        
        document.getElementById('cancel-timer').addEventListener("click",(e) => {
            clearInterval(this.clock_timer);
            clearTimeout(this.timeout);
        }, false);
    }
    
}