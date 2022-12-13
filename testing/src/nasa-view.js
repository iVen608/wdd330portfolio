export default class NasaView{
    displayDailyResult(title, text){
        document.getElementById("nasa-title").textContent = title;
        document.getElementById("nasa-explanation").textContent = text;
    }
    displayImageCopyright(name){
        const text = document.getElementById("nasaImgText");
        text.textContent = `${text.textContent}Image by ${name}`;
    }
    displayImage(url){
        document.getElementById("backgroundImage").src = url;
    }
    
    
}