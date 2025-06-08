import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaRobot, FaHeadphones, FaWaveSquare, FaMicrophone, FaUser, FaCog, FaQuestionCircle, FaArrowRight, FaStar, FaShieldAlt, FaBolt, FaSignOutAlt, FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/userSlice';
import Navbar from '../components/Navbar';

function Home() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem('user');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-blue-900">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
        
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
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 2 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        {/* Glowing orbs */}
        <div className="absolute inset-0">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-64 h-64 rounded-full bg-blue-500/10 blur-3xl"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                x: [0, 50, 0],
                y: [0, 50, 0],
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 5 + Math.random() * 5,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
      </div>

      {/* Navigation */}
      <Navbar />

      {/* Hero Section */}
      <div className="relative z-10 pt-20 pb-16 sm:pt-24 sm:pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-block mb-4"
            >
              <span className="inline-flex items-center px-4 py-2 rounded-full bg-blue-500/10 text-blue-400 text-sm font-medium">
                <FaStar className="w-4 h-4 mr-2" />
                The Future of Voice Interaction
              </span>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white mb-8"
            >
              Experience the Future of
              <span className="relative">
                <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                  {" "}Voice Interaction
                </span>
                <motion.div
                  className="absolute -inset-1 bg-blue-500/20 blur-xl rounded-full"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 0.8, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                />
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="max-w-2xl mx-auto text-xl text-gray-300 mb-12"
            >
              Interact with our advanced AI assistant through natural voice commands.
              Get instant responses and intelligent solutions to your queries.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4"
            >
              <Link
                to="/chat"
                className="group w-full sm:w-auto bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-lg font-medium transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/25 flex items-center justify-center space-x-2"
              >
                <FaMicrophone className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
                <span>Start Chatting</span>
              </Link>
              <Link
                to="/features"
                className="group w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white px-8 py-3 rounded-lg font-medium transition-all duration-200 hover:shadow-lg hover:shadow-white/10"
              >
                Learn More
                <FaArrowRight className="inline-block ml-2 group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
            </motion.div>

            {/* Trust badges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="mt-12 flex flex-wrap items-center justify-center gap-8 text-gray-400"
            >
              <div className="flex items-center space-x-2">
                <FaShieldAlt className="w-5 h-5 text-blue-400" />
                <span>Secure & Private</span>
              </div>
              <div className="flex items-center space-x-2">
                <FaBolt className="w-5 h-5 text-blue-400" />
                <span>Lightning Fast</span>
              </div>
              <div className="flex items-center space-x-2">
                <FaStar className="w-5 h-5 text-blue-400" />
                <span>5-Star Rated</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="relative z-10 py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-block mb-4"
            >
              <span className="inline-flex items-center px-4 py-2 rounded-full bg-blue-500/10 text-blue-400 text-sm font-medium">
                <FaStar className="w-4 h-4 mr-2" />
                Powerful Features
              </span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-3xl sm:text-4xl font-bold text-white mb-4"
            >
              Discover What Makes Us Unique
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl text-gray-300"
            >
              Experience the power of advanced AI voice technology
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <FaMicrophone className="w-8 h-8" />,
                title: "Natural Voice Recognition",
                description: "Advanced speech recognition technology for accurate voice command processing",
              },
              {
                icon: <FaRobot className="w-8 h-8" />,
                title: "AI-Powered Responses",
                description: "Intelligent responses powered by state-of-the-art AI models",
              },
              {
                icon: <FaHeadphones className="w-8 h-8" />,
                title: "High-Quality Audio",
                description: "Crystal clear audio output for the best listening experience",
              },
              {
                icon: <FaWaveSquare className="w-8 h-8" />,
                title: "Real-time Processing",
                description: "Instant response generation and processing",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="group bg-white/5 backdrop-blur-xl p-6 rounded-2xl border border-white/10 hover:border-blue-500/50 transition-all duration-200"
              >
                <div className="w-16 h-16 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 mb-4 group-hover:bg-blue-500/30 transition-colors duration-200">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="relative z-10 py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-block mb-4"
            >
              <span className="inline-flex items-center px-4 py-2 rounded-full bg-blue-500/10 text-blue-400 text-sm font-medium">
                <FaStar className="w-4 h-4 mr-2" />
                Simple Process
              </span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-3xl sm:text-4xl font-bold text-white mb-4"
            >
              How It Works
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl text-gray-300"
            >
              Get started in three simple steps
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                title: "Create Account",
                description: "Sign up for free and get instant access to all features",
              },
              {
                step: "2",
                title: "Start Speaking",
                description: "Click the microphone button and start your conversation",
              },
              {
                step: "3",
                title: "Get Responses",
                description: "Receive intelligent responses in real-time",
              },
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative group"
              >
                <div className="bg-white/5 backdrop-blur-xl p-6 rounded-2xl border border-white/10 hover:border-blue-500/50 transition-all duration-200">
                  <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-xl mb-4 group-hover:scale-110 transition-transform duration-200">
                    {step.step}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                  <p className="text-gray-300">{step.description}</p>
                </div>
                {index < 2 && (
                  <div className="hidden md:block absolute top-1/2 -right-8 w-8 h-0.5 bg-blue-500/50 group-hover:bg-blue-500 transition-colors duration-200" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative z-10 py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative overflow-hidden bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl p-8 sm:p-12 text-center"
          >
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-[size:14px_24px]" />
            <div className="relative z-10">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Ready to Get Started?
              </h2>
              <p className="text-xl text-white/90 mb-8">
                Join thousands of users already experiencing the future of voice interaction
              </p>
              <Link
                to="/register"
                className="group inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-all duration-200 hover:shadow-lg hover:shadow-white/25"
              >
                Create Free Account
                <FaArrowRight className="inline-block ml-2 group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 py-8 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-white font-bold mb-4">Product</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/features" className="text-gray-400 hover:text-white transition-colors duration-200 group">
                    <span className="relative">
                      Features
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 group-hover:w-full transition-all duration-200" />
                    </span>
                  </Link>
                </li>
                <li>
                  <Link to="/pricing" className="text-gray-400 hover:text-white transition-colors duration-200 group">
                    <span className="relative">
                      Pricing
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 group-hover:w-full transition-all duration-200" />
                    </span>
                  </Link>
                </li>
                <li>
                  <Link to="/chat" className="text-gray-400 hover:text-white transition-colors duration-200 group">
                    <span className="relative">
                      Chat
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 group-hover:w-full transition-all duration-200" />
                    </span>
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-bold mb-4">Company</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/about" className="text-gray-400 hover:text-white transition-colors duration-200 group">
                    <span className="relative">
                      About
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 group-hover:w-full transition-all duration-200" />
                    </span>
                  </Link>
                </li>
                <li>
                  <Link to="/careers" className="text-gray-400 hover:text-white transition-colors duration-200 group">
                    <span className="relative">
                      Careers
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 group-hover:w-full transition-all duration-200" />
                    </span>
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="text-gray-400 hover:text-white transition-colors duration-200 group">
                    <span className="relative">
                      Contact
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 group-hover:w-full transition-all duration-200" />
                    </span>
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-bold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/blog" className="text-gray-400 hover:text-white transition-colors duration-200 group">
                    <span className="relative">
                      Blog
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 group-hover:w-full transition-all duration-200" />
                    </span>
                  </Link>
                </li>
                <li>
                  <Link to="/docs" className="text-gray-400 hover:text-white transition-colors duration-200 group">
                    <span className="relative">
                      Documentation
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 group-hover:w-full transition-all duration-200" />
                    </span>
                  </Link>
                </li>
                <li>
                  <Link to="/support" className="text-gray-400 hover:text-white transition-colors duration-200 group">
                    <span className="relative">
                      Support
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 group-hover:w-full transition-all duration-200" />
                    </span>
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-bold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/privacy" className="text-gray-400 hover:text-white transition-colors duration-200 group">
                    <span className="relative">
                      Privacy
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 group-hover:w-full transition-all duration-200" />
                    </span>
                  </Link>
                </li>
                <li>
                  <Link to="/terms" className="text-gray-400 hover:text-white transition-colors duration-200 group">
                    <span className="relative">
                      Terms
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 group-hover:w-full transition-all duration-200" />
                    </span>
                  </Link>
                </li>
                <li>
                  <Link to="/security" className="text-gray-400 hover:text-white transition-colors duration-200 group">
                    <span className="relative">
                      Security
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 group-hover:w-full transition-all duration-200" />
                    </span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="text-center text-gray-400 text-sm">
            © {new Date().getFullYear()} AI Voice Assistant. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;