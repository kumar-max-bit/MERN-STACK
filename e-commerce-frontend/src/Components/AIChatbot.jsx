import React, { useState, useRef, useEffect } from "react";
import { Button, Form, Card } from "react-bootstrap";
import axios from "axios";

const AIChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Namaste! 🙏 I'm your Alpha Mart Assistant. How can I help you today?"
    }
  ]);
  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(false);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userMessage = { sender: "user", text: inputText };
    setMessages((prev) => [...prev, userMessage]);
    setInputText("");
    setLoading(true);

    try {
      const response = await axios.post("http://localhost:5000/ai/prompt", {
        prompt: inputText
      });

      const botMessage = {
        sender: "bot",
        text: response.data.AIResponse || "I didn't receive a response. Try again."
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("AI prompt error:", error);
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "Sorry, I am facing connectivity issues at the moment. Please try again later."
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ position: "fixed", bottom: "30px", right: "30px", zIndex: 9999 }}>
      {/* Floating Chat Bubble */}
      {!isOpen && (
        <Button
          variant="warning"
          className="rounded-circle shadow-lg d-flex align-items-center justify-content-center pulse-btn"
          style={{ width: "60px", height: "60px", border: "2px solid #fff" }}
          onClick={() => setIsOpen(true)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            fill="currentColor"
            className="bi bi-chat-dots-fill text-dark"
            viewBox="0 0 16 16"
          >
            <path d="M16 8c0 3.866-3.582 7-8 7a8.841 8.841 0 0 1-2.347-.306c-.584.296-1.925.864-4.181 1.119-.223.024-.435-.16-.396-.38.384-2.14.778-3.682 1.054-4.5A8.177 8.177 0 0 1 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7zM5 8a1 1 0 1 0-2 0 1 1 0 0 0 2 0zm4 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0zm3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
          </svg>
        </Button>
      )}

      {/* Chat Window Panel */}
      {isOpen && (
        <Card className="shadow-lg border-0 bg-white" style={{ width: "360px", borderRadius: "15px", overflow: "hidden" }}>
          {/* Header */}
          <Card.Header className="bg-dark text-white d-flex justify-content-between align-items-center py-3">
            <div className="d-flex align-items-center gap-2">
              <span
                style={{
                  width: "10px",
                  height: "10px",
                  backgroundColor: "#28a745",
                  borderRadius: "50%",
                  display: "inline-block"
                }}
              ></span>
              <span className="fw-bold">Alpha Mart Assistant</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="bg-transparent border-0 text-white fs-5 fw-bold"
              style={{ outline: "none", cursor: "pointer" }}
            >
              ×
            </button>
          </Card.Header>

          {/* Messages Body */}
          <Card.Body
            style={{
              height: "350px",
              overflowY: "auto",
              backgroundColor: "#f8f9fa",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              padding: "15px"
            }}
          >
            {messages.map((msg, idx) => (
              <div
                key={idx}
                style={{
                  alignSelf: msg.sender === "user" ? "flex-end" : "flex-start",
                  maxWidth: "80%",
                  backgroundColor: msg.sender === "user" ? "#ffc107" : "#fff",
                  color: "#000",
                  padding: "10px 14px",
                  borderRadius: msg.sender === "user" ? "15px 15px 0px 15px" : "15px 15px 15px 0px",
                  boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
                  fontSize: "14px",
                  whiteSpace: "pre-wrap"
                }}
              >
                {msg.text}
              </div>
            ))}
            {loading && (
              <div
                style={{
                  alignSelf: "flex-start",
                  backgroundColor: "#fff",
                  padding: "10px 14px",
                  borderRadius: "15px 15px 15px 0px",
                  boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
                  fontSize: "14px"
                }}
              >
                <span className="text-muted">Assistant is typing...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </Card.Body>

          {/* Footer Input */}
          <Card.Footer className="bg-white p-2 border-top">
            <Form onSubmit={handleSendMessage} className="d-flex gap-2">
              <Form.Control
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Ask me anything..."
                style={{ borderRadius: "20px", fontSize: "14px" }}
              />
              <Button type="submit" variant="warning" className="rounded-circle p-2 d-flex align-items-center justify-content-center" style={{ width: "38px", height: "38px" }}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  fill="currentColor"
                  className="bi bi-send-fill text-dark"
                  viewBox="0 0 16 16"
                >
                  <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083l6-15Zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471-.47 1.178Z" />
                </svg>
              </Button>
            </Form>
          </Card.Footer>
        </Card>
      )}
    </div>
  );
};

export default AIChatbot;
