var note_title = document.getElementById("note_title");
var note_contents = document.getElementById("note_contents");
var output = document.getElementById("output");
function saveNote(){
    localStorage.setItem(note_title.value, note_contents.value);
    note_title.value = "";
    note_contents.value = "";
    console.log("Saved!");
}

function retrieveNote(){
    var contents = localStorage.getItem(note_title.value);
    note_contents.value = contents;
    console.log("Retrieved");
}

function saveReminder(){
    var current = localStorage.getItem("reminders");
    current = JSON.parse(current);
    var reminder = document.getElementById("reminder");
    if(current == null){
        current = [reminder.value];
    }
    else {
        current.append(reminder.value);
    }
    formatted = JSON.stringify(current);
    localStorage.setItem("reminders", current);
}

function getReminders(){
    var current = localStorage.getItem("reminders");
    current = JSON.parse(current);
    if(current != null){
        print("list isn't empty")
        
    }
}