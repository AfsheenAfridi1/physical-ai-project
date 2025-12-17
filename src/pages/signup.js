import React, { useState } from 'react';
import Layout from '@theme/Layout';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // backend deploy URL
  const BASE_URL = "https://physical-ai-project-production-ea74.up.railway.app";

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${BASE_URL}/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();
      alert("Signup successful!");

    } catch (err) {
      alert("Signup failed!");
      console.log(err);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${BASE_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      localStorage.setItem("token", data.token);
      alert("Login successful");
      window.location.href = '/chatbot';

    } catch (err) {
      alert("Login failed");
      console.log(err);
    }
  };

  return (
    <Layout title="Signup">
      <div style={styles.page}>
        <div style={styles.wrapper}>
          <div style={styles.card}>
            <h2 style={styles.title}>Signup</h2>

            <form onSubmit={handleSignup} style={styles.form}>
              <input
                style={styles.input}
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <input
                style={styles.input}
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <button style={styles.button}>Create Account</button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}

const styles = {
  page: {
    minHeight: '70vh',
    display: 'flex',
    justifyContent: 'center',
  },
  wrapper: {
    width: '100%',
    maxWidth: '480px',
    marginTop: '120px',
  },
  card: {
    background: '#020617',
    borderRadius: '14px',
    padding: '36px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.25)',
    color: '#fff',
  },
  title: {
    textAlign: 'center',
    marginBottom: '22px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  input: {
    padding: '12px',
    borderRadius: '8px',
    border: '1px solid #1e293b',
    background: '#020617',
    color: '#fff',
    fontSize: '15px',
  },
  button: {
    padding: '12px',
    borderRadius: '8px',
    border: 'none',
    background: '#22c55e',
    fontWeight: 'bold',
    fontSize: '15px',
    cursor: 'pointer',
  }
};
