import React, { useState } from 'react';

export default function Dashboard() {
  const [page, setPage] = useState('dashboard');

  return (
    <div style={styles.container}>
      
      {/* Sidebar */}
      <div style={styles.sidebar}>
        <h2>Admin</h2>

        <p style={styles.menu} onClick={() => setPage('dashboard')}>
          Dashboard
        </p>

        <p style={styles.menu} onClick={() => setPage('food')}>
          Food
        </p>
      </div>

      {/* Content */}
      <div style={styles.content}>
        {page === 'dashboard' && (
          <>
            <h1>Welcome 🎉</h1>
            <p>นี่คือหน้า Dashboard</p>
          </>
        )}

        {page === 'food' && (
          <>
            <h1>Food Page 🍱</h1>
            <p>เดี๋ยวเราจะทำหน้านี้ต่อ</p>
          </>
        )}
      </div>

    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    height: '100vh'
  },
  sidebar: {
    width: '220px',
    background: '#ff6b9a',
    color: '#fff',
    padding: '20px'
  },
  menu: {
    marginTop: '20px',
    cursor: 'pointer'
  },
  content: {
    flex: 1,
    padding: '30px'
  }
};