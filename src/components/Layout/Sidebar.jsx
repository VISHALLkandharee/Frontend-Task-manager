import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Sidebar = () => {
  const { user, handleLogout } = useContext(AuthContext);
  const [open, setOpen] = useState(false);

  // Toggle function for mobile menu
  const toggleSidebar = () => setOpen((prev) => !prev);

  return (
    <>
      <button
        className="md:hidden p-1 fixed top-4 left-4 z-20  rounded"
        onClick={toggleSidebar}
        aria-label="Toggle Sidebar"
      >
        <i className="fa-solid fa-list font-bold text-2xl text-black"></i>
      </button>

      {/* Sidebar container */}
      <div
        className={`
          bg-indigo-200 border-2 p-2
          fixed top-0 left-0 h-screen w-64
          z-30 transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
          md:static md:translate-x-0 md:w-80 md:h-screen
        `}
      >
        {/* -- Sidebar content unchanged -- */}
        <div
          id="profile"
          className="bg-gray-100 rounded flex flex-col items-center p-2"
        >
          <div
            id="img"
            className="w-20 h-20 md:w-28 md:h-28 border-gray-400 rounded-full overflow-hidden flex items-center justify-center"
          >
            <img
              src={
                user?.avatar ||
                "https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-High-Quality-Image.png"
              }
              className="w-full h-full object-cover"
              alt="userImage"
            />
          </div>
          <div id="user-name">{user.username}</div>
          <div id="user-email">{user.email}</div>
        </div>

        <div id="nav-links" className="mt-4 flex flex-col h-auto md:h-[60%]">
          <ul className="flex flex-col gap-3">
            <li className="p-2 hover:underline rounded hover:bg-emerald-100 cursor-pointer">
              <NavLink className={({isActive}) => isActive && "text-red-400"} to="/dashboard">Dashboard</NavLink>
            </li>
            <li className="p-2 hover:underline rounded hover:bg-emerald-100 cursor-pointer">
              <NavLink to="manage-tasks">Manage Tasks</NavLink>
            </li>
            <li className="p-2 hover:underline rounded hover:bg-emerald-100 cursor-pointer">
              <NavLink to="profile">Profile</NavLink>
            </li>
          </ul>
          <div
            id="logout"
            onClick={handleLogout}
            className="mt-auto text-center  bottom-4 right-2 bg-fuchsia-400 hover:bg-fuchsia-200 rounded cursor-pointer p-2 px-4 font-semibold uppercase"
          >
            logout
          </div>
        </div>
      </div>
      {/* Overlay: closes sidebar when clicked outside (mobile only) */}
      {open && (
        <div
          className="md:hidden fixed inset-0 bg-black opacity-40 z-10"
          onClick={toggleSidebar}
        />
      )}
    </>
  );
};

export default Sidebar;
