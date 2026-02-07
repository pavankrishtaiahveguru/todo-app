import React, { useEffect, useState } from "react";
import TodoInput from "../components/TodoInput";
import TaskList from "../components/TaskList";
import FilterBar from "../components/FilterBar";

const TodoPage = () => {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  const [editId, setEditId] = useState(null);

  // Load tasks
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(stored);
  }, []);

  // Save tasks
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Add or edit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!task.trim()) return;

    if (editId) {
      setTasks(
        tasks.map((t) =>
          t.id === editId ? { ...t, text: task } : t
        )
      );
      setEditId(null);
    } else {
      setTasks([
        ...tasks,
        { id: Date.now(), text: task, completed: false },
      ]);
    }
    setTask("");
  };

  // Toggle
  const toggleTask = (id) => {
    setTasks(
      tasks.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );
  };

  // Delete
  const deleteTask = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  // Edit
  const editTask = (t) => {
    setTask(t.text);
    setEditId(t.id);
  };

  // Clear completed
  const clearCompleted = () => {
    setTasks(tasks.filter((t) => !t.completed));
  };

  // Filter logic
  const filteredTasks = tasks.filter((t) => {
    if (filter === "active") return !t.completed;
    if (filter === "completed") return t.completed;
    return true;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 to-purple-700 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-6">
        <h1 className="text-3xl font-bold text-center mb-6">
          To-Do Application
        </h1>

        <TodoInput
          task={task}
          setTask={setTask}
          handleSubmit={handleSubmit}
          editId={editId}
        />

        <FilterBar filter={filter} setFilter={setFilter} />

        <TaskList
          tasks={filteredTasks}
          toggleTask={toggleTask}
          deleteTask={deleteTask}
          editTask={editTask}
        />

        <div className="flex justify-between mt-5 text-sm text-gray-600">
          <span>
            {tasks.filter((t) => !t.completed).length} tasks left
          </span>

          <button
            onClick={clearCompleted}
            className="text-red-500 hover:underline cursor-pointer"
          >
            Clear completed
          </button>
        </div>
      </div>
    </div>
  );
};

export default TodoPage;