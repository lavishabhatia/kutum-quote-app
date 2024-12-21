import React, { useState } from "react";
import { login } from "../api/user";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await login({
        username,
        otp,
      });

      if (response?.status === 200) {
        console.log(response);
        const token = response.data.token;
        localStorage.setItem("authToken", token);
        navigate("/quote");
        // alert("Login successful!");
      } else {
        setError("Invalid username or OTP.");
      }
    } catch (err) {
      setError("Failed to log in. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">
          Welcome Back
        </h1>
        <p className="text-sm text-gray-600 text-center mb-6">
          Enter your username and OTP to login
        </p>
        {error && (
          <p className="text-center text-sm text-red-500 mb-4">{error}</p>
        )}
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              placeholder="Enter your username"
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="otp"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              OTP
            </label>
            <input
              type="text"
              id="otp"
              name="otp"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:outline-none"
              placeholder="Enter your OTP"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full ${
              loading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
            } text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-300 transition duration-200`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <p className="text-center text-sm text-gray-500 mt-4">
          Didn't receive OTP?{" "}
          <a href="#" className="text-blue-500 hover:underline">
            Resend
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
