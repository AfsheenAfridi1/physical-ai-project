import React, { useState } from "react";

export default function TranslateButton({ text }: { text: string }) {
  const [urdu, setUrdu] = useState("");
  const [loading, setLoading] = useState(false);

  async function translate() {
    setLoading(true);
    setUrdu("");

    const res = await fetch("http://127.0.0.1:8000/translate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });

    const data = await res.json();
    setUrdu(data.urdu);
    setLoading(false);
  }

  return (
    <div style={{ marginTop: "2rem" }}>
      <button
        onClick={translate}
        style={{
          background: "#22c55e",
          color: "black",
          padding: "10px 16px",
          borderRadius: "8px",
          fontWeight: "bold",
          border: "none",
          cursor: "pointer",
        }}
      >
        🇵🇰 Translate to Urdu
      </button>

      {loading && <p>⏳ Translating...</p>}

      {urdu && (
        <div
          style={{
            marginTop: "1rem",
            padding: "1rem",
            background: "#020617",
            border: "1px solid #334155",
            borderRadius: "8px",
            direction: "rtl",
            fontFamily: "Noto Nastaliq Urdu, serif",
          }}
        >
          {urdu}
        </div>
      )}
    </div>
  );
}
