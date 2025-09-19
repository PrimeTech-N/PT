import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/auth/login", {
        username,
        password,
      });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.error || "Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#334155]">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="backdrop-blur-xl bg-white/10 border border-white/10 shadow-2xl rounded-2xl p-10 w-full max-w-md"
      >
        {/* Header */}
        <div className="flex flex-col items-center mb-6">
          <span className="text-5xl">🛡️</span>
          <h2 className="text-3xl font-bold text-white mt-2">Admin Login</h2>
          <p className="text-sm text-gray-300">Access your CMS securely</p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-5">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="w-full px-4 py-3 bg-gray-800 text-white placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-3 bg-gray-800 text-white placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-semibold rounded-lg hover:opacity-90 transition-all shadow-lg"
          >
            🚀 Login
          </button>
        </form>

        {/* Error Message */}
        {error && (
          <p className="text-red-400 text-sm mt-4 text-center">{error}</p>
        )}
      </motion.div>
    </div>
  );
}

export default LoginPage;
