console.log("Задание 1");

const numbers = [10, 20, 30];
const [y] = numbers;
console.log("1.", y);

console.log("Задание 2");
const user = { name: "Mmm", age: 25 };
const admin = { ...user, admin: true };
console.log("2. ", admin);

console.log("Задание 3");
let store = {
  state: {
    profilePage: {
      posts: [
        { id: 1, message: 'Hi', likesCount: 12 },
        { id: 2, message: 'By', likesCount: 1 }
      ],
      newPostText: 'About me'
    },
    dialogsPage: {
      dialogs: [
        { id: 1, name: 'Valera' },
        { id: 2, name: 'Andrey' },
        { id: 3, name: 'Sasha' },
        { id: 4, name: 'Viktor' }
      ],
      messages: [
        { id: 1, message: 'hi' },
        { id: 2, message: 'hi hi' },
        { id: 3, message: 'hi hi hi' }
      ]
    },
    sidebar: []
  }
};


const {
  state: {
    profilePage: { posts },
    dialogsPage: { dialogs, messages }
  }
} = store;

console.log("LikesCount из posts:");
posts.forEach(post => console.log(post.likesCount));


const evenIdDialogs = dialogs.filter(dialog => dialog.id % 2 == 0);
console.log("Пользователи с четными id:", evenIdDialogs);


const updatedMessages = messages.map(msg => ({ ...msg, message: "Hello user" }));
console.log("Обновленные сообщения:", updatedMessages);

console.log("Задание 4");
let tasks = [
  { id: 1, title: "HTML&CSS", isDone: true },
  { id: 2, title: "JS", isDone: true },
  { id: 3, title: "ReactUS", isDone: false },
  { id: 4, title: "Rest API", isDone: false },
  { id: 5, title: "GraphQL", isDone: false }
];

const newTask = { id: 6, title: "Node.js", isDone: false };
tasks = [...tasks, newTask];
console.log("4.", tasks);

console.log("Задание 5");
function sumValues(x, y, z) {
  return x + y + z;
}

const arr = [1, 2, 3];
const result = sumValues(...arr);
console.log("5.", result);        