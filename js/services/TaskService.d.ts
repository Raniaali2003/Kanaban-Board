import { Task, TaskStatus } from '../models/Task.js';
export declare class TaskService {
    private tasks;
    constructor();
    private save;
    private load;
    getTasksByStatus(status: TaskStatus): Task[];
    addTask(task: Task): void;
    updateStatus(id: string, status: TaskStatus): void;
    deleteTask(id: string): void;
    updateTask(id: string, updates: Partial<Omit<Task, 'id' | 'createdAt'>>): void;
    clearTasks(): void;
}
//# sourceMappingURL=TaskService.d.ts.map