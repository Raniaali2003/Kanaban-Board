import { TaskService } from './services/TaskService.js';
import { TaskUI } from './ui/TaskUI.js';
import type { Task, Priority } from './models/Task.js';

const service = new TaskService();
const ui = new TaskUI(service);

// Render all columns initially
// ui.render();

// ------------------- Modal logic -------------------
const addBtn = document.querySelector<HTMLButtonElement>('.plus-button')!;
const taskModal = document.querySelector<HTMLDivElement>('.task')!;
const backdrop = document.querySelector<HTMLDivElement>('.task-backdrop')!;
const cancelBtn = document.querySelector<HTMLAnchorElement>('.cancel-btn')!;
const closeBtn = document.querySelector<HTMLAnchorElement>('.close-btn')!;

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
const form = taskModal.querySelector<HTMLFormElement>('form')!;
const titleInput = form.querySelector<HTMLInputElement>('#exampleFormControlInput1')!;
const descriptionInput = form.querySelector<HTMLTextAreaElement>('#exampleFormControlTextarea1')!;
const priorityBtn = form.querySelector<HTMLButtonElement>('.drop-btn')!;
const priorityOptions = form.querySelectorAll<HTMLAnchorElement>('.dropdown-item');

priorityOptions.forEach(option => {
  option.addEventListener('click', e => {
    e.preventDefault();
    priorityBtn.textContent = option.textContent?.trim() as Priority;
  });
});

form.addEventListener('submit', e => {
  e.preventDefault();

  const task: Task = {
    id: crypto.randomUUID(),
    title: titleInput.value,
    description: descriptionInput.value,
    priority: (priorityBtn.textContent?.trim() as Priority) || 'Medium',
    createdAt: Date.now(),
    status: 'todo'
  };

  service.addTask(task);
//   ui.render();
  form.reset();
  priorityBtn.textContent = 'Medium'; // Reset dropdown
  closeModal();
});
