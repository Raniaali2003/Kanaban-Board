import { Task, TaskStatus, Priority } from '../models/Task.js';
import { TaskService } from '../services/TaskService.js';

export class TaskUI {
  constructor(private service: TaskService) {}

  public render() {
    this.renderColumn('todo');
    this.renderColumn('in-progress');
    this.renderColumn('completed');
  }

  private renderColumn(status: TaskStatus) {
    const column = document.querySelector<HTMLDivElement>(`[data-column="${status}"]`);
    if (!column) return;

    const tasksContainer = column.querySelector<HTMLDivElement>('.tasks-container');
    const emptyMsg = column.querySelector<HTMLDivElement>('.empty-msg');
    // Targeted the count span specifically within the card-title of the current column
    const countSpan = column.querySelector<HTMLSpanElement>('.card-title .sub-title');
    
    if (!tasksContainer || !emptyMsg) return;

    // 1. Clear previous content
    tasksContainer.innerHTML = '';
    const tasks = this.service.getTasksByStatus(status);

    // 2. Update the Header Count
    if (countSpan) {
      countSpan.textContent = `${tasks.length} task${tasks.length === 1 ? '' : 's'}`;
    }

    // 3. Toggle Empty Message visibility
    // Using display style to override any CSS, ensuring it hides when tasks > 0
    if (tasks.length === 0) {
      emptyMsg.style.setProperty('display', 'flex', 'important');
    } else {
      emptyMsg.style.setProperty('display', 'none', 'important');
    }

    // 4. Render Task Cards
    tasks.forEach(task => {
      const card = this.createTaskCard(task);
      tasksContainer.appendChild(card);
    });
  }

  private createTaskCard(task: Task): HTMLElement {
    const card = document.createElement('div');
    card.className = 'card w-100 mb-3 rounded-4 border-0 custom-shadow py-1';

    const isTodo = task.status === 'todo';
    const isInProgress = task.status === 'in-progress';
    
    const priorityColors: Record<Priority, string> = {
      'High': 'text-bg-danger',
      'Medium': 'text-bg-warning',
      'Low': 'text-bg-success'
    };

    card.innerHTML = `
      <div class="card-body text-start">
        <span class="grey fw-bold">#${task.id.slice(0, 4)}</span>
        <h5 class="card-title fw-bold">${task.title}</h5>
        <p class="card-text grey">${task.description || 'No description provided'}</p>
        <div class="d-flex flex-column my-2">
          <span class="badge rounded-pill ${priorityColors[task.priority]} text-white badge-style w-40" style="width: 90px;">
            ${task.priority}
          </span>
          <div class="date mt-2 d-flex gap-4">
            <div class="month"><i class="fa-regular fa-calendar"></i>
              <span class="grey">${new Date(task.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
            </div>
            <div class="clock"><i class="fa-regular fa-clock"></i><span class="grey">Just now</span></div>
          </div>
          <hr class="grey">
          <div class="buttons my-1">
            ${isTodo ? `<button class="btn bottom orange rounded-3 me-1 larger-2 start-btn"><i class="fa-solid fa-play"></i> Start</button>` : ''}
            ${isTodo || isInProgress ? `<button class="btn bottom green rounded-3 larger-2 complete-btn"><i class="fa-solid fa-check"></i> Complete</button>` : ''}
            ${task.status === 'completed' ? `<span class="text-success fw-bold small"><i class="fa-solid fa-check-double"></i> Finished</span>` : ''}
          </div>
        </div>
      </div>
    `;

    card.querySelector('.start-btn')?.addEventListener('click', () => {
      this.service.updateStatus(task.id, 'in-progress');
      this.render();
    });

    card.querySelector('.complete-btn')?.addEventListener('click', () => {
      this.service.updateStatus(task.id, 'completed');
      this.render();
    });

    return card;
  }
}