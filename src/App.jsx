import React from "react";
import { Navigate } from "react-router-dom";

const App = () => {
  const token = localStorage.getItem("accessToken");

  // if authenticated -> dashboard, otherwise -> login
  if (token) return <Navigate to="/dashboard" replace />;
  return <Navigate to="/login" replace />;
};

export default App;