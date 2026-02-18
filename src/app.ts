import { TaskService } from './services/TaskService.js';
import { TaskUI } from './ui/TaskUI.js';
import type { Task, Priority } from './models/Task.js';

// Initialize Service and UI
const service = new TaskService();
const ui = new TaskUI(service);

// Track if we're editing or adding a task
let editingTaskId: string | null = null;

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
const modalTitle = taskModal.querySelector('.card-header span')!;
const resetBtn = document.querySelector<HTMLButtonElement>('.reset-button')!;

function openModal() {
    editingTaskId = null;
    modalTitle.textContent = 'Create New Task';
    taskModal.classList.remove('d-none');
    backdrop.classList.remove('d-none');
}

function openEditModal(task: Task) {
    editingTaskId = task.id;
    modalTitle.textContent = 'Edit Task';
    
    // Populate form with task data
    titleInput.value = task.title;
    descriptionInput.value = task.description || '';
    selectedPriority = task.priority;
    priorityBtn.innerHTML = `${task.priority} <i class="fa-solid fa-chevron-down ms-2"></i>`;
    
    taskModal.classList.remove('d-none');
    backdrop.classList.remove('d-none');
}

function closeModal() {
    taskModal.classList.add('d-none');
    backdrop.classList.add('d-none');
    resetForm();
}

function resetForm() {
    const form = taskModal.querySelector<HTMLFormElement>('form')!;
    form.reset();
    editingTaskId = null;
    selectedPriority = 'Medium';
    priorityBtn.innerHTML = `Medium <i class="fa-solid fa-chevron-down ms-2"></i>`;
    modalTitle.textContent = 'Create New Task';
}

addBtn.addEventListener('click', openModal);
cancelBtn.addEventListener('click', closeModal);
closeBtn.addEventListener('click', closeModal);
backdrop.addEventListener('click', closeModal);

// Listen for edit events from TaskUI
document.addEventListener('openEditModal', (e: any) => {
    openEditModal(e.detail.task);
});

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

    // 2. Handle Edit vs Add
    if (editingTaskId) {
        // Update existing task
        service.updateTask(editingTaskId, {
            title: title,
            description: descriptionInput.value.trim(),
            priority: selectedPriority
        });
    } else {
        // Create new task
        const task: Task = {
            id: crypto.randomUUID(),
            title: title,
            description: descriptionInput.value.trim(),
            priority: selectedPriority,
            createdAt: Date.now(),
            status: 'todo'
        };
        service.addTask(task);
    }

    // 3. Update UI
    ui.render();

    // 4. Reset Form and Close Modal
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
