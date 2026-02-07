import { useState, useEffect, useCallback } from 'react';
import { taskApi, Task, CreateTaskRequest, UpdateTaskRequest, TaskListResponse } from '@/lib/api/tasks';

export function useTasks() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [pagination, setPagination] = useState({
        currentPage: 1,
        totalPages: 1,
        totalItems: 0,
        canGoBack: false,
        canGoForward: false,
    });

    // Fetch all tasks
    const fetchTasks = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const response: TaskListResponse = await taskApi.getTasks();
            // Backend returns paginated response
            setTasks(response.items || []);
            setPagination({
                currentPage: response.page || 1,
                totalPages: response.total_pages || 1,
                totalItems: response.total || 0,
                canGoBack: (response.page || 1) > 1,
                canGoForward: (response.page || 1) < (response.total_pages || 1),
            });
        } catch (err: any) {
            setError(err.response?.data?.message || err.message || 'Failed to fetch tasks');
            // Set empty state on error
            setTasks([]);
            setPagination({
                currentPage: 1,
                totalPages: 1,
                totalItems: 0,
                canGoBack: false,
                canGoForward: false,
            });
        } finally {
            setLoading(false);
        }
    }, []);

    // Auto-fetch tasks on mount
    useEffect(() => {
        fetchTasks();
    }, [fetchTasks]);

    // Create a new task
    const createTask = useCallback(async (data: CreateTaskRequest): Promise<Task> => {
        try {
            setError(null);
            const newTask = await taskApi.createTask(data);
            setTasks(prev => [newTask, ...prev]);
            return newTask;
        } catch (err: any) {
            const errorMessage = err.response?.data?.message || err.message || 'Failed to create task';
            setError(errorMessage);
            throw new Error(errorMessage);
        }
    }, []);

    // Update a task
    const updateTask = useCallback(async (id: string, data: UpdateTaskRequest): Promise<Task> => {
        try {
            setError(null);
            const updatedTask = await taskApi.updateTask(id, data);
            setTasks(prev => prev.map(task => task.id === id ? updatedTask : task));
            return updatedTask;
        } catch (err: any) {
            const errorMessage = err.response?.data?.message || err.message || 'Failed to update task';
            setError(errorMessage);
            throw new Error(errorMessage);
        }
    }, []);

    // Delete a task
    const deleteTask = useCallback(async (id: string): Promise<void> => {
        try {
            setError(null);
            await taskApi.deleteTask(id);
            setTasks(prev => prev.filter(task => task.id !== id));
        } catch (err: any) {
            const errorMessage = err.response?.data?.message || err.message || 'Failed to delete task';
            setError(errorMessage);
            throw new Error(errorMessage);
        }
    }, []);

    // Toggle task completion
    const toggleTask = useCallback(async (id: string): Promise<Task> => {
        try {
            setError(null);
            const updatedTask = await taskApi.toggleTask(id);
            setTasks(prev => prev.map(task => task.id === id ? updatedTask : task));
            return updatedTask;
        } catch (err: any) {
            const errorMessage = err.response?.data?.message || err.message || 'Failed to toggle task';
            setError(errorMessage);
            throw new Error(errorMessage);
        }
    }, []);

    // Toggle completion (alias for page compatibility)
    const toggleComplete = useCallback(async (id: string) => {
        await toggleTask(id);
    }, [toggleTask]);

    // Go to specific page (placeholder - real pagination later)
    const goToPage = useCallback((page: number) => {
        console.log('Pagination not yet fully implemented. Requested page:', page);
    }, []);

    // Get a specific task by ID
    const getTask = useCallback((id: string): Task | undefined => {
        return tasks.find(task => task.id === id);
    }, [tasks]);

    return {
        tasks,
        loading,
        error,
        pagination,
        fetchTasks,
        createTask,
        updateTask,
        deleteTask,
        toggleTask,
        toggleComplete,
        goToPage,
        getTask,
    };
}
