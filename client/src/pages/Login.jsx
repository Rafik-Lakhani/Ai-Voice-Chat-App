import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { motion, AnimatePresence } from "framer-motion";
import { FaMicrophone, FaRobot, FaHeadphones, FaWaveSquare } from "react-icons/fa";
import { Link } from "react-router-dom";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [isFocused, setIsFocused] = useState({
    email: false,
    password: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFocus = (field) => {
    setIsFocused((prev) => ({
      ...prev,
      [field]: true,
    }));
  };

  const handleBlur = (field) => {
    setIsFocused((prev) => ({
      ...prev,
      [field]: false,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    console.log("Login data:", formData);
  };

  const handleGoogleSignIn = () => {
    // Handle Google sign-in logic here
    console.log("Google sign-in clicked");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-blue-900 flex">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* Animated grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]" />
        
        {/* Animated circles */}
        <div className="absolute inset-0">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full border border-blue-500/20"
              style={{
                width: `${(i + 1) * 200}px`,
                height: `${(i + 1) * 200}px`,
                left: '50%',
                top: '50%',
                x: '-50%',
                y: '-50%',
              }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.1, 0.2, 0.1],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                delay: i * 0.5,
              }}
            />
          ))}
        </div>

        {/* Floating particles */}
        <div className="absolute inset-0">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-blue-500/30 rounded-full"
              initial={{
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 2 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
      </div>

      {/* Left side - Decorative section */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-black/90 to-blue-900/90 z-10" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2064&auto=format&fit=crop')] bg-cover bg-center opacity-50" />
        <div className="relative z-20 flex flex-col justify-center px-12 text-white">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-8"
          >
            <div className="flex items-center space-x-3">
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 10, -10, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
                className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center"
              >
                <FaRobot className="w-6 h-6 text-blue-400" />
              </motion.div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-blue-400 bg-clip-text text-transparent">
                AI Voice Assistant
              </h1>
            </div>
            <p className="text-lg text-gray-300">
              Experience the future of voice interaction with our advanced AI assistant. 
              Get instant responses, natural conversations, and intelligent solutions.
            </p>
            <div className="space-y-4">
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="flex items-center space-x-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors duration-200"
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center"
                >
                  <FaMicrophone className="w-5 h-5 text-blue-400" />
                </motion.div>
                <span className="text-gray-200">Natural voice recognition</span>
              </motion.div>
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="flex items-center space-x-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors duration-200"
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center"
                >
                  <FaRobot className="w-5 h-5 text-blue-400" />
                </motion.div>
                <span className="text-gray-200">Advanced AI conversations</span>
              </motion.div>
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="flex items-center space-x-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors duration-200"
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center"
                >
                  <FaHeadphones className="w-5 h-5 text-blue-400" />
                </motion.div>
                <span className="text-gray-200">High-quality audio experience</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Right side - Login form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-md w-full space-y-8 bg-white/5 backdrop-blur-xl p-8 rounded-2xl shadow-2xl border border-white/10"
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
            className="text-center"
          >
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
              className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center"
            >
              <FaRobot className="w-8 h-8 text-white" />
            </motion.div>
            <h2 className="text-3xl font-extrabold text-white">
              Welcome Back
            </h2>
            <p className="mt-2 text-sm text-gray-300">
              Ready to continue your AI conversation?{" "}
              <Link
                to="/register"
                className="font-medium text-blue-400 hover:text-blue-300 transition-colors duration-200"
              >
                Create new account
              </Link>
            </p>
          </motion.div>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm space-y-4">
              <div className="relative">
                <label
                  htmlFor="email"
                  className={`absolute left-3 px-2 transition-all duration-200 ${
                    isFocused.email || formData.email
                      ? "-top-2.5 text-sm text-blue-400 font-bold bg-gradient-to-b from-[#1E273A] to-[#293244] rounded-2xl"
                      : "top-2 text-gray-400"
                  }`}
                >
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="appearance-none rounded-lg block w-full px-3 py-2 border border-white/10 bg-white/5 text-white placeholder-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-all duration-200"
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={() => handleFocus("email")}
                  onBlur={() => handleBlur("email")}
                />
              </div>

              <div className="relative">
                <label
                  htmlFor="password"
                  className={`absolute left-3 bg-transparent px-1 transition-all duration-200 ${
                    isFocused.password || formData.password
                      ? "-top-2.5 text-sm text-blue-400 font-bold bg-gradient-to-b from-[#1E273A] to-[#293244] rounded-2xl"
                      : "top-2 text-gray-400"
                  }`}
                >
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="appearance-none rounded-lg block w-full px-3 py-2 border border-white/10 bg-white/5 text-white placeholder-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-all duration-200"
                  value={formData.password}
                  onChange={handleChange}
                  onFocus={() => handleFocus("password")}
                  onBlur={() => handleBlur("password")}
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-600 rounded transition-colors duration-200"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-300"
                >
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a
                  href="#"
                  className="font-medium text-blue-400 hover:text-blue-300 transition-colors duration-200"
                >
                  Forgot password?
                </a>
              </div>
            </div>

            <motion.div 
              whileHover={{ scale: 1.02 }} 
              whileTap={{ scale: 0.98 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
              <button
                type="submit"
                className="relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Start Conversation
              </button>
            </motion.div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-transparent text-gray-400">
                  Or continue with
                </span>
              </div>
            </div>

            <motion.div
              className="mt-6"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <button
                onClick={handleGoogleSignIn}
                className="w-full flex items-center justify-center px-4 py-2 border border-white/10 rounded-lg shadow-sm text-sm font-medium text-white bg-white/5 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
              >
                <FcGoogle className="h-5 w-5 mr-2" />
                Sign in with Google
              </button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default Login;
