import React from "react";
import { useUser } from "../context/UserContext";
import { signInWithPopup, provider, signOut, auth } from "../utils/firebase";

const TopBar = () => {
  const { user } = useUser();

  const handleLogin = async () => {
    await signInWithPopup(auth, provider);
  };

  const handleLogout = async () => {
    await signOut(auth);
  };

  return (
    <div className="flex items-center gap-2">
      {!user ? (
        <button
          onClick={handleLogin}
          className="bg-green-600 hover:bg-green-700 text-white px-4 md:px-6 py-2 rounded text-base md:text-lg font-semibold transition-colors w-full md:w-auto"
        >
          <span className="block md:hidden">Login</span>
          <span className="hidden md:block">Login</span>
        </button>
      ) : (
        <div className="flex items-center gap-2">
          <img
            src={user.photoURL}
            alt="avatar"
            className="w-8 h-8 rounded-full"
          />
          <span className="text-base md:text-lg">{user.displayName}</span>
          <button onClick={handleLogout} className="text-sm text-red-500 ml-2">
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default TopBar;
