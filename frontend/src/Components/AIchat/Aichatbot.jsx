import React, { useState } from "react";
import { Send } from "lucide-react";
import axios from "axios";

const Aichatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    // Add a loading indicator bubble
    setMessages((prev) => [...prev, { sender: "bot", text: "loading" }]);

    try {
      const response = await axios.post("http://localhost:5000/chat", {
        query: input
      });
      const botMessage = { sender: "bot", text: response.data.response };
      setMessages((prev) => prev.slice(0, -1).concat(botMessage)); // Remove loading and add actual response
    } catch (error) {
      console.error("Error fetching response:", error);
      setMessages((prev) => prev.slice(0, -1).concat({ sender: "bot", text: "Error fetching response. Please try again." }));
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="w-full h-[680px] flex flex-col justify-center items-center bg-blue-100">
      <div className="w-full max-w-4xl h-full bg-white rounded-lg shadow-lg p-4 flex flex-col">
        <div className="flex-1 overflow-y-auto p-3 bg-blue-50 rounded-lg">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`p-2 my-1 rounded-lg w-fit max-w-xs ${
                msg.sender === "user" ? "bg-blue-500 text-white ml-auto" : "bg-white text-black"
              }`}
            >
              {msg.text === "loading" ? (
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: "100ms" }}></div>
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: "200ms" }}></div>
                </div>
              ) : (
                msg.text
              )}
            </div>
          ))}
        </div>
        <div className="flex items-center mt-3 border-t pt-2">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask something..."
            className="flex-1 p-2 border rounded-l-lg focus:outline-none resize-none"
            rows="1"
          />
          <button
            onClick={sendMessage}
            className="bg-blue-500 text-white p-2 rounded-r-lg hover:bg-blue-600"
            disabled={loading}
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Aichatbot;