import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/userSlice';
import { FaRobot, FaUser, FaSignOutAlt, FaBars, FaTimes, FaHome, FaComments, FaStar, FaDollarSign, FaInfoCircle, FaCog } from 'react-icons/fa';

function Navbar() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem('user');
  };

  const navItems = [
    { to: '/', label: 'Home', icon: FaHome },
    { to: '/chat', label: 'Chat', icon: FaComments },
    { to: '/features', label: 'Features', icon: FaStar },
    { to: '/pricing', label: 'Pricing', icon: FaDollarSign },
    { to: '/about', label: 'About', icon: FaInfoCircle },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-black/80 backdrop-blur-xl shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <motion.div 
            className="flex items-center"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
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
              className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center ring-2 ring-blue-500/20"
            >
              <FaRobot className="w-6 h-6 text-blue-400" />
            </motion.div>
            <span className="ml-3 text-xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              AI Voice Assistant
            </span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <motion.div
                key={item.to}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link
                  to={item.to}
                  className={`group flex items-center space-x-2 text-gray-300 hover:text-white px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    location.pathname === item.to ? 'bg-white/10' : ''
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  <span className="relative">
                    {item.label}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-blue-600 group-hover:w-full transition-all duration-200" />
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* User Menu / Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="relative group"
              >
                <button className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors duration-200 bg-white/5 hover:bg-white/10 px-3 py-2 rounded-lg">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500/20 to-blue-600/20 flex items-center justify-center ring-2 ring-blue-500/20">
                    <FaUser className="w-4 h-4 text-blue-400" />
                  </div>
                  <span className="font-medium">{user.name}</span>
                </button>
                <div className="absolute right-0 w-48 bg-black/80 backdrop-blur-xl rounded-lg shadow-lg py-2 hidden group-hover:block border border-white/10">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/10 transition-colors duration-200"
                  >
                    Profile
                  </Link>
                  <Link
                    to="/settings"
                    className="block px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/10 transition-colors duration-200"
                  >
                    Settings
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-white/10 transition-colors duration-200 flex items-center"
                  >
                    <FaSignOutAlt className="w-4 h-4 mr-2" />
                    Logout
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="flex items-center space-x-4"
              >
                <Link
                  to="/login"
                  className="text-gray-300 hover:text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-white/10"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/25"
                >
                  Get Started
                </Link>
              </motion.div>
            )}
          </div>

          {/* Mobile menu button */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="md:hidden"
          >
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-300 hover:text-white p-2 rounded-lg hover:bg-white/10 transition-colors duration-200"
            >
              {isMobileMenuOpen ? (
                <FaTimes className="w-6 h-6" />
              ) : (
                <FaBars className="w-6 h-6" />
              )}
            </button>
          </motion.div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-black/80 backdrop-blur-xl border-t border-white/10"
          >
            <div className="px-4 py-3 space-y-1">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.to}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Link
                    to={item.to}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-base font-medium text-gray-300 hover:text-white hover:bg-white/10 transition-colors duration-200 ${
                      location.pathname === item.to ? 'bg-white/10' : ''
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </Link>
                </motion.div>
              ))}
              {user ? (
                <>
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.4 }}
                  >
                    <Link
                      to="/profile"
                      className="flex items-center space-x-2 px-3 py-2 rounded-lg text-base font-medium text-gray-300 hover:text-white hover:bg-white/10 transition-colors duration-200"
                    >
                      <FaUser className="w-5 h-5" />
                      <span>Profile</span>
                    </Link>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.5 }}
                  >
                    <Link
                      to="/settings"
                      className="flex items-center space-x-2 px-3 py-2 rounded-lg text-base font-medium text-gray-300 hover:text-white hover:bg-white/10 transition-colors duration-200"
                    >
                      <FaCog className="w-5 h-5" />
                      <span>Settings</span>
                    </Link>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.6 }}
                  >
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center space-x-2 px-3 py-2 rounded-lg text-base font-medium text-red-400 hover:text-red-300 hover:bg-white/10 transition-colors duration-200"
                    >
                      <FaSignOutAlt className="w-5 h-5" />
                      <span>Logout</span>
                    </button>
                  </motion.div>
                </>
              ) : (
                <>
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.4 }}
                  >
                    <Link
                      to="/login"
                      className="flex items-center space-x-2 px-3 py-2 rounded-lg text-base font-medium text-gray-300 hover:text-white hover:bg-white/10 transition-colors duration-200"
                    >
                      <FaUser className="w-5 h-5" />
                      <span>Login</span>
                    </Link>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.5 }}
                  >
                    <Link
                      to="/register"
                      className="flex items-center space-x-2 px-3 py-2 rounded-lg text-base font-medium text-white bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
                    >
                      <FaRobot className="w-5 h-5" />
                      <span>Get Started</span>
                    </Link>
                  </motion.div>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

export default Navbar;