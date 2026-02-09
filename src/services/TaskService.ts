import { Task, TaskStatus } from '../models/Task';

const STORAGE_KEY = 'kanban_tasks';

export class TaskService {
  private tasks: Task[] = [];

  constructor() {
    this.load();
  }

  private save() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.tasks));
  }

  private load() {
    const data = localStorage.getItem(STORAGE_KEY);
    this.tasks = data ? JSON.parse(data) : [];
  }

  getTasksByStatus(status: TaskStatus): Task[] {
    return this.tasks.filter(task => task.status === status);
  }

  addTask(task: Task) {
    this.tasks.push(task);
    this.save();
  }

  updateStatus(id: string, status: TaskStatus) {
    const task = this.tasks.find(t => t.id === id);
    if (task) {
      task.status = status;
      this.save();
    }
  }
}
