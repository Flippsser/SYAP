class Task{
    constructor(id,title){
        this.id = id;
        this.title = title;
        this.completed = false;
    }
    rename(title){
        this.title = title;
    }
    complete(){
        this.completed = !this.completed;
    }
    uncomplete(){
        this.completed = false;
    }
    info(){
        return `[${this.id}] Задача: ${this.title} — ${this.completed ? 'Выполнена' : 'Невыполнена'}`;
    }
}

class Todolist{
    constructor(id,tittle){
        this.id = id;
        this.title = tittle;
        this.tasks = [];
    }
    rename(title){
        this.title = title;
    }
    addTask(task){
        this.tasks.push(task);  
    }
    filterTasks(completed){
        return this.tasks.filter(task => task.completed == completed);
    }
    info(){
        return `Todolist: [${this.id}] — ${this.title}`;
    }
}


const todo1 = new Todolist(1, "Домашние дела");
const todo2 = new Todolist(2, "Учеба");


const t1 = new Task(1, "Сдать курсовой");
const t2 = new Task(2, "Подготовить реферат");
const t3 = new Task(3, "Починить машину");


todo1.addTask(t1);
todo1.addTask(t2);
todo2.addTask(t3);


t1.complete();
t3.complete();


console.log(todo1.info());
todo1.tasks.forEach(task => console.log(task.info()));
console.log("Выполненные задачи списка 1:");
todo1.filterTasks(true).forEach(t => console.log(t.info()));
console.log("Невыполненные задачи списка 1:");
todo1.filterTasks(false).forEach(t => console.log(t.info()));
console.log(todo2.info());
todo2.tasks.forEach(task => console.log(task.info()));
