import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";

const Profile = () => {
  const { user, updateProfile, updateProfilePicture } = useContext(AuthContext);

  const [isEditing, setIsEditing] = useState(false);
  const [username, setUsername] = useState(user?.username || "");
  const [email, setEmail] = useState(user?.email || "");

  if (!user) {
    return <div>Loading...</div>;
  }

  const startEditing = () => {
    setUsername(user.username);
    setEmail(user.email);
    setIsEditing(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateProfile(username, email);
      setIsEditing(false);
      setUsername(username);
      setEmail(email);
    } catch (error) {
      console.error("Failed to update profile:", error);
    }
  };

  return (
    <div className="h-screen w-screen sm:h-auto sm:max-w-lg sm:mx-auto sm:my-8 bg-blue-400/90 p-4 sm:p-6 rounded-xl shadow-lg text-white flex flex-col">
      <h1 className="font-bold capitalize text-xl tracking-wide text-center">
        Profile
      </h1>
      <div
        id="user-profile"
        className="p-2 rounded flex flex-col sm:flex-row justify-between items-center mt-3 gap-4"
      >
        <div
          id="user-image"
          className="group relative size-35 rounded-full overflow-hidden border-4 border-white"
        >
          <input
            type="file"
            name="avatar"
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) {
                updateProfilePicture(file);
                e.target.value = null;
              }
            }}
            accept="image/*"
            className="absolute inset-0 hidden group-hover:flex cursor-pointer 
             opacity-0 group-hover:opacity-100 group-hover:scale-100
             transition-all duration-200 
             bg-linear-to-t from-black/80 to-transparent
             items-center justify-center text-white text-sm font-medium 
             hover:bg-black/70 z-10"
          />

          <img
            src={user?.avatar || "loading"}
            alt="user-image"
            className="w-full h-full object-cover group-hover:brightness-50 transition-all duration-200"
          />
          {/* Optional: Add camera icon via Heroicons or SVG inside input for better UX */}
        </div>

        <div
          id="edit-profile"
          onClick={isEditing ? undefined : startEditing}
          className="font-bold text-md text-white hover:text-gray-400 cursor-pointer mt-4 sm:mt-0"
        >
          {isEditing ? (
            <button
              type="submit"
              form="profile-form"
              className="py-2 px-4 bg-orange-400 rounded font-bold"
            >
              Done
            </button>
          ) : (
            <>
              Edit <i className="fa-solid fa-pen-to-square"></i>
            </>
          )}
        </div>
      </div>
      <div id="user-details" className="mt-6 flex flex-col gap-4">
        {isEditing ? (
          <form
            id="profile-form"
            onSubmit={handleSubmit}
            className="p-2 sm:p-4"
          >
            <div className="py-2 sm:py-4 flex flex-col sm:flex-row gap-2 items-center">
              <label htmlFor="username" className="min-w-20">
                Username:
              </label>
              <input
                id="username"
                className="outline-1 border-gray-600 focus:outline-white p-1 rounded flex-1"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="py-2 sm:py-4 flex flex-col sm:flex-row gap-2 items-center">
              <label htmlFor="email" className="min-w-20">
                Email:{" "}
              </label>
              <input
                id="email"
                className="outline-1 border-gray-600 focus:outline-white p-1 rounded flex-1"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </form>
        ) : (
          <>
            <div id="user-name" className="flex justify-between gap-2">
              <span className="font-semibold">Name :</span>
              <span>{user.username}</span>
            </div>
            <div id="user-email" className="flex justify-between gap-2">
              <span className="font-semibold">Email :</span>
              <span>{user.email}</span>
            </div>
          </>
        )}

        <div id="user-joined-date" className="flex justify-between gap-2">
          <span className="font-semibold">Joined On :</span>
          <span>{new Date(user.createdAt).toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  );
};

export default Profile;
