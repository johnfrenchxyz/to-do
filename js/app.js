/*
   To Do List Application
   Taken from course at teamtreehouse.com by Andrew Chalkley
   Modified and Expanded by John French
*/

// Global Variables

var taskInput = document.getElementById("new-task");
var addButton = document.getElementById("addButton");
var incompleteTasksHolder = document.getElementById("incomplete-tasks");
var completedTasksHolder = document.getElementById("completed-tasks");

var listItemsCount = 0;


// Default Message Check
var addListItemsCheck = function() {
   var currentListItemCount = listItemsCount;
   if (currentListItemCount >= 0) {
      ++listItemsCount;
   }
}

var subtractListItemsCheck = function() {
   var currentListItemCount = listItemsCount;
   if (currentListItemCount <= 0) {
      // Do Nothing
   } else {
      --listItemsCount;
   }
}

var defaultMessageCheck = function() {
   var currentListItemCount = listItemsCount;
   console.log(currentListItemCount);
   if (currentListItemCount == 0) {
      document.getElementById('default-message').style.display = "block";
   } else { document.getElementById('default-message').style.display = "none"; }
}

// Add a New Task List Item
var createNewTaskElement = function(taskString){
   // List Item
   var listItem = document.createElement("li");
      // Input (checkbox)
      var checkBox = document.createElement("input"); // type checkbox
      // Label
      var label = document.createElement("label");
      // Input (text)
      var editInput = document.createElement("input"); // type text
      // Edit Button (button.edit)
      var editButton = document.createElement("button");
      // Delete Button (button.delete)
      var deleteButton = document.createElement("button");

      // Modify the properties of the list item elements
      checkBox.type = "checkbox";
      editInput.type = "text";
      editButton.innerHTML = "Edit";
      editButton.className = "edit";
      deleteButton.innerHTML = "Delete";
      deleteButton.className = "delete";
      label.innerText = taskString;

      // Append each of the new list item's properties
      listItem.appendChild(checkBox);
      listItem.appendChild(label);
      listItem.appendChild(editInput);
      listItem.appendChild(editButton);
      listItem.appendChild(deleteButton);

   return listItem;
}

// Add a new task
var addTask = function() {
   // Create a new list item with the text from #new-task:
   var listItem = createNewTaskElement(taskInput.value);
   // Prepare the variable for an error message if the input is blank
   var errorMessage = document.getElementById("errorMessage");

   if (taskInput.value == "") {
      // Add the error border
      taskInput.classList.add("blank-input");
      // Add the error message
      errorMessage.classList.remove("hide");
      errorMessage.classList.add("show");

   } else {

      // Remove the error border
      taskInput.classList.remove("blank-input");
      // Remove the error message
      errorMessage.classList.remove("show");
      errorMessage.classList.add("hide");

      // Append listItem to incompleteTasksHolder:
      incompleteTasksHolder.appendChild(listItem);
      bindTaskEvents(listItem, taskCompleted);

      // Make the input blank after task entry
      taskInput.value = "";

      // To determine whether or not to show the default message:
      // Add item to the count
      addListItemsCheck();
      // Run the default message check function
      defaultMessageCheck();

   }

}

// Edit an existing task
var editTask = function() {
   var listItem = this.parentNode;
   var editInput = listItem.querySelector("input[type=text]");
   var label = listItem.querySelector("label");
   var containsClass = listItem.classList.contains("editMode");
   var editButton = listItem.querySelector("button.edit");

   // If the class of the parent is .editMode:
   if(containsClass) {
      // Switch from edit mode
      // Label text becomes input's value
      label.innerText = editInput.value;
      // The editButton text defaults to "Edit"
      editButton.innerText = "Edit";
   } else {
      // Switch to edit mode
      // Input value become label's text
      editInput.value = label.innerText;
      // The editButton text changes to "Save"
      editButton.innerText = "Save";
   }

   // Toggle .editMode on the list item
   listItem.classList.toggle("editMode");
}

// Delete a task
var deleteTask = function() {
   var listItem = this.parentNode;
   var ul = listItem.parentNode;
   // Remove the parent list item from the unordered list
   ul.removeChild(listItem);
   // To determine whether or not to show the default message:
   // Add item to the count
   subtractListItemsCheck();
   // Run the default message check function
   defaultMessageCheck();
}

// Mark a task as complete
var taskCompleted = function() {
   // Append the list item to the #completed-task
   var listItem = this.parentNode;
   completedTasksHolder.appendChild(listItem);
   bindTaskEvents(listItem, taskIncomplete);
   // To determine whether or not to show the default message:
   // Add item to the count
   --listItemsCount;
   // Run the default message check function
   defaultMessageCheck();
}

// Mark a task as incomplete
var taskIncomplete = function() {
   // Append the text to #incomplete-task
   var listItem = this.parentNode;
   incompleteTasksHolder.appendChild(listItem);
   bindTaskEvents(listItem, taskCompleted);
   // To determine whether or not to show the default message:
   // Add item to the count
   ++listItemsCount;
   // Run the default message check function
   defaultMessageCheck();
}

// Bind Task Events
var bindTaskEvents = function(taskListItem, checkBoxEventHandler) {
   // Select its children
   var checkBox = taskListItem.querySelector("input[type=checkbox]");
   var editButton = taskListItem.querySelector("button.edit");
   var deleteButton = taskListItem.querySelector("button.delete");
   // Bind editTask to Edit Button
   editButton.onclick = editTask;
   // Bind deleteTask to Delete Button
   deleteButton.onclick = deleteTask;
   // Bind checkBoxEventHandler to checkbox
   checkBox.onchange = checkBoxEventHandler;
}

// Set the click handler to the addTask function
addButton.addEventListener("click", addTask, defaultMessageCheck);

window.onload = defaultMessageCheck;
// window.onchange = defaultMessageCheck;

taskInput.addEventListener("keydown", function(e){
   if(e.keyCode === 13) {
      addTask();
   }
});


// Cycle over incompleteTasksHolder
for ( var i = 0; i < incompleteTasksHolder.children.length; i++ ) {
   // Bind events to list item's children (taskIncomplete)
   bindTaskEvents(incompleteTasksHolder.children[i], taskCompleted);
}

// Cycle over completedTasksHolder
for ( var i = 0; i < completedTasksHolder.children.length; i++ ) {
   // Bind events to list item's children (taskCompleted)
   bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}
