var todos = [];

var todoInput = document.getElementById('todo');
var collection = document.getElementsByClassName('todo-items')[0];
var addbtn = document.getElementById('addbtn');
var countH = document.getElementById('count');
var editIsActive = false;
var editableTodo = todos[0];

function check(todo, id) {
    if (todo.classList.contains('text-decoration-line-through')) {
        todo.classList.remove('text-decoration-line-through');
        todos.find(t => 'l' + t.Id == id).Finished = false;
    }
    else {
        todo.classList.add('text-decoration-line-through');
        todos.find(t => 'l' + t.Id == id).Finished = true;
    }
    saveTodos();
    setCount();
}

function createTodo(str, id) {
    return `
    <div class="todo-item mt-3" id="d${id}">
        <div class="d-inline form-check">
            <input class="form-check-input" type="checkbox" name="flexRadioDefault" id="ch${id}">
            <label onclick="check(this, this.id)" class="form-check-label" id="l${id}" for="ch${id}">
                ${str}
            </label>
        </div>
        <div>
            <button class="btn btn-primary" id="${id}" onclick="edit(this.id)"><i class="bi bi-pencil-square"></i></button>
            <button class="btn btn-danger" id="${id}" onclick="if(confirm('Are you sure delete this todo?')) deleteTodo(this.id);"><i class="bi bi-trash"></i></button>
        </div>
    </div>
    `;
}

function addtodo() {
    if (!editIsActive && todoInput.value != '') {
        let id = 1;
        if (todos.length > 0) {
            id = todos[todos.length - 1].Id + 1;
        }
        var newTodo = {
            "Id": id,
            "Todo": todoInput.value,
            "Finished": false
        };
        todos.push(newTodo);
        //console.log(createTodo(todoInput.value))
        collection.innerHTML += createTodo(todoInput.value, newTodo.Id);
        todoInput.value = '';
    }
    else {
        editableTodo.Todo = todoInput.value;
        console.log(editableTodo);
        var label = document.getElementById("l" + editableTodo.Id);
        console.log(label.id + "     " + label.innerHTML)
        label.innerHTML = editableTodo.Todo;
        editIsActive = false;
        addbtn.innerText = "Add";
        todoInput.value = '';
    }
    saveTodos();
    setCount();
}

function edit(id) {
    editableTodo = todos.find(t => t.Id == Number(id));
    todoInput.value = editableTodo.Todo;
    editIsActive = true;
    addbtn.innerText = "Save";
    saveTodos();
}

function deleteTodo(id) {
    var todo = todos.find(t => t.Id == id);
    todos.pop(todo);

    var el = document.getElementById('d' + id);
    el.remove();
    saveTodos();
}

function setCount() {
    var count = todos.filter(t => t.Finished == false).length;
    if (count > 0) {
        countH.innerText = "You have " + count + " tasks to complete";
    }
    else {
        countH.innerText = "You have no any todos yet!";
    }
}

function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

function loadTodos() {
    var json = localStorage.getItem('todos');
    if (json != null) {
        todos = JSON.parse(json);
        for (let i = 0; i < todos.length; i++) {
            var todo = todos[i];
            collection.innerHTML += createTodo(todo.Todo, todo.Id);
            if (todo.Finished == true) {
                var todoCheck = document.getElementById('ch' + todo.Id);
                todoCheck.setAttribute("checked", true);
                var todoLabel = document.getElementById('l' + todo.Id);
                if (todoLabel.classList.contains('text-decoration-line-through')) {
                    todoLabel.classList.remove('text-decoration-line-through');
                }
                else {
                    todoLabel.classList.add('text-decoration-line-through');
                }
            }
        }

        var count = todos.filter(t => t.Finished == false).length;
        if (count > 0) {
            countH.innerText = "You have " + count + " tasks to complete";
        }
        else {
            countH.innerText = "You have no any todos yet!";
        }
    }
}