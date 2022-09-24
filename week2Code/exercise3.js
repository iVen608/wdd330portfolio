function min(a, b){
    if(a > b){
        return b;
    }else{
        return a;
    }
}

function isEven(n){
    if(n == 0){
        return true;
    } else if(n == 1){
        return false;
    } else if (n < 0){
        n *= -1;
        return isEven(i);
    }
    else{
        let next = n-2;
        return isEven(next);
    }
}

function countChar(n, c){
    let total = 0;
    for(let i = 0; i < n.length; i++){
        if(n[i].toLowerCase() == c){
            total += 1
        }
    }
    return total;
}

function countBs(n){
    return countChar(n, "b");
}

console.log(countBs("Bababab"))