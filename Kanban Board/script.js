// Get the main elements from the page
const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const todoList = document.getElementById("list1");
const lists = document.querySelectorAll(".list");

// Add drag and remove events to a task card
function attachCardEvents(card) {
    card.addEventListener("dragstart", dragStart);
    card.addEventListener("dragend", dragEnd);

    const removeBtn = card.querySelector(".remove-btn");
    if (removeBtn) {
        removeBtn.addEventListener("click", removeTask);
    }
}

// Create a new task card with text and a remove button
function createCard(taskText) {
    const card = document.createElement("div");
    card.className = "card";
    card.draggable = true;
    card.id = `card-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    card.innerHTML = `
        <span class="task-text">${taskText}</span>
        <button class="remove-btn" type="button" aria-label="Remove task">×</button>
    `;

    attachCardEvents(card);
    return card;
}

// Add a new task to the To Do list
function addTask() {
    const taskText = taskInput.value.trim();

    if (!taskText) {
        taskInput.focus();
        return;
    }

    todoList.appendChild(createCard(taskText));
    taskInput.value = "";
    taskInput.focus();
}

// Remove the selected task card
function removeTask(e) {
    e.stopPropagation();
    e.target.closest(".card").remove();
}

// Apply event listeners to existing cards and columns
for (const card of document.querySelectorAll(".card")) {
    attachCardEvents(card);
}

for (const list of lists) {
    list.addEventListener("dragover", dragOver);
    list.addEventListener("dragenter", dragEnter);
    list.addEventListener("dragleave", dragLeave);
    list.addEventListener("drop", dragDrop);
}

// Add task when the button is clicked or Enter is pressed
addTaskBtn.addEventListener("click", addTask);
taskInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        addTask();
    }
});

// Handle drag and drop behavior for moving cards between lists
function dragStart(e) {
    e.dataTransfer.setData("text/plain", this.id);
}

function dragEnd() {
    console.log("Drag ended");
}

function dragOver(e) {
    e.preventDefault();
}

function dragEnter(e) {
    e.preventDefault();
    this.classList.add("over");
}

function dragLeave(e) {
    this.classList.remove("over");
}

function dragDrop(e) {
    const id = e.dataTransfer.getData("text/plain");
    const card = document.getElementById(id);

    if (card) {
        this.appendChild(card);
    }

    this.classList.remove("over");
}