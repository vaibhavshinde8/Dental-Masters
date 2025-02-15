import React, { useState, useEffect, useContext } from "react";
import io from "socket.io-client";
import axios from "axios";
import { AppContext } from "../store/auth";

const socket = io("https://dentalmasters.onrender.com"); // Replace with your backend URL

const ChatIcon = () => {
  const { state } = useContext(AppContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [room] = useState(12); // Fixed room ID for simplicity
  const [sender, setSender] = useState(null); // Set sender dynamically when user data is available
  const [isLoading, setIsLoading] = useState(false); // Loading state for chat history

  useEffect(() => {
    // Update sender when state.user is available
    if (state?.user?.id) {
      setSender(state.user.id);
    }
  }, [state]);



  

  const toggleModal = async () => {
    setIsModalOpen((prev) => !prev);

    // Fetch chat history only when opening the modal
    if (!isModalOpen && sender) {
      setIsLoading(true); // Start loading
      try {
        const res = await axios.get(`https://dentalmasters.onrender.com/api/chat/${room}`);
        setMessages(res.data.messages || []);
      } catch (error) {
        console.error("Error fetching chat history:", error.message);
      } finally {
        setIsLoading(false); // Stop loading
      }
    }
  };

  useEffect(() => {
    if (sender) {
      // Join the chat room when sender is available
      socket.emit("joinRoom", room);

      // Listen for new messages
      socket.on("receiveMessage", (newMessage) => {
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      });

      // Clean up the socket connection when the component unmounts
      return () => {
        socket.disconnect();
      };
    }
  }, [room, sender]);

  const sendMessage = () => {
    if (!message.trim() || !sender) return;

    const newMessage = { room, sender, message };
    socket.emit("sendMessage", newMessage);

    setMessages((prevMessages) => [
      ...prevMessages,
      { sender, message, timestamp: new Date() },
    ]);
    setMessage(""); // Clear the input field
  };

  if (!sender) {
    return (
      <div
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          zIndex: 1000,
        }}
      >
        <img
          src="/chaticon.png"
          alt="Chat Icon"
          style={{ width: "50px", height: "50px", cursor: "not-allowed" }}
        />
      </div>
    );
  }

  return (
    <div>
      {/* Chat Icon */}
      <div
        onClick={toggleModal}
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          cursor: "pointer",
          zIndex: 1000,
        }}
      >
        <img
          src="/chaticon.png"
          alt="Chat Icon"
          style={{ width: "50px", height: "50px" }}
        />
      </div>

      {/* Modal */}
      <div
        style={{
          position: "fixed",
          bottom: isModalOpen ? "80px" : "20px",
          right: "20px",
          opacity: isModalOpen ? 1 : 0,
          visibility: isModalOpen ? "visible" : "hidden",
          transition: "bottom 0.3s ease-in-out, opacity 0.3s ease-in-out",
          zIndex: 999,
        }}
      >
        <div className="max-w-md mx-auto bg-white dark:bg-zinc-800 shadow-md rounded-lg overflow-hidden">
          <div className="flex flex-col h-[400px]">
            {/* Header */}
            <div className="px-4 py-3 border-b dark:border-zinc-700">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold text-zinc-800 dark:text-white">
                  Live Chat
                </h2>
                <div className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                  Online
                </div>
              </div>
            </div>

            {/* Chat Messages */}
            <div
              className="flex-1 p-3 overflow-y-auto flex flex-col space-y-2"
              id="chatDisplay"
            >
              {isLoading ? (
                <div className="text-center text-gray-500">Loading...</div>
              ) : (
                messages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`chat-message ${
                      msg.sender === sender
                        ? "self-end bg-blue-500"
                        : "self-start bg-zinc-500"
                    } text-white max-w-xs rounded-lg px-3 py-1.5 text-sm`}
                  >
                    <strong>{msg.sender}</strong>: {msg.message}
                    <br />
                    <small>{new Date(msg.timestamp).toLocaleTimeString()}</small>
                  </div>
                ))
              )}
            </div>

            {/* Chat Input */}
            <div className="px-3 py-2 border-t dark:border-zinc-700">
              <div className="flex gap-2">
                <input
                  placeholder="Type your message..."
                  className="flex-1 p-2 border rounded-lg dark:bg-zinc-700 dark:text-white dark:border-zinc-600 text-sm"
                  id="chatInput"
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                />
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1.5 px-3 rounded-lg transition duration-300 ease-in-out text-sm"
                  onClick={sendMessage}
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatIcon;
