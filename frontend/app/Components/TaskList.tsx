"use client"

import { useTaskStore } from "@/store";
import { useState } from "react";

export default function TaskList() {
    const { tasks, addTask, deleteTask, toggleTask } = useTaskStore();

    const [newTask, setNewTask] = useState("");

    const handleSubmit = () => {
        if (newTask.trim()) {
            addTask(newTask);
            setNewTask("");
        }
    };


    return (
        <div className="max-w-md mx-auto p-3 bg-white shadow-lg rounded-lg">
            <h1 className="text-xl font-bold mb-3">Task Manager</h1>

            {/* Add task */}
            <div className="flex mb-4">
                <input
                    type="text"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    className="flex-1 px-3 py-2 border rounded-l"
                    placeholder="Add a task..."
                />

                <button
                    className="px-4 py-2 cursor-pointer bg-green-500 text-white rounded-r hover:bg-green-600"
                    onClick={handleSubmit}
                >
                    Add
                </button>
            </div>

            <hr className="mb-3" />

            {/* List of tasks */}
            <ul className="space-y-2">
                {tasks.map((task) => (
                    <li key={task.id} className="flex items-center justify-between space-x-3">
                        <div className="flex items-center gap-2">
                        <input type="checkbox" checked={task.completed}
                            onChange={() => toggleTask(task.id)}
                            className="w-5 h-5 cursor-pointer"
                        />
                        <span className={task.completed ? 'line-through text-gray-500' : ''}>
                            {task.title}
                        </span>
                        </div>

                        {/* Delete Button */}
                        <button
                            className="cursor-pointer px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                            onClick={() => deleteTask(task.id)}
                        >
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )
}
