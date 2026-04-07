import { useNavigate } from "react-router-dom"
import catImg from "../assets/ม้วนเสือ.png"

export default function Login() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-pink-100 flex items-center justify-center">
      
      <div className="bg-white w-[350px] rounded-2xl shadow-md p-6 flex flex-col items-center">
        
        <h1 className="text-lg font-semibold mb-4">Cel-Cel Website</h1>

        <img src={catImg} className="w-32 mb-4" />

        <input
          type="email"
          placeholder="Email"
          className="w-full border-b border-gray-300 mb-3 py-2 text-sm outline-none focus:border-pink-400"
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border-b border-gray-300 mb-4 py-2 text-sm outline-none focus:border-pink-400"
        />

        <button
          onClick={() => navigate("/home")}
          className="w-full bg-pink-400 text-white py-2 rounded-full text-sm font-semibold hover:bg-pink-500"
        >
          เข้าสู่ระบบ
        </button>

        <p className="text-xs text-gray-400 mt-4 text-center">
          ยังไม่มีบัญชี?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-pink-400 cursor-pointer"
          >
            สมัครสมาชิก
          </span>
        </p>
      </div>
    </div>
  )
}