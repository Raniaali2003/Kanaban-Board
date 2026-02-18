import { Task, TaskStatus } from '../models/Task.js';

const STORAGE_KEY = 'kanban_tasks';

export class TaskService {
  private tasks: Task[] = [];

  constructor() {
    this.load();
  }

  private save() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.tasks));
      console.log('Tasks saved to localStorage:', this.tasks);
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  }

  private load() {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      console.log('Loading from localStorage:', data);
      this.tasks = data ? JSON.parse(data) : [];
      console.log('Loaded tasks:', this.tasks);
    } catch (error) {
      console.error('Error loading from localStorage:', error);
      this.tasks = [];
    }
  }

  getTasksByStatus(status: TaskStatus): Task[] {
    this.load(); // ensure latest tasks from localStorage
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

  deleteTask(id: string) {
    this.tasks = this.tasks.filter(t => t.id !== id);
    this.save();
  }

  updateTask(id: string, updates: Partial<Omit<Task, 'id' | 'createdAt'>>) {
    const task = this.tasks.find(t => t.id === id);
    if (task) {
      Object.assign(task, updates);
      this.save();
    }
  }

  clearTasks() {
  this.tasks = [];
  localStorage.removeItem('kanban_tasks');
}

}
