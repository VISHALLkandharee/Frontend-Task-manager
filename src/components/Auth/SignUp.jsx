import React from "react";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { signup } = useContext(AuthContext);

  const handleSubmitSignup = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!username || !email || !password || !file) {
      setUsername("");
      setEmail("");
      setPassword("");
      setFile(null);
      throw new Error("All fields are required");
    }

    console.log("file:  ", file)
    const success = await signup(username, email, password, file);

    if (success) {
      setLoading(false);
      console.log(success);
      navigate("/login");
    } else {
      setUsername("");
      setEmail("");
      setPassword("");
      throw new Error("Signup failed");
    }
  };

  return (
    <div className="my-15 mx-auto bg-blue-400/90 p-6 rounded-xl shadow-lg  max-w-lg w-full text-white flex flex-col">
      <h1 className="font-bold capitalize  text-xl tracking-wide text-center">
        Signup
      </h1>
      {loading && (
        <div className="text-center text-green-200 font-semibold">
          Creating your account...
        </div>
      )}
      <form onSubmit={handleSubmitSignup} className="mt-4 flex flex-col gap-6">
        <input
          className="w-full p-3 rounded-lg bg-blue-300/70 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-blue-100 font-semibold transition"
          type="text"
          placeholder="Enter Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          className="w-full p-3 rounded-lg bg-blue-300/70 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-blue-100 font-semibold transition"
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="w-full p-3 rounded-lg bg-blue-300/70 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-blue-100 font-semibold transition"
          type="password"
          placeholder="Enter Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <input
          type="file"
          required
          accept="image/*"
          name="avatar"
          onChange={(e) => setFile(e.target.files?.[0] ?? null)}
          className="w-full p-3 rounded-lg bg-blue-300/30 text-sm text-white"
        />

        <button
          type="submit"
          className="w-full p-3 rounded-2xl bg-green-400 cursor-pointer hover:bg-green-500 "
        >
          Signup
        </button>
      </form>

      <div id="not-registered" className="flex gap-4 font-light mt-4">
        Already have an account?{" "}
        <NavLink
          to={"/login"}
          className="text-yellow-300 hover:text-yellow-400 text-sm underline"
        >
          Sign in
        </NavLink>
      </div>
    </div>
  );
};

export default SignUp;
