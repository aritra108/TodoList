/************************** The Class UI : Handles all UI Operations ********************* */

class UI {

    // Adding a task to the UI
    static addNewTask (e) {

        const addTaskInput = document.querySelector('#add-task-input');
        const inputValue = addTaskInput.value;

        // if the input field is not empty 
        if ( inputValue != "" ) { 

            // Create the new li element 
            const li = document.createElement('li');
            li.className = 'task-list-item';
            li.innerHTML = `
                <input class = 'task-list-checkbox' type = 'checkbox'></input>
                <p class = 'task-list-text'>${inputValue}</p>
                <i class = 'fa fa-trash' aria-hidden = 'true'></i>
            `;

            // Append the new li to the existing ul 
            document.querySelector('#task-list').appendChild(li);

            // Clear the input field 
            addTaskInput.value = "";
        } 
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

/************************** Event: Hover over Search Bar ************************/ 

document.querySelector('#main-header-form').addEventListener('mouseenter', UI.hoverSearchBar);
document.querySelector('#main-header-form').addEventListener('mouseleave', UI.hoverSearchBar);

/**************** Event: Click the cross button on search bar *******************/

document.querySelector('#clear-search').addEventListener('click', UI.clearSearchBar);

/************************** Event: Add a New Task *******************************/

document.getElementById("add-task-icon").addEventListener('click', UI.addNewTask); // By the Add Icon 
 
document.getElementById("add-task-input").addEventListener('keyup', e => {  // By Pressing the Enter Key in the Input Field
    if ( e.keyCode === 13 ) {
        UI.addNewTask(e);
    }
});

/************************** Event: Delete a Task ****************************** */

document.querySelector('#task-list').addEventListener('click', UI.deleteTask);

/************************** Event: Check a Task ******************************* */

document.querySelector('#task-list').addEventListener('click', UI.checkTask);

/************************** Event: Filter Tasks  ****************************** */

document.getElementById ('filter').addEventListener ('keyup', UI.filterTasks);