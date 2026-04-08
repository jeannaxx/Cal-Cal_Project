//  ← ช่องกรอกข้อมูล (reusable)
import React from 'react'

type Variant = 'pink' | 'green' | 'white' | 'google' | 'facebook'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  children: React.ReactNode
}

const variantStyles: Record<Variant, string> = {
  pink:     'bg-pink-400 hover:bg-pink-500 text-white shadow-md',
  green:    'bg-green-400 hover:bg-green-500 text-white shadow-md',
  white:    'bg-white hover:bg-pink-50 text-pink-400 border border-pink-300 shadow-md',
  google:   'bg-white hover:bg-gray-50 text-gray-600 border border-gray-200 shadow-sm',
  facebook: 'bg-blue-600 hover:bg-blue-700 text-white shadow-sm',
}

export default function Button({ variant = 'pink', children, className = '', ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className={`w-full font-semibold py-2 rounded-full text-sm flex items-center justify-center gap-2 transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 ${variantStyles[variant]} ${className}`}
    >
      {children}
    </button>
  )
}