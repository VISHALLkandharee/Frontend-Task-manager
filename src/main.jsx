import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignUp from "./components/Auth/SignUp.jsx";
import Login from "./components/Auth/Login.jsx";
import NotFound from "./components/pages/NotFound.jsx";

// private route
import PrivateRoute from "./utils/PrivateRoute.jsx";
import DashBoard from "./components/pages/Dashboard.jsx";
import Profile from "./components/pages/Profile.jsx";
import ManageTasks from "./components/pages/ManageTasks.jsx";

// api context providers
import { AuthProvider } from "./context/AuthContext.jsx";
import { TasksProvider } from "./context/TasksContext.jsx";
import TaskEditor from "./components/Tasks/TaskEditor.jsx";
import EditTask from "./components/Tasks/EditTask.jsx";

// toastify--notifications
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const router = createBrowserRouter([
  { path: "/register", element: <SignUp /> },
  { path: "/login", element: <Login /> },
  { path: "/", element: <App /> },
  {
    path: "/dashboard",
    element: <PrivateRoute />,
    children: [
      {
        index: true,
        element: <DashBoard />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "manage-tasks",
        element: <ManageTasks />,
      },
      { path: "create-task", element: <TaskEditor /> },
      { path: "edit-tasks/:id", element: <EditTask /> },
    ],
  },
  { path: "*", element: <NotFound /> },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <TasksProvider>
        <RouterProvider router={router} />
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </TasksProvider>
    </AuthProvider>
  </StrictMode>
);
