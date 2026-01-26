console.log("Задание 1");
const person = {
  name: "Миша",
  age: 18,
  greet: function() {
    return `Привет, я ${this.name}!`;
  },
  ageAfterYears: function(years) {
    return this.age + years;
  }
};


console.log(person.greet());
console.log(person.ageAfterYears(5));

console.log("Задание 2");
const car = {
  model: "Жигуль 2107",
  year: 2000,
  getInfo: function() {
    return `Модель: ${this.model}, Год выпуска: ${this.year}`;
  }
};

console.log(car.getInfo());

console.log("Задание 3");
function Book(title, author) {
  this.title = title;
  this.author = author;
  
  this.getTitle = function() {
    return this.title;
  };
  
  this.getAuthor = function() {
    return this.author;
  };
}

const book = new Book("Война и мир", "Лев Толстой");
console.log(book.getTitle());
console.log(book.getAuthor());

console.log("Задание 4");
const team = {
  players: [
    { name: "Алексей", position: "вратарь" },
    { name: "Влад", position: "нападающий" },
    { name: "Сергей", position: "защитник" }
  ],
  showPlayers: function() {
    this.players.forEach(player =>{
      console.log(`Игрок: ${player.name}, Позиция: ${player.position}`);
    });
  }
};

team.showPlayers();

console.log("Задание 5");
const counter = (function() {
  let count = 0;
  
  return {
    increment: function() {
      return ++count;
    },
    decrement: function() {
      return --count;
    },
    getCount: function() {
      return count;
    }
  };
})();

console.log("Counter:");
console.log(counter.increment());
console.log(counter.increment());
console.log(counter.decrement());
console.log(counter.getCount());

console.log("Задание 6");
const item = {};
Object.defineProperty(item, 'price', {
  value: 100,
  writable: true,
  configurable: true,
  enumerable: false
});

item.price = 150;
console.log("Item (изменяемый):", item.price);

Object.defineProperty(item, 'price', {
  value: 200,
  writable: false,
  configurable: false,
  enumerable: false
});
item.price = 50;
console.log("Item (неизменяемый):", item.price);

console.log("Задание 7");
const circle = {
  _radius: 5,
  
  get area() {
    return Math.PI * this._radius * this._radius;
  },
  
  get radius() {
    return this._radius;
  },
  
  set radius(value) {
    if (value > 0) {
      this._radius = value;
    } else {
      console.log("Радиус должен быть положительным числом");
    }
  }
};

console.log("Circle:");
console.log("Радиус:", circle.radius);
console.log("Площадь:", circle.area);
circle.radius = 10;
console.log("Новый радиус:", circle.radius);
console.log("Новая площадь:", circle.area);

console.log("Задание 8");
const car2 = {};

Object.defineProperties(car2, {
  make: { value: "Жига", writable: true, configurable: true },
  model: { value: "2107", writable: true, configurable: true },
  year: { value: 2000, writable: true, configurable: true }
});

Object.defineProperties(car2, {
  make: { value: "Жига", writable: false, configurable: false },
  model: { value: "2107", writable: false, configurable: false },
  year: { value: 2000, writable: false, configurable: false }
});

console.log("Car2 (неизменяемый):");
console.log("Марка:", car2.make);
console.log("Модель:", car2.model);
console.log("Год:", car2.year);

console.log("Задание 9");
const numbers = [1, 2, 3];

Object.defineProperty(numbers, 'sum', {
  get: function() {
    return this.reduce((acc, curr) => acc + curr, 0);
  },
  enumerable: false,
  configurable: false
});

console.log("Array with sum:");
console.log("Массив:", numbers);
console.log("Сумма:", numbers.sum);

console.log("Задание 10");
const rectangle = {
  _width: 10,
  _height: 5,
  
  get area() {
    return this._width * this._height;
  },
  
  get width() {
    return this._width;
  },
  
  set width(value) {
    if (value > 0) {
      this._width = value;
    }
  },
  
  get height() {
    return this._height;
  },
  
  set height(value) {
    if (value > 0) {
      this._height = value;
    }
  }
};

console.log("Rectangle:");
console.log("Ширина:", rectangle.width);
console.log("Высота:", rectangle.height);
console.log("Площадь:", rectangle.area);
rectangle.width = 15;
rectangle.height = 8;
console.log("Новая ширина:", rectangle.width);
console.log("Новая высота:", rectangle.height);
console.log("Новая площадь:", rectangle.area);

console.log("Задание 11");
const user = {
  firstName: "Иван",
  lastName: "Иванов",
  
  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  },
  
  set fullName(value) {
    const parts = value.split(' ');
    if (parts.length == 2) {
      this.firstName = parts[0];
      this.lastName = parts[1];
    }
  }
};

console.log("User:");
console.log("Полное имя:", user.fullName);
user.fullName = "Алескандр ДА";
console.log("Новое имя:", user.firstName);
console.log("Новая фамилия:", user.lastName);
console.log("Новое полное имя:", user.fullName);