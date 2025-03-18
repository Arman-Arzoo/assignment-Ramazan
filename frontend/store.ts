import { create } from 'zustand';

type Task = {
    id: string;
    title: string;
    completed: boolean;
};

type taskStore = {
    tasks: Task[];
    addTask: (title: string) => void;
    deleteTask: (id: string) => void;
    toggleTask: (id: string) => void;
};

const loadTaks = (): Task[] => {
    if (typeof window !== 'undefined') {
        const store = localStorage.getItem("tasks");

        return store ? JSON.parse(store) : [];
    }

    return [];
}

export const useTaskStore = create<taskStore>((set) => ({
    tasks: loadTaks(),
    addTask: (title) => {

        set((state) => {
            const newTask = { id: crypto.randomUUID(), title, completed: false };
            const updateTasks = [...state.tasks, newTask];

            localStorage.setItem('tasks', JSON.stringify(updateTasks));

            return { tasks: updateTasks };
        })

    },

    deleteTask: (id) => {
        set((state) => {
            const updateTasks = state.tasks.filter((task) => task.id !== id);

            localStorage.setItem('tasks', JSON.stringify(updateTasks));

            return { tasks: updateTasks };
        })
    },

    toggleTask: (id) => {

        set((state) => {

            const updateTasks = state.tasks.map((task) => task.id === id ? { ...task, completed: !task.completed } : task);

            localStorage.setItem('tasks', JSON.stringify(updateTasks));

            return { tasks: updateTasks };
        })
    }



}))