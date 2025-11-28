import React, { useContext } from "react";
import Sidebar from "../Layout/Sidebar";
import Header from "../Layout/Header";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import TaskList from "../Tasks/TaskList";
import { TasksContext } from "../../context/TasksContext";

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const { tasks } = useContext(TasksContext);
  
  
  if (!user) {
    return <div>Loading user data...</div>;
  }

  const safeTasks = Array.isArray(tasks) ? tasks : [];

  const pendingTasks = safeTasks.filter(t => t.status && t.status.trim() === "pending").length;
  const inProgressTasks = safeTasks.filter(t => t.status && t.status.trim() === "in progress").length;
  const completedTasks = safeTasks.filter(t => t.status && t.status.trim() === "completed").length;
  const archivedTasks = safeTasks.filter(
    t => t.status && (t.status.trim() === "archieve" || t.status.trim() === "archieved")
  ).length;

  return (
    <div className="flex flex-col m-0 p-0 h-screen w-full overflow-hidden">
      <Header />
      <div className="flex flex-1 min-h-0 w-full flex-col md:flex-row">
        <Sidebar />
        <div id="user-dashboard" className="flex-1 min-h-0 p-2 border-2 flex flex-col overflow-hidden">
          <div id="welcome-user" className="p-2 bg-gray-200 capitalize flex flex-col gap-2 rounded-md shrink-0">
            <h1 className="capitalize text-2xl pl-2 font-bold">Welcome! {user.username}</h1>
            <p className="pl-2">{new Date().toDateString()}</p>
            <div id="task-status" className="mt-auto flex justify-around flex-col md:flex-row flex-wrap gap-y-2 items-center gap-x-6 rounded p-2 text-white">
              <p className="hover:text-gray-500 cursor-pointer hover:underline bg-yellow-500 px-4 rounded">Pending: {pendingTasks}</p>
              <p className="hover:text-gray-400 cursor-pointer hover:underline bg-blue-500 px-4 rounded">In Progress: {inProgressTasks}</p>
              <p className="hover:text-gray-500 cursor-pointer hover:underline bg-green-500 px-4 rounded">Completed: {completedTasks}</p>
              <p className="hover:text-gray-400 cursor-pointer hover:underline bg-gray-500 px-4 rounded">Archived: {archivedTasks}</p>
            </div>
          </div>

          {/* Tasks Overview */}
          <div id="tasks-overview" className="mt-4 p-2 bg-green-300 flex justify-between shrink-0">
            <div id="total-tasks" className="p-2 capitalize text-xl font-bold">
              Tasks: {safeTasks.length}
            </div>
            <div id="create-tasks-form" className="py-2 px-4 capitalize font-semi-bold hover:bg-blue-400 flex justify-center items-center rounded bg-blue-300">
              <NavLink to="/dashboard/create-task">Create Task</NavLink>
            </div>
          </div>

          {/* Task List - Only this scrolls */}
          <div className="flex-1 min-h-0 overflow-y-auto">
            <TaskList />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;