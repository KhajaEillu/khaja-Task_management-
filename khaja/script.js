const taskInput = document.getElementById('taskInput');
const addTaskButton = document.getElementById('addTaskButton');
const taskList = document.getElementById('taskList');
const progressBar = document.getElementById('progressBar');
const progressLabel = document.getElementById('progressLabel');
const userNameInput = document.getElementById('userName');
const welcomeMessage = document.getElementById('welcomeMessage'); 
const themeSwitch = document.getElementById('themeSwitch');

let tasks = [];

function updateProgress() {
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(task => task.completed).length;
    const progress = totalTasks ? (completedTasks / totalTasks) * 100 : 0;

    progressBar.value = progress;
    progressLabel.textContent = `${Math.round(progress)}%`;
}

function renderTasks() {
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
        const taskDiv = document.createElement('div');
        taskDiv.classList.add('task');
        
        taskDiv.innerHTML = `
            <input type="checkbox" ${task.completed ? 'checked' : ''} onchange="toggleTask(${index})">
            <span class="${task.completed ? 'completed' : ''}">${task.text}</span>
            <button onclick="editTask(${index})">Edit</button>
            <button onclick="deleteTask(${index})">Delete</button>
        `;
        
        taskList.appendChild(taskDiv);
    });
    
    updateProgress();
}

function addTask() {
    const taskText = taskInput.value.trim();
    console.log("Add Task Clicked"); 
    if (taskText) {
        tasks.push({ text: taskText, completed: false });
        taskInput.value = '';
        renderTasks();
    } else {
        console.log("Task input is empty."); 
    }
}

function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    renderTasks();
}

function editTask(index) {
    const newTaskText = prompt('Edit task:', tasks[index].text);
    if (newTaskText) {
        tasks[index].text = newTaskText;
        renderTasks();
    }
}

function deleteTask(index) {
    tasks.splice(index, 1);
    renderTasks();
}

themeSwitch.addEventListener('change', () => {
    document.body.classList.toggle('dark-mode');
});

addTaskButton.addEventListener('click', addTask);
userNameInput.addEventListener('input', () => {
    const name = userNameInput.value.trim();
    welcomeMessage.textContent = name ? `Welcome, ${name}!` : ''; 
    document.title = `Task Management - ${name}`;
});
