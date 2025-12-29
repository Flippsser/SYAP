// 1
let products = new Set();

function addProduct(name) {
  products.add(name);
}

function deleteProduct(name) {
  products.delete(name);
}

function hasProduct(name) {
  return products.has(name);
}

function countProducts() {
  return products.size;
}

addProduct("Хлеб");
addProduct("Масло");
addProduct("Сыр");


console.log(products);
console.log(hasProduct("Сыр"));
deleteProduct("Масло");
console.log(products);
console.log(countProducts());

// 2
let students = new Set();

function addStudent(id, group, name) {
  students.add({ id, group, name });
}

function deleteStudentById(id) {
  students = new Set([...students].filter(s => s.id !== id));
}

function filterByGroup(group) {
  return [...students].filter(s => s.group === group);
}

function sortById() {
  return [...students].sort((a, b) => a.id - b.id);
}

addStudent(1, "ПИ-9", "Иванов Иван");
addStudent(4, "ИС-3", "Петров Петр");
addStudent(3, "ПИ-10", "Сидоров Илья");

console.log(students);
console.log(filterByGroup("ИС-3"));
console.log(sortById());

deleteStudentById(4);
console.log(students);

// 3
let cart = new Map();

function addItem(id, name, qty, price) {
  cart.set(id, { name, qty, price });
}

function deleteItemById(id) {
  cart.delete(id);
}

function deleteItemsByName(name) {
  for (let [id, item] of cart) {
    if (item.name === name) cart.delete(id);
  }
}

function updateQty(id, newQty) {
  if (cart.has(id)) cart.get(id).qty = newQty;
}

function updatePrice(id, newPrice) {
  if (cart.has(id)) cart.get(id).price = newPrice;
}

function cartSum() {
  let totalItems = cart.size;
  let totalCost = 0;
  for (let item of cart.values()) {
    totalCost += item.qty * item.price;
  }
  return { totalItems, totalCost };
}

addItem(1, "Телефон", 2, 15);
addItem(2, "Ноутбук", 1, 60);
addItem(3, "Телефон", 2, 30);

deleteItemsByName("Телефон");

addItem(4, "Планшет", 2, 20);

updateQty(4, 3);

updatePrice(4, 18);

console.log(cart);
console.log(cartSum());

// 4
const cache = new WeakMap();

function calculate(obj) {
  if (cache.has(obj)) {
    return cache.get(obj);
  }
  const result = obj.x ** 2 + obj.y ** 2;
  cache.set(obj, result);
  return result;
}

let params = { x: 3, y: 4 };

console.log("Результат:", calculate(params));
console.log("Результат:", calculate(params));


