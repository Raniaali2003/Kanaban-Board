export class TaskUI {
    constructor(service) {
        this.service = service;
    }
    render() {
        this.renderColumn('todo');
        this.renderColumn('in-progress');
        this.renderColumn('completed');
    }
    renderColumn(status) {
        const column = document.querySelector(`[data-column="${status}"]`);
        if (!column)
            return;
        const tasksContainer = column.querySelector('.tasks-container');
        const emptyMsg = column.querySelector('.empty-msg');
        // Targeted the count span specifically within the card-title of the current column
        const countSpan = column.querySelector('.card-title .sub-title');
        if (!tasksContainer || !emptyMsg)
            return;
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
        }
        else {
            emptyMsg.style.setProperty('display', 'none', 'important');
        }
        // 4. Render Task Cards
        tasks.forEach((task, index) => {
            const card = this.createTaskCard(task, index + 1);
            tasksContainer.appendChild(card);
        });
    }
    createTaskCard(task, index) {
        var _a, _b, _c, _d;
        const card = document.createElement('div');
        card.className = 'card w-100 mb-3 rounded-4 border-0 custom-shadow py-1';
        const isTodo = task.status === 'todo';
        const isInProgress = task.status === 'in-progress';
        const priorityColors = {
            'High': 'text-bg-danger',
            'Medium': 'text-bg-warning',
            'Low': 'text-bg-success'
        };
        card.innerHTML = `
      <div class="card-body text-start">
        <div class="d-flex justify-content-between align-items-start">
          <span class="grey fw-bold">#${index < 10 ? '0' + index : index}</span>
          <div class="d-flex gap-2">
            <button class="btn btn-sm btn-outline-secondary edit-btn" title="Edit task">
              <i class="fa-solid fa-edit"></i>
            </button>
            <button class="btn btn-sm btn-outline-danger delete-btn" title="Delete task">
              <i class="fa-solid fa-trash"></i>
            </button>
          </div>
        </div>
        <h5 class="card-title fw-bold">${task.title}</h5>
        <p class="card-text grey">${task.description || 'No description provided'}</p>
        <div class="d-flex flex-column my-2">
          <span class="badge rounded-pill ${priorityColors[task.priority]} text-white badge-style w-fit-content" style="width: fit-content;">
            ${task.priority}
          </span>
          <div class="date mt-2 d-flex gap-4">
            <div class="month"><i class="fa-regular fa-calendar"></i>
              <span class="grey">${new Date(task.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
            </div>
            <div class="clock"><i class="fa-regular fa-clock me-2"></i><span class="grey">${this.getRelativeTime(task.createdAt)}</span></div>
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
        (_a = card.querySelector('.start-btn')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', () => {
            this.service.updateStatus(task.id, 'in-progress');
            this.render();
        });
        (_b = card.querySelector('.complete-btn')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', () => {
            this.service.updateStatus(task.id, 'completed');
            this.render();
        });
        (_c = card.querySelector('.edit-btn')) === null || _c === void 0 ? void 0 : _c.addEventListener('click', () => {
            this.openEditModal(task);
        });
        (_d = card.querySelector('.delete-btn')) === null || _d === void 0 ? void 0 : _d.addEventListener('click', () => {
            if (confirm('Are you sure you want to delete this task?')) {
                this.service.deleteTask(task.id);
                this.render();
            }
        });
        return card;
    }
    openEditModal(task) {
        // This will be implemented in the main app.ts
        // We'll dispatch a custom event that the main app can listen for
        const editEvent = new CustomEvent('openEditModal', { detail: { task } });
        document.dispatchEvent(editEvent);
    }
    getRelativeTime(timestamp) {
        const now = Date.now();
        const diff = now - timestamp;
        const seconds = Math.floor(diff / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);
        if (seconds < 60) {
            return 'just now';
        }
        else if (minutes === 1) {
            return '1 min ago';
        }
        else if (minutes < 60) {
            return `${minutes} mins ago`;
        }
        else if (hours === 1) {
            return '1 hour ago';
        }
        else if (hours < 24) {
            return `${hours} hours ago`;
        }
        else if (days === 1) {
            return '1 day ago';
        }
        else {
            return `${days} days ago`;
        }
    }
}
//# sourceMappingURL=TaskUI.js.map