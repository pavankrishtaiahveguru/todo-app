import TaskItem from "./TaskItem";

const TaskList = ({ tasks, toggleTask, deleteTask, editTask }) => {
  if (tasks.length === 0) {
    return (
      <p className="text-center text-gray-500">
        No tasks found
      </p>
    );
  }

  return (
    <div className="space-y-3 max-h-64 overflow-y-auto">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          toggleTask={toggleTask}
          deleteTask={deleteTask}
          editTask={editTask}
        />
      ))}
    </div>
  );
};

export default TaskList;