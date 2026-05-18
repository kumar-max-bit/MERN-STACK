import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const AIChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text: "Hello! I am your Alpha Mart AI Shopping Assistant. 🤖 Ask me about clothes, laptops, mobiles, shoes, or any other items in our store!",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { sender: "user", text: userMessage }]);
    setLoading(true);

    try {
      const response = await axios.post("http://localhost:5000/ai/chat", {
        message: userMessage,
      });
      setMessages((prev) => [...prev, { sender: "ai", text: response.data.reply }]);
    } catch (error) {
      console.error("AI Chat Error:", error);
      toast.error("Failed to connect with AI assistant.");
      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: "Oops! I'm having trouble connecting to the server. Please make sure the backend is running and your Google AI Studio API key is configured.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ai-chatbot-container">
      {/* Floating Toggle Button */}
      <button className="ai-chatbot-toggle" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? "❌" : "💬 AI Assistant"}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="ai-chatbot-window">
          <div className="ai-chatbot-header">
            <h4>Alpha Mart AI Assistant</h4>
            <small>Powered by Gemini 1.5</small>
          </div>

          <div className="ai-chatbot-messages">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`ai-message-bubble ${
                  msg.sender === "user" ? "user-bubble" : "ai-bubble"
                }`}
              >
                {msg.text}
              </div>
            ))}
            {loading && (
              <div className="ai-message-bubble ai-bubble typing-indicator">
                <span>.</span>
                <span>.</span>
                <span>.</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSend} className="ai-chatbot-input-form">
            <input
              type="text"
              placeholder="Ask me anything..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={loading}
            />
            <button type="submit" disabled={loading || !input.trim()}>
              Send
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default AIChatbot;
