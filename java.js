document.addEventListener('DOMContentLoaded', loadTasks);

const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');

addTaskBtn.addEventListener('click', addTask);
taskList.addEventListener('click', handleTaskClick);

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
        createTaskElement(task.text, task.completed);
    });
}

function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText === '') return;

    createTaskElement(taskText, false);
    saveTaskToLocalStorage(taskText, false);
    taskInput.value = '';
}

function createTaskElement(text, completed) {
    const li = document.createElement('li');
    li.className = completed ? 'completed' : '';
    li.innerHTML = `
        <span>${text}</span>
        <button class="remove-btn">Remove</button>
    `;
    taskList.appendChild(li);
    if (completed) li.classList.add('completed');
}

function handleTaskClick(event) {
    if (event.target.classList.contains('remove-btn')) {
        const li = event.target.parentElement;
        const taskText = li.firstChild.textContent;
        removeTaskFromLocalStorage(taskText);
        li.remove();
    } else {
        const li = event.target.parentElement;
        li.classList.toggle('completed');