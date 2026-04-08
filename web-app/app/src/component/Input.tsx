//ปุ่มทุกแบบ (pink/green/white/google/facebook)
import React from 'react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
}

export default function Input({ label, className = '', ...props }: InputProps) {
  return (
    <div className="w-full">
      {label && <label className="block text-xs text-gray-500 mb-1 pl-2">{label}</label>}
      <input
        {...props}
        className={`w-full px-4 py-2 rounded-full border border-pink-200 bg-white text-gray-600 text-sm placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-transparent transition ${className}`}
      />
    </div>
  )
}