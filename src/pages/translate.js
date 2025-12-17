import React, { useState } from "react";
import Layout from "@theme/Layout";

export default function Translate() {
  const [text, setText] = useState("");
  const [urdu, setUrdu] = useState("");

  async function translate() {
    const res = await fetch("http://127.0.0.1:8000/ask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: `Translate this to Urdu: ${text}`,
      }),
    });

    const data = await res.json();
    setUrdu(data.answer);
  }

  return (
    <Layout title="Urdu Translate">
      <textarea onChange={(e) => setText(e.target.value)} />
      <button onClick={translate}>Translate</button>
      <p>{urdu}</p>
    </Layout>
  );
}
