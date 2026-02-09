import { Task } from '../models/Task';
import { TaskService } from '../services/TaskService';

export class TaskUI {
  constructor(private service: TaskService) {}

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

  private createTaskCard(task: Task): HTMLElement {
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

    div.querySelector('.start-btn')?.addEventListener('click', () => {
      this.service.updateStatus(task.id, 'in-progress');
      // this.render();
    });

    div.querySelector('.complete-btn')?.addEventListener('click', () => {
      this.service.updateStatus(task.id, 'completed');
      // this.render();
    });

    return div;
  }
}
