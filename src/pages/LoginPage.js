import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function LoginPage() {
  const { setToken } = useContext(AuthContext);
  const [username, setUsername] = useState("sandy");
  const [otp, setOtp] = useState("1234");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://assignment.stage.crafto.app/login",
        {
          username: "sandy",
          otp: "1234",
        }
      );
      setToken(response.data.token);
      localStorage.setItem("authToken", response.data.token); // Store token in localStorage
      navigate("/quotes");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-br from-purple-600 to-blue-500">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md transform transition duration-500 hover:scale-105"
      >
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
          Login
        </h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border border-gray-300 p-3 mb-4 w-full rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
        />
        <input
          type="password"
          placeholder="OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="border border-gray-300 p-3 mb-6 w-full rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
        />
        <button
          type="submit"
          className="bg-purple-600 text-white font-semibold p-3 w-full rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-400"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default LoginPage;
