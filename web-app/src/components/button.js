import React from 'react';

export default function Button({ title, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        backgroundColor: '#ff6b9a',
        padding: '12px',
        borderRadius: '10px',
        color: '#fff',
        border: 'none',
        cursor: 'pointer',
        width: '100%',
        marginTop: '10px'
      }}
    >
      {title}
    </button>
  );
}