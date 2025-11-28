import React, { useContext } from "react";
import {NavLink} from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Header = () => {

  const {handleLogout} = useContext(AuthContext);

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center p-2 sm:px-4 bg-lime-200 box-border">
      <div id="left-side" className="flex items-center gap-2 mb-2 sm:mb-0">
        <span className="size-8 rounded-full bg-black font-bold text-white text-2xl text-center">T</span>
        <h1 className="pl-1 capitalize text-[18px] font-bold" id="logo">
          Task Manager
        </h1>
      </div>
      <div className="flex flex-col sm:flex-row gap-2.5" id="right-side">
        <ul className="flex flex-col sm:flex-row" id="nav">
          <NavLink to={"/dashboard"} className="py-2 px-4 rounded">Home</NavLink>
          <NavLink to={"profile"} className="py-2 px-4">profile</NavLink>
        </ul>
        <div onClick={handleLogout} className="py-2 px-4 rounded bg-purple-200 font-semibold cursor-pointer" id="logout">
          Logout
        </div>
      </div>
    </div>
  );
};

export default Header;
