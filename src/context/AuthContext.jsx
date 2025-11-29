import { createContext, useState, useEffect } from "react";
import { BASE_URL } from "../api/client";
import { toast } from "react-toastify";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(
    () => localStorage.getItem("accessToken") || null
  );
  const [user, setUser] = useState(() =>
    localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null
  );

  // GET user profile
  const fetchProfile = async () => {
    if (!token) return;

    try {
      const response = await fetch(`${BASE_URL}/api/auth/profile`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const user = await response.json();
      console.log(user);
      setUser(user);
      localStorage.setItem("user", JSON.stringify(user));
      // toast.success(user.message || "User data fetched successfully");
    } catch (error) {
      toast.error(error.message || "Failed to fetch user data");
      console.error("Failed to fetch user data:", error);
    }
  };

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    setToken(accessToken || null);
  }, []);

  //   useEffect(() => {
  //   const updateToken = () => setToken(localStorage.getItem("accessToken") || null);
  //   window.addEventListener("storage", updateToken);
  //   return () => window.removeEventListener("storage", updateToken);
  // }, []);

  useEffect(() => {
    if (token) {
      fetchProfile();
    }
  }, [token]);

  // Logout function
  const handleLogout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
  };

  const signup = async (username, email, password, file) => {
    if (!username || !email || !password || !file) {
      throw new Error("All fields are required");
    }

    try {
      const formData = new FormData();
      formData.append("username", username);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("avatar", file);

      // for (const pair of formData.entries()) {
      //   console.log(pair[0], pair[1]);
      // }

      const response = await fetch(`${BASE_URL}/api/auth/register`, {
        method: "POST",
        // headers: {
        //   "Content-Type": "application/json",
        // },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.message || "Registration failed");
        throw new Error(errorData || "Registration request failed");
      }

      const data = await response.json();
      console.log(data);
      toast.success(data.message || "Registration successful");
      return data.message;
    } catch (error) {
      console.log("Register Failed!,", error);
    }
  };

  // Login function
  const login = async (email, password) => {
    console.log(BASE_URL);
    if (email === "" || password === "") {
      toast.error("Email and password are required");
      throw new Error("Email and password are required");
    }
    try {
      const response = await fetch(`${BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        setToken(null);
        localStorage.removeItem("accessToken");
        const errorData = await response.json();
        toast.error(errorData.message || "Login failed");
        throw new Error(errorData || "Login request failed");
      }

      const data = await response.json();
      const accessToken = data?.ACCESS_TOKEN;
      const user = data?.user;
      setUser(user);
      toast.success(data.message || "Login successful");
      localStorage.setItem("accessToken", accessToken);
      setToken(accessToken);
      return true;
    } catch (error) {
      toast.error(error.message || "Login failed");
      console.error("Login failed:", error);
    }
  };

  const updateProfile = async (username, email, password) => {
    if (!token) return;
    if (!username && !email && !password) return;

    try {
      const response = await fetch(`${BASE_URL}/api/auth/update-profile`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message || "Update failed");
        throw new Error("Update failed: " + (data.message || "Unknown error"));
      }
      console.log(data.message);

      setUser(data?.updatedUser);
      localStorage.setItem("user", JSON.stringify(data.updatedUser));
      toast.success(data.message || "Profile updated successfully");
    } catch (error) {
      console.error("Failed to update profile:", error.message);
      throw error;
    }
  };

  const updateProfilePicture = async (file) => {
    if (!token) return;
    if (!file) return;

    const formData = new FormData();

    formData.append("avatar", file);

    try {
      const response = await fetch(
        `${BASE_URL}/api/auth/update-profile-picture`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );
      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message || "Profile picture update failed");
        throw new Error(
          "Profile picture update failed: " + (data.message || "Unknown error")
        );
      }

      const user = data?.updatedUser;
      setUser(user);
      localStorage.setItem("user", JSON.stringify(data.updatedUser));
      toast.success(data.message || "Profile updated successfully");
      console.log(data.message)
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        signup,
        login,
        updateProfile,
        handleLogout,
        updateProfilePicture,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
