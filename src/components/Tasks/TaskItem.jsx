import React from "react";
import { useNavigate } from "react-router-dom";

const TaskItem = ({ task }) => {
  const navigate = useNavigate();

  if (!task) {
    return <div>No Task Data Available</div>;
  }

  const handleTaskClick = () => {
    navigate(`edit-tasks/${task._id}`);
  };

  return (
    <div
      id="task"
      onClick={handleTaskClick}
      className="relative p-2 bg-emerald-300 rounded cursor-pointer hover:bg-emerald-400 transition-all ease-in-out"
    >
      <div
        id="status"
        className={`absolute top-2 right-2 p-0.5 px-2 text-sm rounded capitalize
          ${task.status && task.status.trim() === "pending" && "bg-yellow-500 text-white"}
          ${task.status && task.status.trim() === "in progress" && "bg-blue-500 text-white"}
          ${task.status && task.status.trim() === "completed" && "bg-green-500 text-white"}
          ${task.status && task.status.trim() === "archieved" && "bg-gray-500 text-white"}
        `}
      >
        {task.status}
      </div>
      <h2 className="font-bold text-xl">{task?.title || "No Title"}</h2>
      <p className="font-light ">
        {task.description}
      </p>
    </div>
  );
};

export default TaskItem;
