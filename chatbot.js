import React from "react";
import Layout from "@theme/Layout";
import Chatbot from "@site/src/components/Chatbot";

export default function ChatbotPage() {
  return (
    <Layout title="Chatbot">
      <div style={{ padding: "40px 20px" }}>
        <h1>🤖 AI Chatbot</h1>
        <p>Apne sawaal yahan likhein, chatbot aapko jawab dega.</p>
        <Chatbot />
      </div>
    </Layout>
  );
}
