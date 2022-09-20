const exercises = [
    {
        name: "Chapter 2 Exercise 1: Looping a Triangle",
        id: "_21",
        func: chapter2exercise1,
    },
    {
        name: "Chapter 2 Exercise 2: FizzBuzz",
        id: "_22",
        func: chapter2exercise2
    },
    {
        name: "Chapter 2 Exercise 3: Chessboard (Size of 8)",
        id: "_23",
        func: chapter2exercise3
    },
    
]

const codeGrid = document.getElementById("codeGrid")

for(let i = 0; i < exercises.length; i++){
    let container = document.createElement("div");
    container.className = "codeContainer";
    codeGrid.appendChild(container);
    let codeTitle = document.createElement("h3");
    codeTitle.innerHTML = exercises[i].name;
    container.appendChild(codeTitle);
    let output = document.createElement("div");
    output.id = exercises[i].id;
    container.appendChild(output);
    let codeButton = document.createElement("button");
    codeButton.onclick = exercises[i].func;
    codeButton.innerText = "Submit";
    container.appendChild(codeButton);
}

function chapter2exercise1(){
    let output = document.getElementById("_21");
    let triangle = ''
    for(let i = 0; i < 7; i++){
        triangle += "#";
        output.innerHTML += triangle + "<br>";
    }
}

function chapter2exercise2(){
    let output = document.getElementById("_22");
    for (let i = 0; i < 101; i++){
        let exercise2Output = '';
        if(i % 3 == 0){
            exercise2Output += "Fizz";
        }
        if(i % 5 == 0){
            exercise2Output += "Buzz";
        }
        output.innerHTML += (exercise2Output || i) + "<br>";
    }
}

function chapter2exercise3(){
    let output = document.getElementById("_23");
    let grid = '';
    let size = 8;
    for(let i = 0; i < size; i++){
        let chessboardLine = '';
        for(let j = 0; j < size; j++){
            if(i % 2 == 0){
                if (j % 2 == 0){
                    chessboardLine += " ";
                }
                else {
                    chessboardLine += "#";
                }
            } else {
                let v = j + 1;
                if (v % 2 == 0){
                    chessboardLine += " ";
                }
                else {
                    chessboardLine += "#";
                }
            }
        }
        grid += chessboardLine + "<br>";
    }
    output.innerHTML = grid;
}

console.log("Chapter 2 Coding Exercise 1: Looping Triangle\n");
let triangle = '';
for(let i = 0; i < 7; i++){
    triangle += "#";
    console.log(triangle);
}

console.log("\nChapter 2 Coding Exercise 2: FizzBuzz");

for (let i = 0; i < 101; i++){
    let exercise2Output = '';
    if(i % 3 == 0){
        exercise2Output += "Fizz";
    }
    if(i % 5 == 0){
        exercise2Output += "Buzz";
    }
    console.log(exercise2Output || i);
}

console.log("\nChapter 2 Coding Exercise 3: Chessboard");
let size = prompt("Chessboard size: ");
let grid = '';
for(let i = 0; i < size; i++){
    let chessboardLine = '';
    for(let j = 0; j < size; j++){
        if(i % 2 == 0){
            if (j % 2 == 0){
                chessboardLine += " ";
            }
            else {
                chessboardLine += "#";
            }
        } else {
            let v = j + 1;
            if (v % 2 == 0){
                chessboardLine += " ";
            }
            else {
                chessboardLine += "#";
            }
        }
    }
    grid += chessboardLine + "\n";
}

console.log(grid);