
//
//Variables
//

const TASKS = []; //masyvas užduotims saugoti
let task = []; //masyvas konkrečiai užduočiai
let savedHTML; //HTML užkrovimui iš local storage
let DisplayTasksBin = document.querySelector('.display-tasks-bin');

const enterBtn = document.querySelector('button.enter-btn');
// const doneBtn = html.innerHTML.querySelector('button.display-btn-done');

//
//Funtions & Methods
//
const TaskIDRandom = (min, max) =>{
        const minCeiled = Math.ceil(min);
        const maxFloored = Math.floor(max);
        return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
    };

const renderTaskListToHtml = (task)=>{
    savedHTML +=`    <fieldset class="display-task">
                    <legend class="display-priority">Priority: ${task.priority}</legend>
                    <div class="display-task-text"> ${task.text}</div>
                    <div class="second-line"><div class="display-task-date"> ${task.date}</div>
                    <button class="display-btn-done" value="${task.done}">done!</button>
                    <button class="display-btn-delete">delete</button></div>
                </fieldset>`;
};

const init = _ =>{
    savedHTML = localStorage.getItem('html') || '';
    DisplayTasksBin.innerHTML = savedHTML;
};


//
//Inits & Event Listeners
//
init();

enterBtn.addEventListener ('click', _ =>{
    if(document.querySelector('.enter-text').value !==''){
        task.id = TaskIDRandom(1000000,99999999);
        task.text = (document.querySelector('.enter-text').value);
        task.date = (document.querySelector('.enter-date').value);
        task.done = 1;
        task.priority = (document.querySelector('.enter-priority').value);
        console.log(task);
        renderTaskListToHtml(task);
        localStorage.setItem("html", savedHTML);
        init();
    }

});

// doneBtn.addEventListener('click', _ =>{
//     console.log('atlikta');
//     });



console.log(savedHTML);




