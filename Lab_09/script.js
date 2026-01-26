// 1
let Figure = {
    color: "white",
    size: 10,
    type: "квадрат",
    numberLines: 0,
}

let Square = {
    __proto__: Figure,
}
Square.color = "желтый";

let SquareSmall = {
    __proto__: Figure,
}
SquareSmall.size = 5;
SquareSmall.color = "желтый";

let Circle = {
    __proto__: Figure,
}
Circle.type = "круг";

let CircleGreen = {
    __proto__: Circle,
}
CircleGreen.color = "зеленый";


let Triangle = {
    __proto__: Figure,
}
Triangle.numberLines = 1;
Triangle.type = "треугольник";

let TriangleThree = {
    __proto__: Triangle,
}
TriangleThree.numberLines = 3;

console.log("Свойства, которые отличают фигуру «зеленый круг»:");
for (let prop in CircleGreen) {
    let isOwn = CircleGreen.hasOwnProperty(prop);

    if (isOwn) {
        console.log(`Собственные свойства зеленого круга: ${prop}`);
    }
}

console.log("\nСвойства фигуры «треугольник с тремя линиями»:");
for (let prop in TriangleThree) {
   console.log(prop);
}

console.log("Проверка фигуры «маленький квадрат»:");
console.log(`Есть ли собственное свойство 'color'? ${SquareSmall.hasOwnProperty('color')}`); 



// 2.
class Human {
  constructor(firstName, lastName, birthYear, address) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.birthYear = birthYear;
    this.address = address;
  }

  get age() {
    const now = new Date();
    return now.getFullYear() - this.birthYear;
  }

  set age(newAge) {
    const now = new Date();
    this.birthYear = now.getFullYear() - Number(newAge);
  }

  setAddress(newAddress) {
    this.address = newAddress;
  }

  setBirthYear(newBirthYear) {
    this.birthYear = Number(newBirthYear);
  }
}

const FacultyCodes = {
  '7': 'ФИТ',
  '6': 'ИД'
};
const SpecialtyCodes = {
  '1': 'ПОИТ',
  '2': 'ИСИТ',
  '3': 'ДЭВИ',
  '4': 'ПОИБМС'
};
const FinanceCodes = {
  '1': 'Бюджет',
  '2': 'Платники'
};

function parseRecordBookNumber(rbNumberStr) {
  const s = String(rbNumberStr);
  if (s.length < 8) {
    throw new Error('Номер зачетки должен содержать минимум 8 цифр');
  }

  const facultyCode = s[0];
  const specialtyCode = s[1];
  const yearShort = s.slice(2, 4);
  const financeCode = s[4];
  const ordinal = s.slice(5, 8);

  return {
    facultyCode,
    facultyName: FacultyCodes[facultyCode] || 'Неизвестно',
    specialtyCode,
    specialtyName: SpecialtyCodes[specialtyCode] || 'Неизвестно',
    admissionYear: Number(`20${yearShort}`),
    financeCode,
    finance: FinanceCodes[financeCode] || 'Неизвестно',
    ordinal: Number(ordinal)
  };
}

class Student extends Human {
  constructor(firstName, lastName, birthYear, address, faculty, course, group, recordBookNumber) {
    super(firstName, lastName, birthYear, address);

    this.faculty = faculty;
    this.course = course;
    this.group = group;
    this.recordBookNumber = String(recordBookNumber);

    this._rb = parseRecordBookNumber(this.recordBookNumber);

    if (!this.faculty) {
      this.faculty = this._rb.facultyName;
    }
  }

  setCourseAndGroup(newCourse, newGroup) {
    this.course = Number(newCourse);
    this.group = String(newGroup);
  }

  getFullName() {
    return `${this.firstName} ${this.lastName}`;
  }

  get specialtyName() {
    return this._rb.specialtyName;
  }
  get admissionYear() {
    return this._rb.admissionYear;
  }
  get finance() {
    return this._rb.finance;
  }
  get facultyFromRB() {
    return this._rb.facultyName;
  }
}

class Faculty {
  constructor(name) {
    this.name = name;
    this.groupsCount = 0;
    this.studentsCount = 0;
    this.students = [];
  }

  addStudent(student) {
    if (!(student instanceof Student)) {
      throw new Error('Можно добавлять только объекты класса Student');
    }

    this.students.push(student);
    this.studentsCount = this.students.length;

    const uniqueGroups = new Set(this.students.map(s => s.group));
    this.groupsCount = uniqueGroups.size;
  }

  setGroupsCount(newCount) {
    this.groupsCount = Number(newCount);
  }

  setStudentsCount(newCount) {
    this.studentsCount = Number(newCount);
  }

  getDev() {
    return this.students.filter(s => s.specialtyName === 'ДЭВИ').length;
  }

  getGroupe(groupName) {
    return this.students.filter(s => s.group === String(groupName));
  }
}

const s1 = new Student('Иван', 'Петров', 2003, 'Минск, ул. Ленина, 1', 'ФИТ', 2, 'ПОИТ-21', '71201300');
const s2 = new Student('Анна', 'Сидорова', 2004, 'Минск, ул. Победы, 10', 'ФИТ', 1, 'ДЭВИ-11', '73201234');
const s3 = new Student('Олег', 'Иванов', 2002, 'Брест, ул. Центральная, 5', 'ИД', 3, 'ИСИТ-31', '62101256');

console.log(`Возраст ${s1.firstName}:`, s1.age);
s1.age = 25;
console.log(`Новый birthYear ${s1.firstName}:`, s1.birthYear);

const fit = new Faculty('ФИТ');
fit.addStudent(s1);
fit.addStudent(s2);

const id = new Faculty('ИД');
id.addStudent(s3);

console.log('FIT: всего студентов =', fit.studentsCount);
console.log('FIT: количество групп =', fit.groupsCount);
console.log('FIT: количество студентов ДЭВИ =', fit.getDev());
console.log('FIT: группа ПОИТ-21 =', fit.getGroupe('ПОИТ-21').map(s => s.getFullName()));

console.log('ID: всего студентов =', id.studentsCount);
console.log('ID: количество групп =', id.groupsCount);
console.log('ID: количество студентов ДЭВИ =', id.getDev());
console.log('ID: группа ИСИТ-31 =', id.getGroupe('ИСИТ-31').map(s => s.getFullName()));
