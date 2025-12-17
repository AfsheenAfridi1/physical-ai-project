import React from "react";
import Layout from "@theme/Layout";

export default function SpecKit() {
  return (
    <Layout title="Spec-Kit Plus" description="Spec-Kit Plus Architecture">
      <div style={{ padding: "3rem", maxWidth: "900px", margin: "auto" }}>
        <h1>🧠 Spec-Kit Plus Architecture</h1>

        <p>
          This project uses <b>Spec-Kit Plus methodology</b> to build a scalable,
          reusable, and intelligent Physical AI learning system.
        </p>

        <hr />

        <h2>📌 Problem Statement</h2>
        <p>
          Traditional chatbots hallucinate. Our goal was to build a
          <b> book-grounded RAG system</b> that:
        </p>
        <ul>
          <li>Answers only from course content</li>
          <li>Is reusable across chapters</li>
          <li>Can be extended with authentication & personalization</li>
        </ul>

        <h2>🧩 Spec-Kit Components</h2>
        <ul>
          <li><b>Specification Layer</b>: Book chapters (Docusaurus docs)</li>
          <li><b>Knowledge Layer</b>: Qdrant vector database</li>
          <li><b>Reasoning Layer</b>: Gemini LLM</li>
          <li><b>Interface Layer</b>: Chat UI inside Docusaurus</li>
        </ul>

        <h2>🔁 Reusable Intelligence</h2>
        <p>
          Each chapter is chunked, embedded, and stored once.  
          The same intelligence is reused for:
        </p>
        <ul>
          <li>Chatbot Q&A</li>
          <li>Future quizzes</li>
          <li>Personalized learning paths</li>
        </ul>

        <h2>🤖 Claude-Style Sub-Agents (Conceptual)</h2>
        <ul>
          <li><b>Retriever Agent</b>: Fetches relevant chunks from Qdrant</li>
          <li><b>Answer Agent</b>: Generates grounded response</li>
          <li><b>Guard Agent</b>: Prevents hallucinations</li>
        </ul>

        <h2>✅ Why This Wins</h2>
        <ul>
          <li>No hallucination</li>
          <li>Spec-driven</li>
          <li>Extensible to auth & personalization</li>
          <li>Real RAG (not fake)</li>
        </ul>

        <p><b>✔ Built for GIAIC Hackathon</b></p>
      </div>
    </Layout>
  );
}
