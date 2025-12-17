import React, { useState, useRef, useEffect } from "react";
const token = localStorage.getItem("token");

export default function Chatbot() {
  const [messages, setMessages] = useState([
    { sender: "Bot", text: "Salam! 👋 Main aapki madad karne ke liye yahan hoon." }
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

const headers = {
  "Content-Type": "application/json",
  "Authorization": `Bearer ${token}`
}


  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMsg = input;
    setMessages(m => [...m, { sender: "You", text: userMsg }]);
    setInput("");
    setTyping(true);

    try {
      const res = await fetch(
        "https://physical-ai-project-production-ea74.up.railway.app/ask",
         {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMsg })
      });
      const data = await res.json();
      setTyping(false);
      setMessages(m => [...m, { sender: "Bot", text: data.answer || "Server error." }]);
    } catch (err) {
      setTyping(false);
      setMessages(m => [...m, { sender: "Bot", text: "Connection error." }]);
    }
  };

  return (
    <div style={{ maxWidth: 700, margin: "30px auto", padding: 20 }}>
      <div style={{ background: "#fff", padding: 18, borderRadius: 12 }}>
        <h3>🤖 AI Chatbot</h3>
        <div style={{ height: 320, overflowY: "auto", padding: 10, background: "#f7f7f8", borderRadius: 8 }}>
          {messages.map((m, i) => (
            <div key={i} style={{ margin: "10px 0", textAlign: m.sender === "You" ? "right" : "left" }}>
              <div style={{
                display: "inline-block",
                padding: "10px 14px",
                borderRadius: 20,
                background: m.sender === "You" ? "#4f46e5" : "#eee",
                color: m.sender === "You" ? "#fff" : "#111"
              }}>
                <strong style={{ display: "block", fontSize: 12 }}>{m.sender}</strong>
                <span>{m.text}</span>
              </div>
            </div>
          ))}
          {typing && <div style={{ color: "#666" }}>Bot is typing...</div>}
          <div ref={chatEndRef} />
        </div>

        <div style={{ display: "flex", marginTop: 12 }}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && sendMessage()}
            placeholder="Type your message..."
            style={{ flex: 1, padding: 10, borderRadius: 8, border: "1px solid #ddd" }}
          />
          <button onClick={sendMessage} style={{ marginLeft: 8, padding: "10px 14px", background: "#4f46e5", color: "white", borderRadius: 8 }}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
