import { TaskService } from './services/TaskService.js';
import { TaskUI } from './ui/TaskUI.js';
import type { Task, Priority } from './models/Task.js';

// Initialize Service and UI
const service = new TaskService();
const ui = new TaskUI(service);

// Initial Render
document.addEventListener('DOMContentLoaded', () => {
    ui.render();
});

// ------------------- Modal Logic -------------------
const addBtn = document.querySelector<HTMLButtonElement>('.plus-button')!;
const taskModal = document.querySelector<HTMLDivElement>('.task')!;
const backdrop = document.querySelector<HTMLDivElement>('.task-backdrop')!;
const cancelBtn = document.querySelector<HTMLAnchorElement>('.cancel-btn')!;
const closeBtn = document.querySelector<HTMLAnchorElement>('.close-btn')!;
const resetBtn = document.querySelector<HTMLButtonElement>('.reset-button')!;

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

// ------------------- Form Submission -------------------
const form = taskModal.querySelector<HTMLFormElement>('form')!;
const titleInput = form.querySelector<HTMLInputElement>('#taskTitle')!;
const descriptionInput = form.querySelector<HTMLTextAreaElement>('#taskDescription')!;
const priorityBtn = form.querySelector<HTMLButtonElement>('.drop-btn')!;
const priorityOptions = form.querySelectorAll<HTMLAnchorElement>('.dropdown-item');

// Track priority in a variable to avoid string matching issues with HTML icons/spacing
let selectedPriority: Priority = 'Medium';

priorityOptions.forEach(option => {
    option.addEventListener('click', (e) => {
        e.preventDefault();
        // Get the clean text (e.g., "High", "Medium", "Low")
        const val = option.textContent?.trim() as Priority;
        selectedPriority = val;
        
        // Update the button UI (preserving your dropdown icon if needed)
        priorityBtn.innerHTML = `${val} <i class="fa-solid fa-chevron-down ms-2"></i>`;
    });
});

form.addEventListener('submit', (e) => {
    e.preventDefault();

    // 1. Validate Input
    const title = titleInput.value.trim();
    if (!title) {
        alert("Please enter a task title.");
        return;
    }

    // 2. Construct the Task
    const task: Task = {
        id: crypto.randomUUID(),
        title: title,
        description: descriptionInput.value.trim(),
        priority: selectedPriority,
        createdAt: Date.now(),
        status: 'todo'
    };

    // 3. Update Data and UI
    service.addTask(task);
    
    // Crucial: Call render to update the DOM with the new service state
    ui.render();

    // 4. Reset Form and Close Modal
    form.reset();
    selectedPriority = 'Medium';
    priorityBtn.innerHTML = `Medium <i class="fa-solid fa-chevron-down ms-2"></i>`;
    closeModal();
});


// ------------------- Reset Logic -------------------

resetBtn.addEventListener('click', (e) => {
  e.preventDefault();

  const confirmed = confirm('This will delete all tasks. Continue?');
  if (!confirmed) return;

  service.clearTasks();
  ui.render();
});
