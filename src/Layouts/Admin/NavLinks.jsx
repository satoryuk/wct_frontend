import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { logo } from "../../Assets/images/images";
import {
  dashboard,
  orders,
  payments,
  products,
  help,
  settings,
  customers,
  // inventory,
} from "../../Assets/icons/icons";
import { LogOut } from "lucide-react";
import { useLogoutMutation } from "../../redux/hooks/authApiSlice";
import { logoutSuccess } from "../../redux/features/auth/authSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const NavLinks = ({ isOpen, toggleSidebar, isMobile }) => {
  // Classes for the nav element
  const navClasses = `
    bg-gray-800 text-white min-h-screen 
    fixed top-0 left-0 z-40
    w-80 flex flex-col p-4 space-y-4 items-center
    transition-transform duration-300 ease-in-out
    ${
      isMobile
        ? isOpen
          ? "translate-x-0"
          : "-translate-x-full"
        : "translate-x-0"
    }
  `;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logout] = useLogoutMutation();
  const handleLogout = async () => {
    try {
      await logout().unwrap();
      dispatch(logoutSuccess());
      toast("Logout Success!", { position: "top-right" });
      navigate("/login"); // redirect to login
    } catch (error) {
      console.error("Failed to logout:", error);
      toast.error("Logout failed", { position: "top-right" });
    }
  };
  return (
    <>
      {/* Overlay for mobile when menu is open */}
      {isMobile && isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={toggleSidebar}
          aria-label="Close menu"
        ></div>
      )}

      {/* Navigation Sidebar */}
      <nav className={navClasses}>
        <div className="flex items-center space-x-2 py-2">
          <img src={logo} alt="logo" className="w-8 h-8 rounded-full" />
          <h1 className="text-lg font-bold">Sales Management System</h1>
        </div>
        <span className="w-full border-t-2 border-gray-400 pt-4"></span>
        <NavLink
          to="/"
          className={({ isActive }) => `
            ${isActive ? "bg-gray-600" : "hover:bg-gray-600"} 
            p-2 rounded text-left w-full flex items-center space-x-2
          `}
          onClick={() => isMobile && toggleSidebar()}
        >
          <img src={dashboard} alt="dashboard icon" className="w-5 h-5 ml-8" />
          <span>Dashboard</span>
        </NavLink>
        <NavLink
          to="/products"
          className={({ isActive }) => `
            ${isActive ? "bg-gray-600" : "hover:bg-gray-600"} 
            p-2 rounded text-left w-full flex items-center space-x-2
          `}
          onClick={() => isMobile && toggleSidebar()}
        >
          <img src={products} alt="products icon" className="w-5 h-5 ml-8" />
          <span>Products</span>
        </NavLink>
        <NavLink
          to="/customers"
          className={({ isActive }) => `
            ${isActive ? "bg-gray-600" : "hover:bg-gray-600"} 
            p-2 rounded text-left w-full flex items-center space-x-2
          `}
          onClick={() => isMobile && toggleSidebar()}
        >
          <img src={customers} alt="customers icon" className="w-5 h-5 ml-8" />
          <span>Customers</span>
        </NavLink>
        <NavLink
          to="/orders"
          className={({ isActive }) => `
            ${isActive ? "bg-gray-600" : "hover:bg-gray-600"} 
            p-2 rounded text-left w-full flex items-center space-x-2
          `}
          onClick={() => isMobile && toggleSidebar()}
        >
          <img src={orders} alt="orders icon" className="w-5 h-5 ml-8" />
          <span>Orders</span>
        </NavLink>
        <NavLink
          to="/payments"
          className={({ isActive }) => `
            ${isActive ? "bg-gray-600" : "hover:bg-gray-600"} 
            p-2 rounded text-left w-full flex items-center space-x-2
          `}
          onClick={() => isMobile && toggleSidebar()}
        >
          <img src={payments} alt="payments icon" className="w-5 h-5 ml-8" />
          <span>Payments</span>
        </NavLink>
        {/* <NavLink
          to="/inventories"
          className={({ isActive }) => `
            ${isActive ? "bg-gray-600" : "hover:bg-gray-600"} 
            p-2 rounded text-left w-full flex items-center space-x-2
          `}
          onClick={() => isMobile && toggleSidebar()}
        >
          <img src={inventory} alt="inventory icon" className="w-5 h-5 ml-8" />
          <span>Inventory</span>
        </NavLink> */}

        <h2 className="text-sm py-4">HELP & SUPPORT</h2>

        <div className="w-full">
          <NavLink
            to="/help"
            className={({ isActive }) => `
              ${isActive ? "bg-gray-600" : "hover:bg-gray-600"} 
              p-2 rounded text-center w-full flex items-center space-x-2 mb-4
            `}
            onClick={() => isMobile && toggleSidebar()}
          >
            <img src={help} alt="help icon" className="w-5 h-5 ml-8" />
            <span>Help & Center</span>
          </NavLink>
          <NavLink
            to="/settings"
            className={({ isActive }) => `
              ${isActive ? "bg-gray-600" : "hover:bg-gray-600"} 
              p-2 rounded text-center w-full flex items-center space-x-2
            `}
            onClick={() => isMobile && toggleSidebar()}
          >
            <img src={settings} alt="settings icon" className="w-5 h-5 ml-8" />
            <span>Settings</span>
          </NavLink>
          <NavLink
            className="bg-red-600 hover:bg-red-700 text-white px-2 py-2 rounded mt-60 flex items-center justify-center space-x-2 transition-all"
            onClick={handleLogout}
          >
            <LogOut className="w-5 h-5" />
            <span>Log Out</span>
          </NavLink>
        </div>
      </nav>
    </>
  );
};

export default NavLinks;
