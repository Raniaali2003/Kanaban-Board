const STORAGE_KEY = 'kanban_tasks';
export class TaskService {
    constructor() {
        this.tasks = [];
        this.load();
    }
    save() {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.tasks));
    }
    load() {
        const data = localStorage.getItem(STORAGE_KEY);
        this.tasks = data ? JSON.parse(data) : [];
    }
    getTasksByStatus(status) {
        this.load(); // ensure latest tasks from localStorage
        return this.tasks.filter(task => task.status === status);
    }
    addTask(task) {
        this.tasks.push(task);
        this.save();
    }
    updateStatus(id, status) {
        const task = this.tasks.find(t => t.id === id);
        if (task) {
            task.status = status;
            this.save();
        }
    }
}
//# sourceMappingURL=TaskService.js.map