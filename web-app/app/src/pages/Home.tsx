//ใช้ Button
import { useNavigate } from 'react-router-dom'
import Button from '../component/Button'
import girlImg from '../assets/Welcome.png'

export default function Home() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen w-full bg-pink-100 flex flex-col md:flex-row">

      {/* ซ้าย — รูปภาพ */}
      <div className="flex-1 flex items-end justify-center min-h-[300px] md:min-h-screen overflow-hidden">
        <img
          src={girlImg}
          alt="cute girl"
          className="w-full h-full object-contain object-bottom max-h-[80vh] md:max-h-full"
        />
      </div>

      {/* ขวา — content */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 md:px-16 py-10 gap-5">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-700 tracking-wide text-center">
          Cal-Cal Website
        </h1>
        <p className="text-sm text-gray-400 text-center leading-relaxed">
          เว็บไซต์สำหรับดูแลสุขภาพ<br />และติดตามความก้าวหน้าของคุณทุกวัน
        </p>
        <div className="w-full max-w-xs flex flex-col gap-3 mt-2">
          <Button variant="pink" onClick={() => navigate('/login')}>เข้าสู่ระบบ</Button>
        </div>
      </div>

    </div>
  )
}