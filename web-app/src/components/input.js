import React from 'react';

export default function Input({ placeholder, type = "text", value, onChange }) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      style={{
        width: '100%',
        padding: '12px',
        margin: '10px 0',
        borderRadius: '10px',
        border: '1px solid #ccc'
      }}
    />
  );
}