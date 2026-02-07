import React, { useEffect, useState } from "react";

const Todo = () => {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  const [editId, setEditId] = useState(null);

  // Load from localStorage
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(stored);
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Add or update task
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

  // Toggle complete
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

  // Filter logic
  const filteredTasks = tasks.filter((t) => {
    if (filter === "active") return !t.completed;
    if (filter === "completed") return t.completed;
    return true;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl shadow-2xl p-6 text-white">
        
        {/* Header */}
        <h1 className="text-3xl font-bold text-center mb-6">
          My Tasks
        </h1>

        {/* Input */}
        <form onSubmit={handleSubmit} className="flex gap-2 mb-5">
          <input
            type="text"
            placeholder="What needs to be done?"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            className="flex-1 px-4 py-2 rounded-lg bg-white/20 placeholder-white/70 outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <button
            className="px-4 py-2 bg-indigo-500 rounded-lg hover:bg-indigo-600 transition"
          >
            {editId ? "Update" : "Add"}
          </button>
        </form>

        {/* Filters */}
        <div className="flex justify-center gap-3 mb-4 text-sm">
          {["all", "active", "completed"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1 rounded-full capitalize transition ${
                filter === f
                  ? "bg-indigo-500"
                  : "bg-white/20 hover:bg-white/30"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Task List */}
        <div className="space-y-3 max-h-72 overflow-y-auto">
          {filteredTasks.length === 0 ? (
            <p className="text-center text-white/70">
              No tasks found
            </p>
          ) : (
            filteredTasks.map((t) => (
              <div
                key={t.id}
                className="flex items-center justify-between bg-white/10 px-4 py-2 rounded-lg hover:bg-white/20 transition"
              >
                <span
                  onClick={() => toggleTask(t.id)}
                  className={`cursor-pointer ${
                    t.completed
                      ? "line-through text-white/50"
                      : ""
                  }`}
                >
                  {t.text}
                </span>

                <div className="flex gap-3 text-sm">
                  <button
                    onClick={() => editTask(t)}
                    className="text-blue-300 hover:text-blue-400"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteTask(t.id)}
                    className="text-red-300 hover:text-red-400"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-between mt-5 text-sm text-white/70">
          <span>
            {tasks.filter((t) => !t.completed).length} tasks left
          </span>
          <button
            onClick={() =>
              setTasks(tasks.filter((t) => !t.completed))
            }
            className="hover:underline text-red-300"
          >
            Clear completed
          </button>
        </div>
      </div>
    </div>
  );
};

export default Todo;