export class TaskUI {
    constructor(service) {
        this.service = service;
    }
    // render() {
    //   this.renderColumn('todo');
    //   this.renderColumn('in-progress');
    //   this.renderColumn('completed');
    // }
    // private renderColumn(status: 'todo' | 'in-progress' | 'completed') {
    //   const container = document.querySelector(`[data-column="${status}"]`)!;
    //   container.innerHTML = '';
    //   const tasks = this.service.getTasksByStatus(status);
    //   tasks.forEach(task => {
    //     const card = this.createTaskCard(task);
    //     container.appendChild(card);
    //   });
    // }
    createTaskCard(task) {
        var _a, _b;
        const div = document.createElement('div');
        div.className = 'card w-100 mb-3 rounded-4';
        div.innerHTML = `
      <div class="card-body">
        <h5>${task.title}</h5>
        <p>${task.description}</p>
        <button class="start-btn">Start</button>
        <button class="complete-btn">Complete</button>
      </div>
    `;
        (_a = div.querySelector('.start-btn')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', () => {
            this.service.updateStatus(task.id, 'in-progress');
            // this.render();
        });
        (_b = div.querySelector('.complete-btn')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', () => {
            this.service.updateStatus(task.id, 'completed');
            // this.render();
        });
        return div;
    }
}
//# sourceMappingURL=TaskUI.js.map