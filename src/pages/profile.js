import React, { useEffect } from 'react';
import Layout from '@theme/Layout';

export default function Profile() {
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      window.location.href = '/login';
    }
  }, []);

  return (
    <Layout title="Profile">
      <div style={styles.page}>
        <div style={styles.wrapper}>
          <div style={styles.card}>
            <h2 style={styles.title}>Profile</h2>
            <p style={styles.text}>You are logged in 🎉</p>

            <button
              style={styles.logout}
              onClick={() => {
                localStorage.removeItem('token');
                window.location.href = '/login';
              }}
            >
              Logout
            </button>
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
    textAlign: 'center',
  },
  title: {
    marginBottom: '14px',
  },
  text: {
    marginBottom: '20px',
    color: '#cbd5f5',
  },
  logout: {
    padding: '10px',
    borderRadius: '8px',
    border: 'none',
    background: '#ef4444',
    color: '#fff',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
};
