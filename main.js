/************************** The Class Task: Represents each task ************************* */
class Task {
    constructor (title) {
        this.title = title;
    }
}

/************************** The Class UI : Handles all UI Operations ********************* */

class UI {
    
    static displayTasks () {
        const tasks = Storage.getTasks();

        tasks.forEach(task => UI.addNewTask(task));
    }

    // Adding a task to the UI
    static addNewTask (task) {

        // Create the new li element 
        const li = document.createElement('li');
        li.className = 'task-list-item';
        li.innerHTML = `
            <input class = 'task-list-checkbox' type = 'checkbox'></input>
            <p class = 'task-list-text'>${task.title}</p>
            <i class = 'fa fa-trash' aria-hidden = 'true'></i>
        `;

        // Append the new li to the existing ul 
         document.querySelector('#task-list').appendChild(li); 

    } 

    // Deleting a task from the UI
    static deleteTask (e) {
        if ( e.target.classList.contains('fa-trash') ) { // If the clicked item contains the target class 
            if ( confirm("Are you sure?") ) 
                e.target.parentElement.remove();
        }
    }  

    // Checking the Checkbox
    static checkTask (e) { 

        if ( e.target.classList.contains('task-list-checkbox') ) {
            const currText = e.target.nextElementSibling;

            if ( currText.style.color == 'var(--color3)' ) {
                currText.style.color = 'var(--color4)';
                currText.style.textDecoration = 'none';
            }
            else {
                currText.style.color = 'var(--color3)';
                currText.style.textDecoration = 'line-through';
            }
        }

    } 

    // Searching for a particular existing task 
    static filterTasks (e) { 

        const filterInputValue = document.querySelector('#filter').value.toLowerCase(); // Converting to lowercase 

        const allTasks = document.getElementsByClassName('task-list-item'); // Extracting all the list items 
        const allTexts = document.getElementsByClassName('task-list-text'); // Extracting all the list texts 
        
        for ( let i = 0; i < allTasks.length; i++ ) {
            const currTask = allTasks[i];
            const currText = allTexts[i].textContent.toLowerCase();
            if ( currText.indexOf(filterInputValue) != -1 ) {
                currTask.style.display = 'flex';
            }
            else currTask.style.display = 'none';
        }
    }

    // Hovering Effect over Search Bar
    static hoverSearchBar (e) {
        let mainHeaderForm = document.getElementById('main-header-form');
        let mainHeaderInput = document.querySelector('#main-header-form input');
        if ( e.type === 'mouseenter' ) {
            mainHeaderForm.style.backgroundColor = 'var(--color3)';
            mainHeaderInput.style.backgroundColor = 'var(--color3)';
        }
        else if ( e.type === 'mouseleave' ) {
            mainHeaderForm.style.backgroundColor = 'var(--color4)';
            mainHeaderInput.style.backgroundColor = 'var(--color4)';
        }
    }

    // Clear the Search Bar
    static clearSearchBar (e) {
        const input = e.target.previousElementSibling;
        input.value = "";
    }

} // end of class 

/*************** The Class Storage: Handles the local storage ***************** */

class Storage {

    /* Fetches the tasks from local storage */
    static getTasks () { 

        let tasks;

        if ( localStorage.getItem('tasks') === null ) 
            tasks = [];
        else 
            tasks = JSON.parse (localStorage.getItem('tasks')); // list of JS objects 

        return tasks;

    }

    /* Adds new tasks to the local storage */
    static addNewTask (task) { 

        const tasks = this.getTasks();

        tasks.push(task);

        localStorage.setItem ('tasks', JSON.stringify(tasks));

    }

    /* Deletes task from the local storage */
    static deleteTask (taskTitle) {
        const tasks = Storage.getTasks();

        tasks.forEach((task, index) => {
            if ( task.title === taskTitle ) {
                tasks.splice (index, 1);
            }
        })

        localStorage.setItem ('tasks', JSON.stringify(tasks));
    }

}

/************************** Event: Hover over Search Bar ************************/ 

document.querySelector('#main-header-form').addEventListener('mouseenter', UI.hoverSearchBar);
document.querySelector('#main-header-form').addEventListener('mouseleave', UI.hoverSearchBar);

/**************** Event: Click the cross button on search bar *******************/

document.querySelector('#clear-search').addEventListener('click', UI.clearSearchBar);


/************************** EVENT: DISPLAY TASKS ********************************/

document.addEventListener('DOMContentLoaded', UI.displayTasks);

/************************** EVENT: ADD A NEW TASK *******************************/

/* By the Add Icon */
document.getElementById("add-task-icon").addEventListener('click', addTask) 

/* By Pressing the Enter Key in the Input field */
document.getElementById("add-task-input").addEventListener('keyup', e => {
    if ( e.keyCode === 13 )
        addTask(e);
});

/* The addTask() method */
function addTask (e) {

    const inputValue = document.getElementById("add-task-input").value;

    // Check if input is empty 
    if ( inputValue === "" )
        return;

    // Instantiate the Task Class 
    const task = new Task (inputValue);
    
    // Add Task to UI
    UI.addNewTask(task);

    // Add Task to the Local Storage 
    Storage.addNewTask(task);

    // Clear the input field 
    document.getElementById("add-task-input").value = "";
}

/************************** Event: Delete a Task ****************************** */

document.querySelector('#task-list').addEventListener('click', e => {

    // Delete the task from the UI
    UI.deleteTask(e);

    // Delete the task from the local storage 
    if ( e.target.classList.contains('fa-trash')) {
        Storage.deleteTask(e.target.previousElementSibling.textContent);
    }
});

/************************** Event: Check a Task ******************************* */

document.querySelector('#task-list').addEventListener('click', UI.checkTask);

/************************** Event: Filter Tasks  ****************************** */

document.getElementById ('filter').addEventListener ('keyup', UI.filterTasks);