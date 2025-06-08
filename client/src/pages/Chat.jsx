import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaMicrophone, FaRobot, FaPaperPlane, FaVolumeUp, FaVolumeMute, FaTrash, FaCog, FaStop, FaPause, FaPlay, FaHome, FaKeyboard } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { addMessage, clearHistory } from '../store/historySlice';

function Chat() {
  const dispatch = useDispatch();
  const { history } = useSelector((state) => state.history);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm your AI voice assistant. How can I help you today?",
      sender: "ai",
      timestamp: new Date(),
      isPlaying: false,
    },
  ]);
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [inputText, setInputText] = useState("");
  const [showTextInput, setShowTextInput] = useState(false);
  const messagesEndRef = useRef(null);
  const audioRef = useRef(null);
  const recognitionRef = useRef(null);

  useEffect(() => {
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;

      recognitionRef.current.onresult = (event) => {
        const current = event.resultIndex;
        const transcript = event.results[current][0].transcript;
        setTranscript(transcript);
      };

      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsRecording(false);
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        if (isRecording) {
          recognitionRef.current.start();
        }
      };
    }
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleStartRecording = () => {
    if (recognitionRef.current) {
      setIsRecording(true);
      setIsListening(true);
      recognitionRef.current.start();
    }
  };

  const handleStopRecording = () => {
    if (recognitionRef.current) {
      setIsRecording(false);
      setIsListening(false);
      recognitionRef.current.stop();
      
      if (transcript.trim()) {
        const newMessage = {
          id: messages.length + 1,
          text: transcript,
          sender: "user",
          timestamp: new Date(),
          isPlaying: false,
        };
        setMessages((prev) => [...prev, newMessage]);
        dispatch(addMessage(newMessage));
        setTranscript("");

        // Simulate AI response
        setTimeout(() => {
          const aiResponse = {
            id: messages.length + 2,
            text: "I understand your message. How can I assist you further?",
            sender: "ai",
            timestamp: new Date(),
            isPlaying: false,
          };
          setMessages((prev) => [...prev, aiResponse]);
          dispatch(addMessage(aiResponse));
        }, 1000);
      }
    }
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const newMessage = {
      id: messages.length + 1,
      text: inputText,
      sender: "user",
      timestamp: new Date(),
      isPlaying: false,
    };
    setMessages((prev) => [...prev, newMessage]);
    dispatch(addMessage(newMessage));
    setInputText("");

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        id: messages.length + 2,
        text: "I understand your message. How can I assist you further?",
        sender: "ai",
        timestamp: new Date(),
        isPlaying: false,
      };
      setMessages((prev) => [...prev, aiResponse]);
      dispatch(addMessage(aiResponse));
    }, 1000);
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: 1,
        text: "Hello! I'm your AI voice assistant. How can I help you today?",
        sender: "ai",
        timestamp: new Date(),
        isPlaying: false,
      },
    ]);
    dispatch(clearHistory());
  };

  const toggleMessagePlayback = (messageId) => {
    setMessages(messages.map(msg => 
      msg.id === messageId ? { ...msg, isPlaying: !msg.isPlaying } : msg
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-blue-900">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center space-x-2 text-white hover:text-blue-400 transition-colors duration-200">
              <FaHome className="w-5 h-5" />
              <span className="font-medium">Home</span>
            </Link>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowTextInput(!showTextInput)}
                className={`p-2 rounded-lg ${
                  showTextInput ? 'bg-blue-500 text-white' : 'bg-white/5 text-gray-300 hover:text-white'
                } transition-colors duration-200`}
              >
                <FaKeyboard className="w-5 h-5" />
              </button>
              <button
                onClick={() => setIsSettingsOpen(!isSettingsOpen)}
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-colors duration-200"
              >
                <FaCog className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="pt-20 pb-24">
        {/* Voice Assistant Status */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 mb-6"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <motion.div
                  animate={{
                    scale: isListening ? [1, 1.2, 1] : 1,
                  }}
                  transition={{
                    duration: 1,
                    repeat: isListening ? Infinity : 0,
                  }}
                  className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500/20 to-blue-600/20 flex items-center justify-center ring-4 ring-blue-500/20"
                >
                  <FaRobot className="w-10 h-10 text-blue-400" />
                </motion.div>
                <div>
                  <h2 className="text-3xl font-bold text-white">AI Voice Assistant</h2>
                  <p className="text-lg text-gray-400">
                    {isListening ? "Listening..." : "Ready to assist"}
                  </p>
                  {isListening && transcript && (
                    <p className="text-sm text-blue-400 mt-1">
                      {transcript}
                    </p>
                  )}
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={isRecording ? handleStopRecording : handleStartRecording}
                className={`p-6 rounded-full ${
                  isRecording
                    ? "bg-red-500 hover:bg-red-600"
                    : "bg-blue-500 hover:bg-blue-600"
                } text-white transition-colors duration-200 relative`}
              >
                {isRecording ? (
                  <>
                    <FaStop className="w-8 h-8" />
                    <motion.div
                      className="absolute inset-0 rounded-full border-4 border-red-500"
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [1, 0, 1],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                      }}
                    />
                  </>
                ) : (
                  <FaMicrophone className="w-8 h-8" />
                )}
              </motion.button>
            </div>
          </motion.div>

          {/* Chat Container */}
          <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden">
            {/* Messages */}
            <div className="h-[calc(100vh-24rem)] overflow-y-auto p-4 space-y-4">
              <AnimatePresence>
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className={`max-w-[80%] rounded-2xl p-4 ${
                        message.sender === "user"
                          ? "bg-blue-500 text-white"
                          : "bg-white/10 text-gray-200"
                      }`}
                    >
                      <div className="flex items-center space-x-2 mb-1">
                        {message.sender === "ai" && (
                          <FaRobot className="w-4 h-4 text-blue-400" />
                        )}
                        <span className="text-sm opacity-75">
                          {message.sender === "user" ? "You" : "AI Assistant"}
                        </span>
                      </div>
                      <p className="text-base">{message.text}</p>
                      <div className="flex items-center justify-between mt-2">
                        <div className="text-xs opacity-50">
                          {message.timestamp.toLocaleTimeString()}
                        </div>
                        {message.sender === "ai" && (
                          <button
                            onClick={() => toggleMessagePlayback(message.id)}
                            className="p-1 rounded-full hover:bg-white/10 transition-colors duration-200"
                          >
                            {message.isPlaying ? (
                              <FaPause className="w-4 h-4 text-blue-400" />
                            ) : (
                              <FaPlay className="w-4 h-4 text-blue-400" />
                            )}
                          </button>
                        )}
                      </div>
                    </motion.div>
                  </motion.div>
                ))}
              </AnimatePresence>
              <div ref={messagesEndRef} />
            </div>

            {/* Text Input Area */}
            <AnimatePresence>
              {showTextInput && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="border-t border-white/10 p-4"
                >
                  <form onSubmit={handleSendMessage} className="flex items-center space-x-4">
                    <input
                      type="text"
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                      placeholder="Type your message..."
                      className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      type="submit"
                      className="p-4 rounded-full bg-blue-500 hover:bg-blue-600 text-white transition-colors duration-200"
                    >
                      <FaPaperPlane className="w-6 h-6" />
                    </motion.button>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Settings Modal */}
      <AnimatePresence>
        {isSettingsOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gray-900 rounded-2xl p-6 w-full max-w-md mx-4"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white">Voice Settings</h2>
                <button
                  onClick={() => setIsSettingsOpen(false)}
                  className="text-gray-400 hover:text-white"
                >
                  ×
                </button>
              </div>
              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-white font-medium">Voice Output</h3>
                      <p className="text-sm text-gray-400">Enable AI voice responses</p>
                    </div>
                    <button className="p-3 rounded-full bg-white/10 text-gray-300 hover:text-white transition-colors duration-200">
                      <FaVolumeUp className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-white font-medium">Voice Input</h3>
                      <p className="text-sm text-gray-400">Enable voice commands</p>
                    </div>
                    <button className="p-3 rounded-full bg-white/10 text-gray-300 hover:text-white transition-colors duration-200">
                      <FaMicrophone className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                <div className="pt-4 border-t border-white/10">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-white font-medium">Clear Chat History</h3>
                      <p className="text-sm text-gray-400">Remove all messages</p>
                    </div>
                    <button
                      onClick={handleClearChat}
                      className="p-3 rounded-full bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors duration-200"
                    >
                      <FaTrash className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Chat; 