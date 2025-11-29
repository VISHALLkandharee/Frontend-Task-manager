import React, { useContext } from "react";
import { TasksContext } from "../../context/TasksContext";
import { useNavigate } from "react-router-dom";

const TaskEditor = () => {
  const { createTask } = useContext(TasksContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const title = formData.get("title");
    const description = formData.get("description");
    const dueDate = formData.get("dueDate");
    await createTask(title, description, dueDate);
    navigate("/dashboard");
    e.target.reset(); // Reset the form after submission
  };

  return (
    <div className="h-screen w-screen sm:h-auto sm:max-w-lg sm:mx-auto sm:my-8 bg-blue-400/90 p-4 sm:p-6 rounded-xl shadow-lg text-white flex flex-col">
      <h1 className="font-bold capitalize mb-8 text-3xl tracking-wide text-center">
        Create Task
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <input
          type="text"
          name="title"
          placeholder="Title..."
          className="w-full p-3 rounded-lg bg-blue-300/70 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-blue-100 font-semibold transition"
          autoComplete="off"
        />
        <textarea
          name="description"
          placeholder="Description..."
          rows={5}
          className="w-full p-3 rounded-lg bg-blue-300/70 text-white placeholder-white resize-none focus:outline-none focus:ring-2 focus:ring-blue-100 font-semibold transition"
          required
        />
        <div className="flex flex-col">
          <label htmlFor="dueDate" className="mb-2 font-semibold text-white">
            Due Date
          </label>
          <input
            id="dueDate"
            type="date"
            name="dueDate"
            className="w-full p-3 rounded-lg bg-blue-300/70 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-blue-100 font-semibold transition"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-linear-to-r from-blue-600 via-blue-500 to-blue-400 hover:from-blue-700 hover:to-blue-500 text-white font-bold py-3 rounded-lg shadow-md transition duration-150"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default TaskEditor;
