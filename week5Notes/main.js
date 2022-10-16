import notes from "../notes/week5notesArray.js";

notes.forEach((note)=>{
    if(note.substring(0,1) === "!"){
        const h3 = document.createElement("h3");
        h3.innerHTML = note.substring(1, note.length);
        document.getElementById("output").appendChild(h3);
    } else {
        const li = document.createElement("li");
        li.innerHTML = note;
        if((note.substring(0,1) === "#")){
            
        }
        
        document.getElementById("output").appendChild(li);
    }
})
 
//document.getElementById("output").innerHTML = notes;