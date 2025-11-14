// 1
let a = 5;
let name = "Name";
let i = 0;
let double = 0.23;
let recult = 1 / 0;
let answer = true;
let no = null;

console.log("Тип a: " + typeof(a));
console.log("Тип name: " + typeof(name));
console.log("Тип i: " + typeof(i));
console.log("Тип double: " + typeof(double));
console.log("Тип recult: " + typeof(recult));
console.log("Тип answer: " + typeof(answer));
console.log("Тип no: " + typeof(no));

// 2
const sideSquare = 5;
const rectWidth = 45;
const rectHeight = 21;

const squaresWidth = Math.floor(rectWidth/sideSquare);
const squaresHeight = Math.floor(rectHeight/sideSquare);

const quantitySquare = squaresHeight * squaresWidth;

console.log("количество квадратов: " + quantitySquare);

// 3
let j = 2;
let d = ++j;
console.log(d);
let e = j++;
console.log(e);

console.log(d == e);

// 4
let res1 = "Котик" == "котик" ? "равны" : "не равны";
let res2 = "Котик" == "китик" ? "равны" : "не равны";
let res3 = "Кот" == "Котик" ? "равны" : "не равны";
let res4 = "Привет" == "Пока" ? "равны" : "не равны";

let res5 = 73 == "53" ? "равны" : "не равны";
let res6 = false == 0 ? "равны" : "не равны";
let res7 = 54 == true ? "равны" : "не равны";
let res8 = 123 == false ? "равны" : "не равны";
let res9 = true == "3" ? "равны" : "не равны";

let res10 = 3 == "5мм" ? "равны" : "не равны";
let res11 = 8 == "-2" ? "равны" : "не равны";
let res12 = 34 == "34" ? "равны" : "не равны";

let res13 = null == undefined ? "равны" : "не равны";

console.log("Котик и котик: " + res1);
console.log("Котик и китик: " + res2);
console.log("Кот и Котик: " + res3);
console.log("Привет и Пока: " + res4);
console.log("73 и '53': " + res5);
console.log("false и 0: " + res6);
console.log("54 и true: " + res7);
console.log("123 и false: " + res8);
console.log("true и '3': " + res9);
console.log("3 и '5мм': " + res10);
console.log("8 и '-2': " + res11);
console.log("34 и '34': " + res12);
console.log("null и undefined: " + res13);

// 5
const teacherName = "Иванов Иван Иванович";

const userInput = prompt("Введите ваше имя:");

const normalizedInput = userInput.trim().toLowerCase();
const normalizedTeacherName = teacherName.trim().toLowerCase();

const teacherParts = normalizedTeacherName.split(" ");

let isValid = false;

if (normalizedInput === teacherParts[1]) {
    isValid = true;
} else if (normalizedInput === teacherParts[1] + " " + teacherParts[2]) {
    isValid = true;
} else if (normalizedInput === normalizedTeacherName) {
    isValid = true;
}

if (isValid) {
    alert("Введенные данные верные.");
} else {
    alert("Введенные данные неверные.");
}

// 6
let rus = true;
let math = true;
let english = false;

let result = "";

if (rus && math && english) {
    result = "Студент переведен на следующий курс";

} else if (!rus && !math && !english) {
    result = "Студент отчислен";
    
} else {
    result = "Студент отлетел на пересдачу";
}

console.log(result);

// 7
console.log(true + true);
console.log(0 + "5");
console.log(5 + "мм");
console.log(8/Infinity);
console.log(9 * "\n9");
console.log(null - 1 );
console.log("5" -2);
console.log("5px" - 3);
console.log(true - 3);
console.log(7||0);

// 8
let results = [];

for (let i = 1; i <= 10; i++) {
    if (i % 2 == 0) {

        results.push(i + 2);
    } else {

        results.push(`${i}мм`);
    }
}

console.log(results);
// 9
// const days = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];

// let dayNumber = prompt("Введите номер дня недели (1-7):");

// if (dayNumber >= 1 && dayNumber <= 7) {
//     console.log(`День недели: ${days[dayNumber - 1]}`);
// } else {
//     console.log("Некорректный номер дня. Введите число от 1 до 7.");
// }



// Объект
const days = {
    1: "Пн",
    2: "Вт",
    3: "Ср",
    4: "Чт",
    5: "Пт",
    6: "Сб",
    7: "Вс"
};

let dayNumber = prompt("Введите номер дня недели (1-7):");

if (dayNumber in days) {
    console.log(`День недели: ${days[dayNumber]}`);
} else {
    console.log("Некорректный номер дня. Введите число от 1 до 7.");
}

// 10
function createString(param1 = 10, param2, param3) {
    return `${param1} ${param2} ${param3}`;
}

let userParam3 = prompt("Введите третий параметр:");



let res = createString(undefined, undefined, userParam3);

console.log(res);

// 11
// function declaration
// console.log(params(5, 5));
// console.log(params(5, 10));

// function params(a, b) {
//     if (a == b) {
//         return 4 * a;
//     } else {
//         return a * b;
//     }
// }

// function expression
// const params = function(a, b) {
//     if (a == b) {
//         return 4 * a;
//     } else {
//         return a * b;
//     }
// };

// console.log(params(5, 5));
// console.log(params(5, 10));

// стрелочная
const params = (a, b) => {
    if (a == b) {
        return 4 * a;
    } else {
        return a * b;
    }
};

console.log(params(5, 5));
console.log(params(5, 10));


