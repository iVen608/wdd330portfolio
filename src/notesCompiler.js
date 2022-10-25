export default class notesCompiler {
    addNotes(notes, output){
        notes.forEach((note)=>{
            if(note.substring(0,1) === "!"){
                const h3 = document.createElement("h3");
                h3.innerHTML = note.substring(1, note.length);
                output.appendChild(h3);
            } else {
                const li = document.createElement("li");
                li.innerHTML = note;
                if((note.substring(0,1) === "#")){
                    li.classList.add("code");
                    li.innerHTML = note.substring(1, note.length);
                }
                output.appendChild(li);
            }
        })
         
    }
}