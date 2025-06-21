import { useState } from "react";
import { logo } from "../../Assets/images/images";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useLoginMutation } from "../../redux/hooks/authApiSlice";
import { toast } from "react-toastify";
import { BASE_URL_LOCAL } from "../../redux/constants";
import { loginSuccess } from "../../redux/features/auth/authSlice";
import { User, LockKeyhole } from "lucide-react";

const LogIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [login] = useLoginMutation();
  const handleLogin = async (e) => {
    e.preventDefault();

    console.log("Login attempt with:", { email, password });
    // console.log("Sending login request to:", `${BASE_URL_LOCAL}/login`);

    try {
      const res = await login({ email, password }).unwrap();
      console.log("Actual response:", res.original);

      dispatch(
        loginSuccess({
          user: res.original.data.user,
          access_token: res.original.access_token,
        })
      );
      toast("Login Success", {
        position: "top-right",
      });
      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (error) {
      toast.error(error?.data?.message || error.message);
    }
  };

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
              className="w-10 h-10 border-1 border-gray-500 rounded-full"
            />
            <h1 className="text-3xl font-bold text-gray-600">
              Sales Management System
            </h1>
          </div>

          {/* Sign In Title */}
          <h2 className="text-3xl text-left font-bold text-blue-600 mb-6">
            Sign In
          </h2>

          {/* Form */}
          <form className="space-y-4" onSubmit={handleLogin}>
            {/* Email */}
            <div>
              <h1 className="text-left font-medium text-gray-500 mb-1">
                Email
              </h1>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <User className="w-4 h-4 text-gray-600" />
                </span>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  placeholder="Email"
                  className="w-full pl-10 px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <h1 className="text-left font-medium text-gray-500 mb-1">
                Password
              </h1>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <LockKeyhole className="w-4 h-4 text-gray-600" />
                </span>
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  placeholder="Password"
                  className="w-full pl-10 px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
            </div>

            {/* Forgot Password */}
            <div className="text-right">
              <Link
                to="/forgotpassword"
                className="text-sm text-blue-600 font-medium hover:underline"
              >
                Forgot your password?
              </Link>
            </div>
            {/* Sign In Button */}
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 rounded-md transition-all"
            >
              Sign In
            </button>
          </form>

          {/* Sign Up Link */}
          <p className="mt-4 text-sm text-left font-medium text-gray-600">
            You do not have an account yet?{" "}
            <Link to="/signup" className="text-blue-600 hover:underline">
              Sign Up
            </Link>
          </p>
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

export default LogIn;
