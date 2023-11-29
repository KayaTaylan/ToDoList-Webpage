// Function to allow drop
function allowDrop(event) {
    event.preventDefault();
}

// Function to handle drag
function drag(event) {
    event.dataTransfer.setData("text/plain", event.target.id);
}

// Function to handle drop
function drop(event) {
    event.preventDefault();
    const todoId = event.dataTransfer.getData("text/plain");
    const draggedElement = document.getElementById(todoId);
    const todoList = document.getElementById("todoList");
    todoList.insertBefore(draggedElement, todoList.childNodes[0]);

    // Update the order of todos in local storage
    updateLocalStorage();
}

// Function to add a new todo
function addTodo(event) {
    if (event.key === "Enter") {
        const newTodoText = document.getElementById("newTodo").value;
        if (newTodoText.trim() !== "") {
            const todoList = document.getElementById("todoList");
            const newTodo = createTodoElement(newTodoText);
            todoList.appendChild(newTodo);

            // Save the updated todo list to local storage
            saveTodosToLocalStorage();

            document.getElementById("newTodo").value = ""; // Clear input
        }
    }
}

// Function to create a new todo element
function createTodoElement(text) {
    const newTodo = document.createElement("li");
    newTodo.className = "todo-item";
    newTodo.id = "todo" + Date.now();
    newTodo.draggable = true;
    newTodo.addEventListener("dragstart", drag);
    newTodo.innerText = text;

    // Add click event to delete the todo item
    newTodo.addEventListener("click", function () {
        const todoList = document.getElementById("todoList");
        todoList.removeChild(newTodo);

        // Update local storage after deletion
        saveTodosToLocalStorage();
    });

    return newTodo;
}

// Function to save todos to local storage
function saveTodosToLocalStorage() {
    const todoList = document.getElementById("todoList");
    const todos = Array.from(todoList.children).map(todo => ({
        id: todo.id,
        text: todo.innerText
    }));

    localStorage.setItem("todos", JSON.stringify(todos));
}

// Function to load todos from local storage
function loadTodosFromLocalStorage() {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
        const todos = JSON.parse(storedTodos);

        const todoList = document.getElementById("todoList");
        todos.forEach(todo => {
            const newTodo = createTodoElement(todo.text);
            newTodo.id = todo.id;
            todoList.appendChild(newTodo);
        });
    }
}

// Update local storage when the page loads
window.onload = function () {
    loadTodosFromLocalStorage();
};
