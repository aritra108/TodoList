/************************ The Main Header Form ************************** */ 

let mainHeaderForm = document.getElementById('main-header-form');
let mainHeaderInput = document.querySelector('#main-header-form input');

// The Hovering Effect
mainHeaderForm.addEventListener('mouseenter', e => {
    mainHeaderForm.style.backgroundColor = '#ffcb8e';
    mainHeaderInput.style.backgroundColor = '#ffcb8e';
});

mainHeaderForm.addEventListener('mouseleave', e => {
    mainHeaderForm.style.backgroundColor = '#e97171';
    mainHeaderInput.style.backgroundColor = '#e97171';
});


/*********************** Adding elements in the task list *************************/

let filterInput = document.getElementById ('filter');
let addTaskInput = document.getElementById("add-task-input");
let addTaskIcon = document.getElementById("add-task-icon");
let taskList = document.getElementById("task-list");

addTaskIcon.addEventListener('click', addNewTask); // By the Add Icon 
addTaskInput.addEventListener('keyup', e => { // by Pressing the Enter Key in the input field 
    if ( e.keyCode === 13 ) {
        addNewTask();
    }
})

function addNewTask (e) {

    let inputValue = addTaskInput.value;

    if ( inputValue != "" ) { /* If input field is not empty */

        /* Create a new li element */
        let newTask = document.createElement('li');
        newTask.className = 'task-list-item';

        /* Create new checkbox */
        let newTaskCheckbox = document.createElement('input');
        newTaskCheckbox.className = 'task-list-checkbox';
        newTaskCheckbox.setAttribute('type', 'checkbox');
        newTask.appendChild(newTaskCheckbox);

        /* Create new p */
        let newTaskText = document.createElement('p');
        newTaskText.className = 'task-list-text';
        let newTaskTextNode = document.createTextNode(inputValue);
        newTaskText.appendChild(newTaskTextNode);
        newTask.appendChild(newTaskText);

        /* Create new i */
        let newTaskDeleteIcon = document.createElement('i');
        newTaskDeleteIcon.className = 'fa fa-trash';
        newTaskDeleteIcon.setAttribute('aria-hidden', 'true');
        newTask.appendChild(newTaskDeleteIcon);

        /* Append the new li to the existing ul */
        taskList.appendChild(newTask);

        /* Clear the input field */
        addTaskInput.value = "";
    }
};

/********************************** Checking a Task ******************************* */
taskList.addEventListener('click', e => {
    if ( e.target.classList.contains('task-list-checkbox') ) {
        let currText = e.target.nextElementSibling;
        console.log ('Checkbox clicked');
        console.log ('Text Color = ' + currText.style.color);
        if ( currText.style.color == 'rgb(204, 204, 204)' ) {
            console.log (1);
            currText.style.color = '#810000';
            currText.style.textDecoration = 'none';
        }
        else {
            currText.style.color = '#ccc';
            currText.style.textDecoration = 'line-through';
        }
    }
})


/*************************** Deleting a Task from the List **************************** */

taskList.addEventListener('click', e => {
    if ( e.target.classList.contains('fa-trash') ) { /* If the clicked item contains the mentioned class */
        if ( confirm("Are you sure?") ) {
            let currTaskItem = e.target.parentElement;
            taskList.removeChild(currTaskItem);
        }
    }
})

/**************************** Filtering Tasks ************************************* */

filterInput.addEventListener ('keyup', e => { // Fuunction will trigger in every key up

    let filterInputValue = filterInput.value.toLowerCase(); // Converting to lowercase 

    let allTasks = document.getElementsByClassName('task-list-item'); // Extracting all the list items 
    let allTexts = document.getElementsByClassName('task-list-text'); // Extracting all the list texts 
    
    for ( let i = 0; i < allTasks.length; i++ ) {
        let currTask = allTasks[i];
        let currText = allTexts[i].textContent.toLowerCase();
        if ( currText.indexOf(filterInputValue) != -1 ) {
            currTask.style.display = 'flex';
        }
        else currTask.style.display = 'none';
    }

})