import { useNavigate } from 'react-router-dom'
import matImg from '../assets/ม้วนเสื่อ.png'

export default function Home() {
  const navigate = useNavigate()
  return (
    <div className="min-h-screen bg-pink-200 flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold mb-4 tracking-widest">Cel-Cel  Website</h1>
      <img src={matImg} alt="character" className="w-40 h-40 object-contain mb-6" />
      <button
        onClick={() => navigate('/login')}
        className="bg-pink-400 text-white px-10 py-2 rounded-full font-semibold hover:bg-pink-500 transition"
      >
        เข้าสู่ระบบ
      </button>
    </div>
  )
}