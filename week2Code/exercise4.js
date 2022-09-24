function range(start, end, step = 1){
    let array = []
    for(let i = start; i < (end+1); i += step) {
        array.push(i);
    }
    return array;
}

function sum(array){
    return array.reduce((i, v) => i + v);
}

function reverseArray(array){
    for(let i = 0; i < Math.floor(array.length/2); i++){
        let front = array[i];
        let back = array[array.length - i - 1];
        array[i] = back;
        array[array.length - i - 1] = front;
    }
    return array;
}

console.log(reverseArray(range(1,10)));