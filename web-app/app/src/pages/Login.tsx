import { useState } from "react";
import { useNavigate } from "react-router-dom";
import girlImg from "../assets/welcome.png";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (username === "admin" && password === "1234") {
      navigate("/admin-dashboard");
    } else {
      alert("ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง");
    }
  };

  return (
    <div className="flex h-screen bg-pink-100">

      {/* LEFT (รูปเหมือนเดิม) */}
      <div className="w-1/2 flex items-center justify-center">
        <img src={girlImg} alt="admin" className="w-3/4" />
      </div>

      {/* RIGHT */}
      <div className="w-1/2 flex flex-col justify-center items-center">
        <h1 className="text-3xl font-bold mb-2">
          Admin Panel
        </h1>

        <p className="text-gray-500 mb-6">
          เข้าสู่ระบบสำหรับผู้ดูแลระบบ
        </p>

        <input
          type="text"
          placeholder="Admin Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="mb-3 px-4 py-2 rounded-lg border w-64"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-4 px-4 py-2 rounded-lg border w-64"
        />

        <button
          onClick={handleLogin}
          className="bg-pink-500 text-white px-6 py-2 rounded-full"
        >
          Login
        </button>
      </div>
    </div>
  );
}