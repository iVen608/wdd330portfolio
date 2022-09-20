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