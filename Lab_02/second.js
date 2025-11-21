console.log("1)");
function basicOperation(operator,v1,v2) {
    let result;
    switch (operator) {
        case '+':result= v1+v2; break;
        case '-':result= v1-v2; break;       
        case '*':result= v1*v2; break;        
        case '/':result= v1/v2; break;    
        default:result="Ошибка"; break;
    }
    return result; 
}

console.log(basicOperation('+',4,2));
console.log(basicOperation('-',4,2));
console.log(basicOperation('*',4,2));
console.log(basicOperation('/',4,2));

console.log("2)");
function sumOfCubes(n) {
    let sum = 0;
    for (let i = 1;i <= n; i++){
        sum +=i*i*i;
    }
    return sum;
}

console.log(sumOfCubes(2));
console.log(sumOfCubes(3));

console.log("3)");
function average(arr) {
    let total = 0;
    for (let i = 0; i < arr.length; i++) {
        total += arr[i];
    }
    let avg = total/arr.length;
    return avg;
}

console.log(average([1,3,5]));
console.log(average([2,4,6]));

console.log("4)");
function reverseLetter(str) {
    let arr = str.split("").reverse();
    let onlyLetters = arr.filter(cymb => (cymb >= "a" && cymb <= "z") || (cymb >= "A" && cymb <= "Z"))
    let result = onlyLetters.join("");
    return result;    
}

console.log(reverseLetter("JavaScript"));
console.log(reverseLetter("JavaScr53э? ipt"));

console.log("5)");
function repeatStr(n,s) {
    let result = "";
    for (let i = 0; i < n; i++) {
        result += s;
    }
    return result;
}

console.log(repeatStr(3, "JS "));
console.log(repeatStr(4, "C# "));

console.log("6)");
function arrDif(arr1,arr2) {
    let result = arr1.filter(x => arr2.indexOf(x) == -1);
    return result;
}

console.log(arrDif([1,2,3,4],[2,4]));
console.log(arrDif(["a","b","c"],["c"]));


