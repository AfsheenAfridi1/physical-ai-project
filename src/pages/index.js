import React from "react";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";

export default function Home() {
  return (
    <Layout title="Physical AI Book">
      <main
        style={{
          minHeight: "70vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
          color: "white",
          textAlign: "center",
          padding: "40px",
        }}
      >
        <h1 style={{ fontSize: "3rem", marginBottom: "10px" }}>
          📘 Physical AI & Humanoid Robotics
        </h1>

        <p style={{ maxWidth: "700px", fontSize: "1.2rem", opacity: 0.9 }}>
          An interactive AI-powered textbook with summaries, quizzes,
          and a smart chatbot for learning Physical AI.
        </p>

        <div style={{ marginTop: "10px", display: "flex", gap: "10px" }}>
          <Link
            to="/docs/intro"
          >
            <button className="btn btn--primary">
              📚 Read Chapters
            </button>
          </Link>

          <Link 
          to="/chat">
      <button className="btn btn-primary">
         🤖 Open Chatbot
       </button>
      </Link>
        </div>

        <p style={{ marginTop: "40px", opacity: 0.7 }}>
          Made by <strong>Afsheen Afridi</strong>
        </p>
      </main>
    </Layout>
  );
}
