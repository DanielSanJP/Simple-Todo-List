var myNodelist = document.getElementsByTagName("LI");
var close = document.getElementsByClassName("close");
var list = document.querySelector('ul');
var todos = [];

// Save list items to localStorage
function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

// Load saved list items from localStorage
function loadTodos() {
    if (localStorage.getItem('todos')) {
        todos = JSON.parse(localStorage.getItem('todos'));
    } else {
        todos = [];
    }
    todos.forEach(function (todo) {
        createTodoItem(todo.text, todo.isChecked);
    });
}

// Create a new list item
function createTodoItem(todoText, isChecked) {
    var li = document.createElement("li");
    var t = document.createTextNode(todoText);
    li.appendChild(t);
    document.getElementById("ToDoList").appendChild(li);

    // Create a "close" button and append it to the list item
    var span = document.createElement("SPAN");
    var txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    li.appendChild(span);

    // Click on a close button to hide the current list item
    span.onclick = function () {
        var div = this.parentElement;
        div.style.display = "none";

        // Update the todos array and save to localStorage
        var todoIndex = todos.findIndex(function (todo) {
            return todo.text === todoText;
        });
        if (todoIndex !== -1) {
            todos.splice(todoIndex, 1);
            saveTodos();
        }
    };

    // Apply "checked" class if item is checked
    if (isChecked) {
        li.classList.add('checked');
    }

    // Add event listener to the list item
    li.addEventListener('click', function (ev) {
        if (ev.target.tagName === 'LI') {
            ev.target.classList.toggle('checked');

            // Update the checked status in todos array and save to localStorage
            var todoIndex = todos.findIndex(function (todo) {
                return todo.text === todoText;
            });
            if (todoIndex !== -1) {
                todos[todoIndex].isChecked = !todos[todoIndex].isChecked;
                saveTodos();
            }
        }
    });
}

// Load saved todos on page load
loadTodos();

// Event listener for "Add" button
function newElement() {
    var inputValue = document.getElementById("myInput").value;
    if (inputValue === '') {
        alert("You must write something!");
    } else {
        createTodoItem(inputValue, false); // Initialize as unchecked
        todos.push({ text: inputValue, isChecked: false }); // Include isChecked property
        saveTodos();
    }
    document.getElementById("myInput").value = "";
}
