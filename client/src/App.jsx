import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaRobot } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from './store/userSlice';
import Login from './pages/Login';
import Register from './pages/Register';
import Chat from './pages/Chat';
import './App.css';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Loading from './components/Loading';

function App() {
  const dispatch = useDispatch();
  const { user, isLoading } = useSelector((state) => state.user);

  useEffect(() => {
    // Check if user is logged in from localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      dispatch(setUser(JSON.parse(storedUser)));
    }
  }, [dispatch]);

  if (isLoading) {
    return <Loading />
  }

  return (
    <Router>
      <AnimatePresence mode="wait">
        <div className="min-h-screen w-full bg-gradient-to-br from-black via-gray-900 to-blue-900">
          <Routes>
            <Route 
              path="/login" 
              element={
                !user ? (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Login />
                  </motion.div>
                ) : (
                  <Navigate to="/chat" replace />
                )
              } 
            />
            <Route 
              path="/register" 
              element={
                !user ? (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Register />
                  </motion.div>
                ) : (
                  <Navigate to="/chat" replace />
                )
              } 
            />
            <Route 
              path="/chat" 
              element={
                user ? (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Chat />
                  </motion.div>
                ) : (
                  <Navigate to="/login" replace />
                )
              } 
            />
            <Route 
              path="/" 
              element={
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Home />
                </motion.div>
              } 
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </AnimatePresence>
    </Router>
  );
}

export default App;
