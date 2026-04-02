import React, { useState } from 'react';
import Input from '../components/Input';
import Button from '../components/Button';

export default function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (username === 'admin' && password === '1234') {
      onLogin();
    } else {
      alert('Username หรือ Password ไม่ถูกต้อง');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.box}>
        <h2 style={styles.title}>Admin Login</h2>

        <Input
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <Input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button title="Login" onClick={handleLogin} />
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    background: '#ffe4ec'
  },
  box: {
    background: '#fff',
    padding: '30px',
    borderRadius: '20px',
    width: '320px',
    textAlign: 'center'
  },
  title: {
    color: '#ff6b9a'
  }
};