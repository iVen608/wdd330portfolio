export default class notesCompiler {
    addNotes(notes, output){
        notes.forEach((note)=>{
            console.log(`Note:${note}`);
            if(note.substring(0,1) === "!"){
                const h3 = document.createElement("h3");
                h3.textContent = note.substring(1, note.length);
                output.appendChild(h3);
            } else {
                const li = document.createElement("li");
                li.textContent = note;
                if((note.substring(0,1) === "#")){
                    li.classList.add("code");
                    li.textContent = note.substring(1, note.length);
                }
                output.appendChild(li);
            }
        })
         
    }
    addNotesText(path, output){
        fetch(path).then((response) => response.text()).then((data) => {
           this.addNotes(data.split('??\r\n'), output);  
        });
    }
}