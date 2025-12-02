import React, { useContext } from "react";
import { TasksContext } from "../../context/TasksContext";
import TaskItem from "./TaskItem";

const TaskList = () => {
  const { tasks } = useContext(TasksContext);

  if (!tasks || tasks.length === 0) {
    return <div className="p-4 text-xl font-light capitalize text-gray-400">Tasks...</div>;
  }


  return (
    <div id="tasks-lists" className="flex flex-col gap-3 p-1 sm:p-2 overflow-y-visible">
      <h2 className="mt-2 capitalize text-xl">Tasks</h2>
      {tasks && tasks.map((task) => <TaskItem key={task._id} task={task} />)}
    </div>
  );
};

export default TaskList;
