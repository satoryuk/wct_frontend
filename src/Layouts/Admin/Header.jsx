import React from "react";
import { Menu } from "lucide-react";
import { useSelector } from "react-redux";

const Header = ({ toggleSidebar, isMobile }) => {
  const { user } = useSelector((state) => state.auth);
  console.log("Header user:", user);
  return (
    <header className="flex justify-between items-center py-4 px-12 shadow bg-white w-full">
      <div className="flex items-center">
        {isMobile && (
          <button
            onClick={toggleSidebar}
            className="mr-4 p-1 rounded-md bg-gray-700 hover:bg-gray-600 focus:outline-none transition-all duration-300 hover:scale-105"
            aria-label="Toggle sidebar"
          >
            <Menu className="w-6 h-6 text-white" />
          </button>
        )}
        <h1 className="text-xl font-semibold text-gray-600">
          Hello,{" "}
          <span className="text-blue-500 font-bold">{user.username}</span>{" "}
          Welcome back!
        </h1>
      </div>
      <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-medium">
        {user.username.charAt(0)}
      </div>
    </header>
  );
};

export default Header;
