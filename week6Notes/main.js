import notes from "../notes/week6notesArray.js";
import notesCompiler from "../src/notesCompiler.js";

const notesHanlder = new notesCompiler();
notesHanlder.addNotes(notes, document.getElementById("output"));
 
//document.getElementById("output").innerHTML = notes;