// ใช้ Input + Button
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Input from '../component/Input'
import Button from '../component/Button'
import girlImg from '../assets/Lesgo.png' 
export default function Register() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ username: '', email: '', password: '', confirm: '' })
  const update = (k: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm(prev => ({ ...prev, [k]: e.target.value }))

  return (
    <div className="min-h-screen w-full bg-pink-100 flex flex-col md:flex-row">

      {/* ซ้าย — รูปภาพ */}
      <div className="flex-1 flex items-end justify-center min-h-[260px] md:min-h-screen overflow-hidden">
        <img
          src={girlImg}
          alt="cute girl"
          className="w-full h-full object-contain object-bottom max-h-[60vh] md:max-h-full"
        />
      </div>

      {/* ขวา — ฟอร์ม */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 md:px-16 py-10 gap-4">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-700 tracking-wide mb-1">
          Cal-Cal  Website
        </h1>

        {/* Inputs */}
        <div className="w-full max-w-sm space-y-4">
          <Input type="text"     placeholder="Username"         value={form.username} onChange={update('username')} />
          <Input type="email"    placeholder="Email"            value={form.email}    onChange={update('email')} />
          <Input type="password" placeholder="Password"         value={form.password} onChange={update('password')} />
          <Input type="password" placeholder="Confirm Password" value={form.confirm}  onChange={update('confirm')} />
        </div>

        {/* Buttons */}
        <div className="w-full max-w-sm space-y-3 mt-1">
          <Button variant="pink">สมัครสมาชิก</Button>
          <Button variant="white" onClick={() => navigate('/login')}>
            มีบัญชีแล้ว? เข้าสู่ระบบ
          </Button>
        </div>

        <p className="text-xs text-gray-400 text-center leading-relaxed mt-1">
          เมื่อคุณสมัครสมาชิก คุณได้ยืนยันว่าคุณอ่านและยอมรับ<br />
          <span className="text-pink-400 underline cursor-pointer">นโยบายความเป็นส่วนตัว</span>
          และ<span className="text-pink-400 underline cursor-pointer">เงื่อนไขการใช้บริการ</span>
        </p>
      </div>

    </div>
  )
}