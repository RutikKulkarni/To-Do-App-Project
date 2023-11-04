document.getElementById("date").textContent = new Date().toLocaleDateString(
  "en-us",
  {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric"
  }
);
let todoItems = [];
//
updateTodoItems = (items) => {
  todoItems = items;
  localStorage.setItem("todoItems", JSON.stringify(todoItems));
};
//
const todoForm = document.getElementById("todo-form");
const clrBtn = document.getElementById("clr-todo");
const todoList = document.getElementById("todo-list");
// Form Handled
todoForm.addEventListener("submit", (event) => {
  event.preventDefault();
  //
  let id = `todo-${todoList.children.length + 1}`;
  let text = todoForm.elements["new-todo"].value;
  if (text) {
    let todoItem = {
      id,
      text,
      complete: false
    };
    updateTodoItems([...todoItems, todoItem]);
    addToDo(todoItem);
    localStorage.setItem("todoItems", JSON.stringify(todoItems));
  }
  todoForm.elements["new-todo"].value = "";
  todoForm.elements["new-todo"].focus();
});
// Adding an item to the list.
const addToDo = ({ id, text, complete }) => {
  let listItem = document.createElement("li");
  listItem.classList.add("list-group-item", "p-3");
  let input = document.createElement("input");
  input.classList.add("form-check-input", "me-1");
  input.id = id;
  input.type = "checkbox";
  //
  let label = document.createElement("label");
  label.classList.add("form-check-label");
  label.innerHTML = text;
  label.htmlFor = id;
  //
  if (complete) {
    input.checked = true;
    label.innerHTML = `<strike>${text}</strike>`;
  }
  //
  listItem.append(input);
  listItem.append(label);
  todoList.append(listItem);
};
// Event Delegation
todoList.addEventListener("change", (event) => {
  id = event.target.id;
  updateTodoItems(
    todoItems.map((item) => {
      if (item.id === id) {
        item.complete = event.target.checked;
      }
      return item;
    })
  );
  //
  const label = document.querySelector(`label[for=${id}]`);
  console.log(id, label);
  if (event.target.checked) {
    label.innerHTML = `<strike>${label.textContent}</strike>`;
  } else {
    label.innerHTML = label.textContent;
  }
});
// clearing all todos from DOM and memory
clrBtn.addEventListener("click", () => {
  updateTodoItems([]);
  todoList.innerHTML = "";
});
// loading todos from localstorage
document.addEventListener("DOMContentLoaded", () => {
  todoItems = JSON.parse(localStorage.getItem("todoItems") || "[]");
  todoItems.forEach(addToDo);
  console.log(todoItems);
});
