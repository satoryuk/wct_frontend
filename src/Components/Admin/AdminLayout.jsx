// App.js or main layout component
import React, { useState, useEffect } from "react";
import NavLinks from "../../Layouts/Admin/NavLinks";
import Header from "../../Layouts/Admin/Header";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // Handle screen resize
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
      // Auto-close sidebar on mobile, keep open on desktop
      setSidebarOpen(window.innerWidth >= 768);
    };

    // Check on initial load
    checkScreenSize();

    // Add event listener
    window.addEventListener("resize", checkScreenSize);

    // Clean up
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <NavLinks
        isOpen={sidebarOpen}
        toggleSidebar={toggleSidebar}
        isMobile={isMobile}
      />

      {/* Main Content */}
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ease-in-out ${
          sidebarOpen && !isMobile ? "md:ml-80" : "ml-0"
        }`}
      >
        <Header toggleSidebar={toggleSidebar} isMobile={isMobile} />

        <main className="flex-1 overflow-y-auto px-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
