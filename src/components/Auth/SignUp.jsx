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
      setPassword("");
      setLoading(false);
      throw new Error("Signup failed");
    }
  };

  return (
    <div className="min-h-screen md:my-15 md:mx-auto md:bg-blue-400/90 md:p-6 md:rounded-xl md:shadow-lg md:max-w-lg md:w-full text-white flex flex-col items-center justify-center p-4 sm:p-6 bg-linear-to-br from-blue-400/90 to-blue-500/90">
      <div className="w-full max-w-lg md:max-w-lg">
        <h1 className="font-bold capitalize text-xl tracking-wide text-center mb-4">
          Signup
        </h1>
        
        {loading && (
          <div className="text-center text-green-200 font-semibold mb-4">
            Creating your account...
          </div>
        )}
        
        <form onSubmit={handleSubmitSignup} className="flex flex-col gap-6">
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
            className="w-full p-3 rounded-lg bg-blue-300/30 text-sm text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-400/80 file:text-white hover:file:bg-blue-500 cursor-pointer transition"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full p-3 rounded-2xl bg-green-400 cursor-pointer hover:bg-green-500 disabled:bg-green-300 disabled:cursor-not-allowed transition"
          >
            {loading ? "Creating..." : "Signup"}
          </button>
        </form>

        <div id="not-registered" className="flex gap-4 font-light mt-4 justify-center">
          Already have an account?
          <NavLink
            to={"/login"}
            className="text-yellow-300 hover:text-yellow-400 text-sm underline"
          >
            Sign in
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
