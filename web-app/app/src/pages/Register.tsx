import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import matImg from '../assets/ม้วนเสื่อ.png'

export default function Register() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ username: '', email: '', password: '', confirm: '' })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value })

  const fields = [
    { name: 'username', placeholder: 'Username', type: 'text' },
    { name: 'email', placeholder: 'Email', type: 'email' },
    { name: 'password', placeholder: 'Password', type: 'password' },
    { name: 'confirm', placeholder: 'Confirm Password', type: 'password' },
  ]

  return (
    <div className="min-h-screen bg-pink-200 flex items-center justify-center">
      <div className="bg-pink-100 rounded-3xl p-8 w-80 flex flex-col items-center shadow-md">
        <h2 className="text-xl font-bold mb-2 tracking-widest">Cel-Cel  Website</h2>
        <img src={matImg} alt="character" className="w-36 mb-4" />

        {fields.map(f => (
          <input
            key={f.name}
            name={f.name}
            type={f.type}
            placeholder={f.placeholder}
            className="w-full bg-transparent border-b border-gray-400 mb-3 py-1 text-sm outline-none placeholder-gray-500 text-center"
            value={(form as any)[f.name]}
            onChange={handleChange}
          />
        ))}

        <button
          onClick={() => navigate('/login')}
          className="bg-pink-400 text-white w-full py-2 rounded-full text-sm font-semibold hover:bg-pink-500 transition mt-2"
        >
          สมัครสมาชิก
        </button>

        <p className="text-xs text-gray-400 text-center mt-4 leading-5">
          เนื่องจากคุณเชื่อว่าเราให้บริการที่ดีที่สุดในการดูแลสุขภาพ
          <br />
          <span className="text-pink-400 cursor-pointer">นโยบายความเป็นส่วนตัวและข้อกำหนดการใช้งาน</span>
        </p>
      </div>
    </div>
  )
}