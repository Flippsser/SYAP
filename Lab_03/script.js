let array = [[1,2],[3,[4,5]],[6]];

let result = array.reduce(function(prev,next){
    return prev.concat(next);
}, []).flat();

console.log(result);

console.log("2)");
let arr = [[1,2],[3,[4,5,[6]]],7];

let sum = arr.flat(Infinity).reduce((acc, val) => acc + val, 0);

console.log(sum);

console.log("3)");
let students = [
  { name: "Тима", age: 18, groupId: 1 },
  { name: "Ваня", age: 17, groupId: 1 },
  { name: "Илья", age: 17, groupId: 2 },
  { name: "Сеня", age: 20, groupId: 2 }
];

function groupStudents(students) {
  let grouped = {};

  for (let i = 0; i < students.length; i++) {

    if (students[i].age > 17) {          
      let group = students[i].groupId;

      if (!grouped[group]) {
        grouped[group] = [];      
      }
      grouped[group].push(students[i]);
    }
  }
  return grouped;
}

console.log(groupStudents(students));

console.log("4)");
let str = "ABC";
let total1 = "";

for (let i = 0; i < str.length; i++) {
  total1 += str.charCodeAt(i);
}

let total2 = "";
for (let i = 0; i < total1.length; i++) {
  if (total1[i] == "7") {
    total2 += "1";
  } else {
    total2 += total1[i];
  }
}

let res = parseInt(total1) - parseInt(total2);

console.log("total1:", total1);
console.log("total2:", total2);
console.log("result:", res);

console.log("5)");
function extend(...objects) {
  return Object.assign({}, ...objects);
}

let obj1 = { a: 1, b: 2 };
let obj2 = { c: 3 };
let obj3 = { d: 4 };
let obj4 = { a: 3, c: 3 };

console.log(extend(obj1, obj2)); 
console.log(extend(obj1, obj2, obj3)); 
console.log(extend(obj1, obj4)); 

console.log("6)");
function buildTower(n) {
  let tower = [];

  for (let i = 0; i < n; i++) {
    let spaces = " ".repeat(n - i);
    let stars = "*".repeat(i * 2 + 1);
    tower.push(spaces + stars + spaces);
  }
  return tower.join("\n");
}

console.log(buildTower(10));
