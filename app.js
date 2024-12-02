
//
//Variables
//

let TASKS = JSON.parse(localStorage.getItem('tasks')) || [] //masyvas užduotims saugoti
let task = []; //masyvas konkrečiai užduočiai
const DisplayTasksBin = document.querySelector('.display-tasks-bin');

const enterBtn = document.querySelector('button.enter-btn');
// const doneBtn = savedHTML.querySelector('button.display-btn-done');

// console.log(doneBtn);

//
//Funtions & Methods
//
const TaskIDRandom = (min, max) =>{
        const minCeiled = Math.ceil(min);
        const maxFloored = Math.floor(max);
        return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
    };

    // Render tasks to the HTML
const renderTasks = ()=>{
    DisplayTasksBin.innerHTML= "";
    TASKS.forEach((task)=>{
       DisplayTasksBin.innerHTML +=`
                <fieldset class="display-task" data-id="${task.id}">
                    <legend class="display-priority">Priority: ${task.priority}</legend>
                    <div class="display-task-text"> ${task.text}</div>
                    <div class="second-line">
                        <div class="display-task-date"> ${task.date}</div>
                        <button class="display-btn-done" value="${task.done}">done!</button>
                        <button class="display-btn-delete">delete</button>
                    </div>
                </fieldset>`;
            });
};
// Save tasks to localStorage
const saveTasks = () => {
    localStorage.setItem('tasks', JSON.stringify(TASKS));
};

// Initialize tasks from localStorage
const init = () => {
    renderTasks();
};

//
//Inits & Event Listeners
//
init();

enterBtn.addEventListener ('click', _ =>{
    if(document.querySelector('.enter-text').value !==''){
        const textInput = document.querySelector('.enter-text');
        const dateInput = document.querySelector('.enter-date');
        const priorityInput = document.querySelector('.enter-priority');

        const newTask = {
            id: TaskIDRandom(1000000,99999999),
            date: dateInput.value || 'No date',
            text: textInput.value,
            priority: priorityInput.value || 'Normal',
            done: false,
        };

        TASKS.unshift(newTask); // Add new task to the array
        saveTasks(); // Save to localStorage
        renderTasks(); // Update the UI

        textInput.value = ''; // Clear input field
    }
});







