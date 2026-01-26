console.log("1 задание");  
// function makeCounter() {
//     let currentCount = 1;
//     return function() {
//         return currentCount++;
//     };
// }

// let counter = makeCounter();
// let counter2 = makeCounter();

// console.log(counter());
// console.log(counter()); 
// console.log(counter()); 
// console.log(counter2()); 

// 2 вариант
 let currentCount = 1;

 function makeCounter() {
     return function() {
         return currentCount++;
     };
 }

 let counter = makeCounter();
 let counter2 = makeCounter();

 console.log(counter()); 
 console.log(counter()); 
 console.log(counter2());
 console.log(counter2()); 

console.log("2 задание"); 
function volume(a) {
    return function(b) {
        return function(c) {
            return a * b * c;
        };
    };
}

const fixedEdge= volume(5);

console.log(fixedEdge(2)(3));
console.log(fixedEdge(5)(4));
console.log(fixedEdge(1)(8));


console.log("3 задание"); 
let exit = 0;

function* moveObject(x = 0, y = 0) {
	while (true) {
		let direction = prompt("Введите команду (left, right, up, down, exit):");

		for (let i = 0; i < 10; i++) {
			switch (direction) {
				case "left":
					x--;
					break;
				case "right":
					x++;
					break;
				case "up":
					y++;
					break;
				case "down":
					y--;
					break;
				case "exit":
					exit = 1;
					break;
				default:
					console.log("Неизвестная команда!");
			}
			yield { x, y };
		}
	}
}

let gen = moveObject();

while (!exit) {
	console.log(gen.next().value);
}

console.log("4 задание"); 
var globalVar = "test";

function globalFunc() {
    return "hello";
}

window.exp = "value";

console.log("Глобальный объект:");
console.log(window.globalVar);
console.log(window.globalFunc());
console.log(window.exp);

window.globalVar = "modified";
console.log(globalVar);