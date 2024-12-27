
//
//Variables
//

let TASKS = JSON.parse(localStorage.getItem('tasks')) || [] //masyvas užduotims saugoti
const DisplayTasksBin = document.querySelector('.display-tasks-bin');


const enterBtn = document.querySelector('button.enter-btn');
const doneBtn = document.querySelector('button.display-btn-done');
const deleteBtn = document.querySelector('.button.display-btn-delete');


//
//Functions & Methods
//
const TaskIDRandom = (min, max) => {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
};

// Render tasks to the HTML
const renderTasks = () => {
    DisplayTasksBin.innerHTML = "";
    TASKS.forEach((task) => {
        let doneText = '';
        let btnDoneTxt = '';
        if (task.done === true) {
            doneText = '✔︎';
            btnDoneTxt = 'DONE!'
        } else {
            doneText = '❍';
            btnDoneTxt = 'FINISH'
        }
        DisplayTasksBin.innerHTML += `
                <fieldset class="display-task" data-id="${task.id}">
                    <legend class="display-priority">Priority: ${task.priority}</legend>
                    <div class="display-task-text done-${task.done}">  ${doneText}  <span>${task.text}</span></div>
                    <div class="second-line">
                        <div class="display-task-date done-${task.done}"> <span>${task.date}<span></div>
                        <button class="display-btn-done btn-done-${task.done}" value="${task.done}">
                        ${btnDoneTxt} </button >
    <button class="display-btn-delete">delete</button>
                    </div >
                </fieldset > `;
    });
};


// Save tasks to localStorage
const saveTasks = () => {
    localStorage.setItem('tasks', JSON.stringify(TASKS));
};// Initialize tasks from localStorage
const init = () => {
    renderTasks();
    saveTasks();
    buttonsListen();
};

//
//Inits & Event Listeners
//


enterBtn.addEventListener('click', _ => {
    if (document.querySelector('.enter-text').value !== '') {
        const textInput = document.querySelector('.enter-text');
        const dateInput = document.querySelector('.enter-date');
        const priorityInput = document.querySelector('.enter-priority');

        const newTask = {
            id: TaskIDRandom(1000000, 99999999),
            date: dateInput.value || 'No date',
            text: textInput.value,
            priority: priorityInput.value,
            done: 'false'
        };


        TASKS.unshift(newTask); // Add new task to the array
        init();


        textInput.value = ''; // Clear input field
    }
});


const buttonsListen = _ => {
    const displayTasks = document.querySelectorAll('.display-task');
    displayTasks.forEach(task => {
        task.querySelector('button.display-btn-done').addEventListener('click', _ => {
            const dataID = parseInt(task.dataset.id);
            console.log('paspausta done', dataID);

            TASKS = TASKS.map((task => {
                if (task.id === dataID) {
                    task.done = !task.done;
                    console.log(task.done);
                }
                return task;
            }));

            init();



        });
        task.querySelector('.display-task-text').addEventListener('click', _ => {
            const dataID = parseInt(task.dataset.id);
            console.log('paspausta užduotis', dataID);

            TASKS = TASKS.map((task => {
                if (task.id === dataID) {
                    task.done = !task.done;
                    console.log(task.done);
                }
                return task;
            }));
            init();
        });

        task.querySelector('button.display-btn-delete').addEventListener('click', _ => {
            const dataID = parseInt(task.dataset.id);
            console.log('paspausta delete', dataID);
            TASKS = TASKS.filter(task => task.id !== dataID);
            init();
        });
    });

};

init();





