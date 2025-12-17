import React, { useState } from "react";
import Layout from "@theme/Layout";

export default function ChatbotPage() {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "👋 Hi! I am your Physical AI assistant. How can I help you today?" }
  ]);

  const [input, setInput] = useState("");

  const handleSend = async (e) => {
    e.preventDefault();

    if (!input.trim()) return;

    setMessages(prev => [...prev, { sender: "user", text: input }]);

    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        "https://physical-ai-project-production-ea74.up.railway.app/ask",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ message: input }),
        }
      );

      const data = await res.json();

      setMessages(prev => [
        ...prev,
        { sender: "bot", text: data.answer || "⚠️ No response from backend" }
      ]);

    } catch (error) {
      setMessages(prev => [
        ...prev,
        { sender: "bot", text: "🚨 Server error" }
      ]);
    }

    setInput("");
  };

  return (
    <Layout title="Chatbot">
      <div style={styles.page}>
        <div style={styles.wrapper}>
          <div style={styles.card}>
            <h2 style={styles.title}>🤖 Physical AI Chatbot</h2>

            <div style={styles.chatBox}>
              {messages.map((m, i) => (
                <div key={i} style={m.sender === "bot" ? styles.botMsg : styles.userMsg}>
                  {m.text}
                </div>
              ))}
            </div>

            <form onSubmit={handleSend} style={styles.form}>
              <input
                style={styles.input}
                placeholder="Ask something..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />

              <button style={styles.button}>Send</button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}

const styles = {
  page: {
    minHeight: "80vh",
    display: "flex",
    justifyContent: "center",
  },
  wrapper: {
    width: "100%",
    maxWidth: "600px",
    marginTop: "120px",
  },
  card: {
    background: "#020617",
    borderRadius: "14px",
    padding: "36px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
    color: "#fff",
  },
  title: {
    textAlign: "center",
    color: "#fff",
  },
  chatBox: {
    background: "#000311",
    padding: "px",
    borderRadius: "0px",
    height: "350px",
    overflowY: "auto",
    marginBottom: "20px",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  form: {
    display: "flex",
    gap: "10px",
  },
  input: {
    flex: 1,
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #1e293b",
    background: "#020617",
    color: "#fff",
    fontSize: "15px",
  },
  button: {
    padding: "12px 18px",
    borderRadius: "8px",
    border: "none",
    background: "#22c55e",
    fontWeight: "bold",
    cursor: "pointer",
  },
  botMsg: {
    background: "#1e293b",
    padding: "8px",
    borderRadius: "6px",
    color: "#fff",
  },
  userMsg: {
    background: "#22c55e",
    padding: "8px",
    borderRadius: "6px",
    color: "#000",
    alignSelf: "flex-end",
  },
};
