import { createContext, useContext, useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import { BASE_URL } from "../api/client";

import { toast } from "react-toastify";

export const TasksContext = createContext(null);

export const TasksProvider = ({ children }) => {
  const { token } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);

  // fetchTasks
  const fetchTasks = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/tasks`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      // console.log(data);
      setTasks(data?.tasks || []);
    } catch (error) {
      toast.error("Failed to fetch tasks");
      console.log("Failed Fetching tasks", error);
    }
  };

  const createTask = async (title, description, dueDate) => {
    try {
      const response = await fetch(`${BASE_URL}/api/tasks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, description, dueDate }),
      });

      const data = await response.json();
      setTasks((prev) => [...prev, data?.task]);
      toast.success(data?.message || "Task created successfully");
    } catch (error) {
      toast.error("Failed to create task");
      console.log("Failed creating tasks", error);
    }
  };

  const updateTask = async ({ id, title, description, status }) => {
    try {
      const response = await fetch(`${BASE_URL}/api/tasks/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, description, status }),
      });

      const data = await response.json();
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task._id === id ? data.task : task))
      );

      toast.success(data?.message || "Task updated successfully");
    } catch (error) {
      toast.error("Failed to update task");
      console.log("Failed Updating tasks", error);
    }
  };

  const deleteTask = async (id) => {
    try {
      const response = await fetch(`${BASE_URL}/api/tasks/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== id));
      toast.success(data?.message || "Task deleted successfully");
    } catch (error) {
      console.log("Failed Deleting tasks", error);
    }
  };

  useEffect(() => {
    if (token) {
      fetchTasks();
    }
  }, [token]);

  return (
    <TasksContext.Provider
      value={{
        tasks,
        setTasks,
        fetchTasks,
        createTask,
        updateTask,
        deleteTask,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
};
