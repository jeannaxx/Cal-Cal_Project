import { useState } from "react";
import { useNavigate } from "react-router-dom";
import girlImg from "../assets/welcome.png";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (email === "user@test.com" && password === "1234") {
      navigate("/dashboard");
    } else {
      alert("อีเมลหรือรหัสผ่านไม่ถูกต้อง");
    }
  };

  return (
    <div className="flex h-screen bg-gradient-to-r from-pink-100 to-pink-200">

      {/* LEFT - รูป */}
      <div className="w-1/2 flex items-center justify-center">
        <img src={girlImg} alt="girl" className="w-[80%] drop-shadow-xl" />
      </div>

      {/* RIGHT - กล่อง login */}
      <div className="w-1/2 flex items-center justify-center">

        <div className="bg-white/70 backdrop-blur-md p-10 rounded-3xl shadow-xl flex flex-col items-center">

          <h1 className="text-3xl font-bold text-pink-600 mb-2">
            เข้าสู่ระบบ
          </h1>

          <p className="text-gray-500 mb-6 text-center">
            ยินดีต้อนรับ กลับมาใช้งานอีกครั้ง 💖
          </p>

          {/* EMAIL */}
          <input
            type="email"
            placeholder="Email"
            className="w-72 px-4 py-2 mb-3 rounded-full border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-300"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* PASSWORD */}
          <input
            type="password"
            placeholder="Password"
            className="w-72 px-4 py-2 mb-4 rounded-full border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-300"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* BUTTON */}
          <button
            onClick={handleLogin}
            className="w-72 bg-pink-500 hover:bg-pink-600 text-white py-2 rounded-full transition duration-300 shadow-md"
          >
            เข้าสู่ระบบ
          </button>

          {/* REGISTER */}
          <p className="mt-4 text-sm">
            ยังไม่มีบัญชี?{" "}
            <span
              className="text-pink-500 font-semibold cursor-pointer hover:underline"
              onClick={() => navigate("/register")}
            >
              สมัครสมาชิก
            </span>
          </p>

        </div>

      </div>
    </div>
  );
}