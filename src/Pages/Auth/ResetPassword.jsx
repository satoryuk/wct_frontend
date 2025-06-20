import React from "react";
import { logo } from "../../Assets/images/images";
import { back, password } from "../../Assets/icons/icons";
import { Link } from "react-router-dom";

const ResetPassword = () => {
  return (
    <div className="flex min-h-screen">
      {/* Left Section */}
      <div className="w-1/2 flex flex-col justify-center items-center bg-white">
        <div className="w-full max-w-md">
          {/* Logo and Title */}
          <div className="flex items-center space-x-2 mb-8">
            <img
              src={logo}
              alt="Logo"
              className="w-12 h-12 border-1 border-gray-500 rounded-full"
            />
            <h1 className="text-3xl font-bold text-gray-600">
              Sales Management System
            </h1>
          </div>

          {/* Sign In Title */}
          <h2 className="text-3xl text-left font-bold text-blue-600 mb-6">
            Reset your password!
          </h2>
          <h3 className="text-mediumv text-left text-gray-500 mb-4">
            Please kindly reset your new password.
          </h3>

          {/* Form */}
          <form className="space-y-4">
            {/* Password */}
            <div>
              <h1 className="text-left font-medium text-gray-500 mb-1">
                Password
              </h1>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <img
                    src={password}
                    alt="User Icon"
                    className="w-5 h-5 object-contain"
                  />
                </span>
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full pl-10 px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <h1 className="text-left font-medium text-gray-500 mb-1">
                Confirm Password
              </h1>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <img
                    src={password}
                    alt="User Icon"
                    className="w-5 h-5 object-contain"
                  />
                </span>
                <input
                  type="password"
                  placeholder="Confirm Password"
                  className="w-full pl-10 px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
            </div>

            {/* Sign In Button */}
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 rounded-md transition-all mt-4"
            >
              Sign In
            </button>
          </form>

          {/* Sign Up Link */}
          <div className="mt-4 text-sm text-left font-medium flex flex-row items-center space-x-2">
            <Link to="/login" className="flex flex-row items-center space-x-1">
              <img src={back} alt="back arrow" className="w-6 h-6" />
              <span className="text-gray-600 hover:underline">Back</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="w-1/2 bg-gray-600 text-white flex flex-col justify-center items-center relative">
        {/* Welcome Text */}
        <div className="text-left">
          <h1 className="text-5xl font-bold mb-8">Welcome to</h1>
          <h2 className="text-5xl font-bold mb-8">Sales Management!</h2>
          <p className="max-w-md text-lg mb-16">
            Organize your sales, customers, and inventory effortlessly. Sign up
            today and experience a smarter way to manage your business
            operations!
          </p>
        </div>

        {/* Copyright */}
        <p className="absolute bottom-6 text-xl">
          ©2025_CopyrightSalesManagement.
        </p>
      </div>
    </div>
  );
};

export default ResetPassword;
