import apiClient from './client';

export interface Task {
    id: string;
    title: string;
    description?: string;
    completed: boolean;
    created_at: string;
    updated_at: string;
    user_id: string;
}

export interface CreateTaskRequest {
    title: string;
    description?: string;
}

export interface UpdateTaskRequest {
    title?: string;
    description?: string;
    completed?: boolean;
}

export interface TaskListResponse {
    items: Task[];
    total: number;
    page: number;
    page_size: number;
    total_pages: number;
}

// Task API methods
export const taskApi = {
    // Get all tasks
    getTasks: async (): Promise<TaskListResponse> => {
        const response = await apiClient.get('/tasks');
        return response.data;
    },

    // Get a single task by ID
    getTask: async (id: string): Promise<Task> => {
        const response = await apiClient.get(`/tasks/${id}`);
        return response.data;
    },

    // Create a new task
    createTask: async (data: CreateTaskRequest): Promise<Task> => {
        const response = await apiClient.post('/tasks', data);
        return response.data;
    },

    // Update a task
    updateTask: async (id: string, data: UpdateTaskRequest): Promise<Task> => {
        const response = await apiClient.put(`/tasks/${id}`, data);
        return response.data;
    },

    // Delete a task
    deleteTask: async (id: string): Promise<void> => {
        await apiClient.delete(`/tasks/${id}`);
    },

    // Toggle task completion
    toggleTask: async (id: string): Promise<Task> => {
        const response = await apiClient.put(`/tasks/${id}/toggle`);
        return response.data;
    },
};

// Re-export individual methods for convenience
export const getTask = taskApi.getTask;
export const getTasks = taskApi.getTasks;
export const createTask = taskApi.createTask;
export const updateTask = taskApi.updateTask;
export const deleteTask = taskApi.deleteTask;
export const toggleTask = taskApi.toggleTask;
