import notes from "../notes/week8notes.js";
import notesCompiler from "../src/notesCompiler.js";

const notesHanlder = new notesCompiler();
//notesHanlder.addNotesText(document.getElementById("output"));
notesHanlder.addNotes(notes, document.getElementById("output"));
//document.getElementById("output").innerHTML = notes;