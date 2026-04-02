import React, { useState } from 'react';
import Login from './pages/Login';

function App() {
  const [isLogin, setIsLogin] = useState(false);

  return (
    <>
      {isLogin ? (
        <h1 style={{ textAlign: 'center', marginTop: '100px' }}>
          Welcome to Dashboard 🎉
        </h1>
      ) : (
        <Login onLogin={() => setIsLogin(true)} />
      )}
    </>
  );
}

export default App;