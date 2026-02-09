import { TaskService } from './services/TaskService.js';
import { TaskUI } from './ui/TaskUI.js';
const service = new TaskService();
const ui = new TaskUI(service);
// Render all columns initially
// ui.render();
// ------------------- Modal logic -------------------
const addBtn = document.querySelector('.plus-button');
const taskModal = document.querySelector('.task');
const backdrop = document.querySelector('.task-backdrop');
const cancelBtn = document.querySelector('.cancel-btn');
const closeBtn = document.querySelector('.close-btn');
function openModal() {
    taskModal.classList.remove('d-none');
    backdrop.classList.remove('d-none');
}
function closeModal() {
    taskModal.classList.add('d-none');
    backdrop.classList.add('d-none');
}
addBtn.addEventListener('click', openModal);
cancelBtn.addEventListener('click', closeModal);
closeBtn.addEventListener('click', closeModal);
backdrop.addEventListener('click', closeModal);
// ------------------- Form submission -------------------
const form = taskModal.querySelector('form');
const titleInput = form.querySelector('#exampleFormControlInput1');
const descriptionInput = form.querySelector('#exampleFormControlTextarea1');
const priorityBtn = form.querySelector('.drop-btn');
const priorityOptions = form.querySelectorAll('.dropdown-item');
priorityOptions.forEach(option => {
    option.addEventListener('click', e => {
        var _a;
        e.preventDefault();
        priorityBtn.textContent = (_a = option.textContent) === null || _a === void 0 ? void 0 : _a.trim();
    });
});
form.addEventListener('submit', e => {
    var _a;
    e.preventDefault();
    const task = {
        id: crypto.randomUUID(),
        title: titleInput.value,
        description: descriptionInput.value,
        priority: ((_a = priorityBtn.textContent) === null || _a === void 0 ? void 0 : _a.trim()) || 'Medium',
        createdAt: Date.now(),
        status: 'todo'
    };
    service.addTask(task);
    //   ui.render();
    form.reset();
    priorityBtn.textContent = 'Medium'; // Reset dropdown
    closeModal();
});
//# sourceMappingURL=app.js.map