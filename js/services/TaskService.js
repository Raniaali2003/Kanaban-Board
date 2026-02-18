const STORAGE_KEY = 'kanban_tasks';
export class TaskService {
    constructor() {
        this.tasks = [];
        this.load();
    }
    save() {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(this.tasks));
            console.log('Tasks saved to localStorage:', this.tasks);
        }
        catch (error) {
            console.error('Error saving to localStorage:', error);
        }
    }
    load() {
        try {
            const data = localStorage.getItem(STORAGE_KEY);
            console.log('Loading from localStorage:', data);
            this.tasks = data ? JSON.parse(data) : [];
            console.log('Loaded tasks:', this.tasks);
        }
        catch (error) {
            console.error('Error loading from localStorage:', error);
            this.tasks = [];
        }
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
    deleteTask(id) {
        this.tasks = this.tasks.filter(t => t.id !== id);
        this.save();
    }
    updateTask(id, updates) {
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
//# sourceMappingURL=TaskService.js.map