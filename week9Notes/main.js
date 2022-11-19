;
import notesCompiler from "../src/notesCompiler.js";

const notesHanlder = new notesCompiler();
notesHanlder.addNotesText("../notes/week10notes.txt", document.getElementById("output"));
//notesHanlder.addNotes(notes, document.getElementById("output"));
//document.getElementById("output").innerHTML = notes;