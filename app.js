class Todo {
    constructor(text) {
        this.text = text
        this.id = new Date().getTime()
        this.doneStatus = false
    }
}
class TodoStore {
    static getTodos() {
        let tasks = JSON.parse(localStorage.getItem('task')) || []
        // if (localStorage.getItem('task') === null) {
        //     tasks = 
        // }
        // else {
        //     tasks= 
        // }
        return tasks
    }
    static setTodos(todo) {
        let todos = TodoStore.getTodos()
        todos.push(todo)
        localStorage.setItem('task', JSON.stringify(todos))
    }
    static removeTodos(todo) {
        let todos = TodoStore.getTodos()
        todos.forEach((element, index) => {
            if (element.id == todo) {
                todos.splice(index, 1)
            }
            // console.log(element.id,todo)
        });
        localStorage.setItem('task', JSON.stringify(todos))
    }
}

class UI {
    static displayTodos() {
        let todos = TodoStore.getTodos()
        todos.forEach(todo => UI.addTodoInList(todo))
    }
    static addTodoInList(todo) {
        let list = document.querySelector(".todo-list")
        let newTodo = document.createElement("div")
        newTodo.classList.add("todo-box")
        newTodo.innerHTML =
            `
            <div class="circle check"><ion-icon name="checkmark-outline"></ion-icon></div>
            <p class="todo-text " id="${todo.id}">${todo.text}</p>
            <ion-icon name="close-outline" class="del"></ion-icon>
            `
        list.appendChild(newTodo)


    }
    static deleteTodo(todo) {
        if (todo.classList.contains("del")) {
            todo.parentElement.remove()
        }
    }
    static clearField() {
        input.value = ''
    }
    static taskDone(todo) {
        let todos = TodoStore.getTodos()
        todos.forEach((element) => {
            if (element.id == todo.id) {
                element.doneStatus = true
                document.getElementById(element.id).classList.add('done')
            }
        });

        if (todo.classList.contains("todo-text")) {
            todo.previousElementSibling.style.backgroundImage = 'linear-gradient(to bottom right,#4568dc , #b06ab3)'
            todo.previousElementSibling.style.border = 'none'
            todo.previousElementSibling.childNodes[0].style.display = "block";
            todo.style.textDecoration = 'line-through';
            todo.style.opacity = '30%';
        }

        localStorage.setItem('task', JSON.stringify(todos))
    }
    static displayDone() {
        let todos = TodoStore.getTodos()
        todos.forEach((todo) => {
            if (todo.doneStatus === true) {

                let mytodo = document.getElementById(todo.id)
                mytodo.classList.add('done')
                if (mytodo.classList.contains("done")) {
                    mytodo.previousElementSibling.style.backgroundImage = 'linear-gradient(to bottom right,#4568dc , #b06ab3)'
                    mytodo.previousElementSibling.style.border = 'none'
                    mytodo.previousElementSibling.childNodes[0].style.display = "block";
                    mytodo.style.textDecoration = 'line-through';
                    mytodo.style.opacity = '30%';
                }
            }


        });
    }
    static clearAll() {
        let todos = TodoStore.getTodos()
        let newArray = todos.filter(todo => {
            return todo.doneStatus === false
        })
        todos.forEach(todo => {
            if (todo.doneStatus === true) {
                let mytodo = document.getElementById(todo.id)
                mytodo.parentElement.remove()
                
            }
        });
        localStorage.setItem('task', JSON.stringify(newArray))
    }
    static showLeft(text) {
        let todoLeftNum = 0
        let todoLeft = document.querySelector(".todo-left");
        let todos = TodoStore.getTodos()
        todos.forEach((todo, index) => {
            if (todo.doneStatus === false) {
                todoLeftNum++
            }
            localStorage.setItem('task', JSON.stringify(todos))
        });
        todoLeft.innerHTML = `${todoLeftNum} items left`
    }

    static sortTodo(messege) {
        let todos = TodoStore.getTodos()
        switch (messege) {
            case 'all':
                todos.forEach(todo => {
                    if (todo.doneStatus !== null) {
                        let todoHide = document.getElementById(todo.id)
                        todoHide.parentElement.style.display = 'flex'
                    }
                })
                break;
            case 'active':
                todos.forEach(todo => {
                    if (todo.doneStatus === true) {
                        let todoHide = document.getElementById(todo.id)
                        todoHide.parentElement.style.display = 'none'
                    }
                    if (todo.doneStatus === false) {
                        let todoHide = document.getElementById(todo.id)
                        todoHide.parentElement.style.display = 'flex'
                    }
                })
                break;
            case 'completed':
                todos.forEach(todo => {
                    if (todo.doneStatus === false) {
                        let todoHide = document.getElementById(todo.id)
                        todoHide.parentElement.style.display = 'none'
                    }
                    if (todo.doneStatus === true) {
                        let todoHide = document.getElementById(todo.id)
                        todoHide.parentElement.style.display = 'flex'
                    }
                })
                break;

            default:
                break;
        }
    }
}
let input = document.querySelector(".todo");
let addBtn = document.querySelector(".add");
let list = document.querySelector(".todo-list");
let clearBtn = document.querySelector(".clear");
let todoLeft = document.querySelector(".todo-left");
let sortBtn = document.querySelector(".sort");


document.addEventListener('DOMContentLoaded', () => {
    UI.displayTodos()
    UI.displayDone()
    UI.showLeft()
})

////////////////////////////
// listening users events //
////////////////////////////


sortBtn.addEventListener('click', e => {
    UI.sortTodo(e.target.classList[0]);
})
list.addEventListener('click', e => {
    UI.deleteTodo(e.target)
    TodoStore.removeTodos(e.target.previousElementSibling.id)
    UI.showLeft()
})
list.addEventListener('click', e => {
    UI.taskDone(e.target)
    UI.displayDone(e.target)
    UI.showLeft()
})

addBtn.addEventListener("click", () => {
    if (input.value === '') {
        console.log('denied')
    }
    else {
        let newTodo = new Todo(input.value)
        TodoStore.setTodos(newTodo)
        UI.addTodoInList(newTodo)
        UI.showLeft()
        UI.clearField()
    }

})
clearBtn.addEventListener("click", () => {
    UI.showLeft()
    UI.clearAll()
})
// console.log(list)


let aray = TodoStore.getTodos()
let newArray = aray.filter(todo => {
    return todo.doneStatus === true
})

    console.log(newArray);