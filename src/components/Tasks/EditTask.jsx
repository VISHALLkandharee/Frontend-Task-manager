import React, { useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { TasksContext } from "../../context/TasksContext";

const EditTask = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { tasks, updateTask, deleteTask } = useContext(TasksContext);

  const task = tasks.find((t) => t._id === id);
  const [title, setTitle] = useState(task?.title || "");
  const [description, setDescription] = useState(task?.description || "");
  const [status, setStatus] = useState(task?.status || "pending");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateTask({ id, title, description, status });
    navigate("/dashboard");
  };

  const handleDelete = async (e) => {
    e.stopPropagation();
    await deleteTask(id);
    navigate("/dashboard");
  };

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold mb-6">Edit Task</h2>

      <div id="container" className="max-w-2xl bg-white p-6 rounded shadow">
        <form id="editForm" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
              rows="5"
            ></textarea>
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 font-bold mb-2">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
            >
              <option value="pending">Pending</option>
              <option value="in progress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="archieved">Archieved</option>
            </select>
          </div>
        </form>

        <div id="bottons" className="flex p-2 justify-between items-center ">
          <button
            form="editForm"
            type="submit"
            className="bg-blue-600 text-white py-2 px-6 rounded font-bold hover:bg-blue-700"
          >
            Update Task
          </button>
          <button
            onClick={handleDelete}
            name="delete_button"
            className="bg-red-500 text-white py-2 px-6 rounded font-bold hover:bg-red-700"
          >
            Delete Task
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditTask;
