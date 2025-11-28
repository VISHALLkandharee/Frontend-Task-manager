import React, { useContext } from "react";
import { TasksContext } from "../../context/TasksContext";
import { NavLink, useNavigate } from "react-router-dom";

const ManageTasks = () => {
  const navigate = useNavigate();
  const { tasks } = useContext(TasksContext);

  const pandingTasks = tasks.filter(
    (task) => task.status === "pending".trim()
  ).length;
  const inProgressTasks = tasks.filter(
    (task) => task.status === "in_progress".trim()
  ).length;
  const completedTasks = tasks.filter(
    (task) => task.status === "completed".trim()
  ).length;
    const archievedTasks = tasks.filter(
    (task) => task.status === "archieved".trim()
  ).length;



  const handleTaskClick = (id) => {
    navigate(`/dashboard/edit-tasks/${id}`);
  }

  return (
    <div className="h-screen w-full bg-indigo-200 p-4 overflow-y-auto">
      <h1 className="text-2xl mb-4">Manage Your Tasks</h1>

      {/* Overview Section */}
      <div id="tasks-overview" className="mb-4">
        <div
          id="tasks-form"
          className="flex justify-between items-center px-4 py-2 bg-amber-300 rounded"
        >
          <div id="total-tasks" className="capitalize text-xl font-bold">
            Tasks: {tasks.length}
          </div>
          <div
            id="create-tasks-form"
            className="py-2 px-4 capitalize font-semibold rounded hover:bg-blue-500 bg-blue-400 cursor-pointer"
          >
            <NavLink to={"/dashboard/create-task"}>Create Task</NavLink>
          </div>
        </div>

        {/* Task Status */}
        <div
          id="task-status"
          className="hidden md:flex justify-evenly items-center p-2 gap-x-6 bg-white/50 rounded mt-2"
        >
          <p>Pending: {pandingTasks}</p>
          <p>In Progress: {inProgressTasks}</p>
          <p>Completed: {completedTasks}</p>
          <p>Archive: {archievedTasks}</p>
        </div>
      </div>

      {/* Task List */}
      <ul
        id="tasks-list"
        className="grid gap-3  grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
      >
        {tasks.length === 0 && <p>No tasks available.</p>}
        {tasks.map((task) => (
          <li
            onClick={() => handleTaskClick(task._id)}
            id="task"
            key={task._id}
            className=" relative flex flex-col p-2 rounded shadow-md bg-cyan-50 opacity-85 cursor-pointer  transition-all ease-in-out hover:translate-y-1.5 hover:opacity-100 hover:shadow-lg"
          >
            <div
              id="status"
              className="absolute  top-2 right-2 bg-red-200 py-1 px-3 rounded cursor-pointer  capitalize"
            >
              {task?.status}
            </div>
            <h3 className="font-semibold pb-2">{task?.title}</h3>
            <p id="description" className="py-2 px-1">
              {task?.description}
            </p>
            <span className=" mt-auto p-1 text-sm text-gray-500 font-light">{new Date(task?.dueDate).toLocaleDateString()}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageTasks;
