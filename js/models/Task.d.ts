export type Priority = 'Low' | 'Medium' | 'High';
export type TaskStatus = 'todo' | 'in-progress' | 'completed';
export interface Task {
    id: string;
    title: string;
    description: string;
    priority: Priority;
    dueDate?: string;
    createdAt: number;
    status: TaskStatus;
}
//# sourceMappingURL=Task.d.ts.map