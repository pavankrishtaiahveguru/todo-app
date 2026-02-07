const TaskItem = ({ task, toggleTask, deleteTask, editTask }) => {
  return (
    <div className="flex items-center justify-between bg-gray-100 px-4 py-2 rounded-lg">
      
      {/* Left side: checkbox + text */}
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => toggleTask(task.id)}
          className="w-4 h-4 cursor-pointer"
        />

        <span
          className={`${
            task.completed
              ? "line-through text-gray-400"
              : "text-gray-800"
          }`}
        >
          {task.text}
        </span>
      </div>

      {/* Right side: actions */}
      <div className="flex gap-3 text-sm">
        <button
          onClick={() => editTask(task)}
          className="text-blue-500 hover:underline cursor-pointer"
        >
          Edit
        </button>
        <button
          onClick={() => deleteTask(task.id)}
          className="text-red-500 hover:underline cursor-pointer"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskItem;