//ใช้ Input+ Button
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Input from '../component/Input'
import Button from '../component/Button'
import girlImg from '../assets/Good.png' 

export default function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

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
          Cel-Cel  Website
        </h1>

        {/* Inputs */}
        <div className="w-full max-w-sm space-y-4">
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <div className="relative">
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <button className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-pink-400 hover:text-pink-500 whitespace-nowrap">
              forget password?
            </button>
          </div>
        </div>

        {/* Buttons */}
        <div className="w-full max-w-sm space-y-3 mt-1">
          <Button variant="green">เข้าสู่ระบบ</Button>

          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-gray-300" />
            <span className="text-gray-400 text-sm">หรือ</span>
            <div className="flex-1 h-px bg-gray-300" />
          </div>

          <Button variant="google">
            <GoogleIcon /> เข้าสู่ระบบด้วย Google
          </Button>
          <Button variant="facebook">
            <FacebookIcon /> เข้าสู่ระบบด้วย Facebook
          </Button>
          <Button variant="pink" onClick={() => navigate('/register')}>
            สร้างบัญชี
          </Button>
        </div>

        <p className="text-xs text-gray-400 text-center leading-relaxed mt-1">
          เมื่อคุณกดปุ่มลงชื่อเข้าใช้เท่ากับว่าคุณได้อ่านและยอมรับ<br />
          <span className="text-pink-400 underline cursor-pointer">นโยบายความเป็นส่วนตัว</span>
          และ<span className="text-pink-400 underline cursor-pointer">เงื่อนไขการใช้บริการ</span>
        </p>
      </div>

    </div>
  )
}

function GoogleIcon() {
  return (
    <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
    </svg>
  )
}

function FacebookIcon() {
  return (
    <svg className="w-4 h-4 fill-white shrink-0" viewBox="0 0 24 24">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  )
}