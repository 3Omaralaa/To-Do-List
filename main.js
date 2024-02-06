/*  My Tasks */
// [1] Use Sweet Alert If Input Is Empty
// [2] Add Task To Local Storage
/* ***************************************************************************** */

// collecting information
// Set Up Variables
let theInput = document.querySelector(".header input");
let theAddButton = document.querySelector(".header .plus");
let theTasksContent = document.querySelector(".todo-content");
let theTasksStats = document.querySelector(".tasks-stats");
let theTasksCount = document.querySelector(".tasks-count span");
let theTasksCompleted = document.querySelector(".tasks-completed span ");

// focus on input field
window.onload = function () {
  theInput.focus();
  noTaskMsg();
};

// Add button on click
theAddButton.onclick = function () {
  if (theInput.value === "") {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "The Field is Empty!",
    });
  } else {
    let theMessageNoTasks = document.querySelector(".no-tasks");
    if (document.body.contains(document.querySelector(".no-tasks"))) {
      theMessageNoTasks.remove();
    }
    // create main span (Tasks Name)
    let mainSpan = document.createElement("span");
    // create span (Delete button)
    let deleteSpan = document.createElement("span");
    // create text content to span
    let text = document.createTextNode(theInput.value);
    // create delete text content to button
    let deleteText = document.createTextNode("delete");
    // Add text to main span
    mainSpan.appendChild(text);
    // Add class to main span
    mainSpan.setAttribute("class", "task-box");
    // Add delete text to span
    deleteSpan.appendChild(deleteText);
    //  Add class to delete button
    deleteSpan.className = "delete";
    // Add delete span to main span
    mainSpan.appendChild(deleteSpan);
    // Add the Tasks to todo-content
    theTasksContent.appendChild(mainSpan);
    // Empty the Input
    theInput.value = "";
    // Calculate Tasks
    calcTasks();
  }
};

/* Add an event listener to the document that listens for a click event.  
When a click event occurs,it checks if the target element has a class name of "delete" 
and logs "This Is Our Element" to the console if it does.*/
document.addEventListener("click", function (e) {
  // Delete Task
  if (e.target.className == "delete") {
    // Remove Current Task
    e.target.parentNode.remove();
    // Check The Number Of Tasks Inside The todo-content
    if (theTasksContent.childElementCount == 0) {
      noTaskMsg();
    }
  }
  // Finish Task
  if (e.target.classList.contains("task-box")) {
    // Remove Current Task
    e.target.classList.toggle("finished");
  }
  // Calculate Tasks
  calcTasks();
});

// Function to Create No Task Message
function noTaskMsg() {
  // Create The Span Element
  let noTaskSpan = document.createElement("span");
  // Create The text (No Tasks Message)
  let textMsg = document.createTextNode("No Tasks To Show");
  // Add Class to The Span Element
  noTaskSpan.setAttribute("class", "no-tasks");
  // Add The text (No Tasks Message) To The Span
  noTaskSpan.appendChild(textMsg);
  // Add The Span Element to The todo-content
  theTasksContent.appendChild(noTaskSpan);
}

// Function To Calculate Tasks
function calcTasks() {
  // Calculate All Tasks
  theTasksCount.innerHTML = document.querySelectorAll(
    ".todo-content .task-box"
  ).length;
  // Calculate Completed Tasks
  theTasksCompleted.innerHTML = document.querySelectorAll(
    ".todo-content .finished"
  ).length;
}

// Add Task To Local Storage
theInput.onkeyup = function () {
  window.localStorage.setItem("Task", theInput.value);
};

if (localStorage.length > 0) {
  theInput.value = window.localStorage.getItem("Task");
}
