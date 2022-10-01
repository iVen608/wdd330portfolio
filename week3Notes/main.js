function readFile(file){
    const fr = new FileReader();
    console.log(file.childNodes[1]);
}

const file = document.getElementById("fileObj");
//readFile(file);

document.getElementById("clickTest").addEventListener("click", (e) => {
    e.stopPropagation();
    loadDoc();
})

function loadDoc() {
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function() {
      document.getElementById("demo").innerHTML = this.responseText;
      }
    xhttp.open("GET", "test.txt", true);
    xhttp.send();
  }