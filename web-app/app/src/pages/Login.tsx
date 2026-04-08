import { useState } from "react";
import { useNavigate } from "react-router-dom";
import girlImg from "../assets/Good.png";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (username === "notfat" && password === "9999") {
      navigate("/dashboard");
    } else {
      alert("ข้อมูลไม่ถูกต้อง");
    }
  };

  return (
    <div className="flex h-screen bg-gradient-to-r from-pink-100 to-pink-200">

      {/* LEFT */}
      <div className="w-1/2 flex items-center justify-center">
        <img
          src={girlImg}
          className="w-[95%] max-w-none drop-shadow-2xl"
        />
      </div>

      {/* RIGHT */}
      <div className="w-1/2 flex items-center justify-center">

        <div className="bg-white p-14 rounded-3xl shadow-2xl w-[500px]">

          <h2 className="text-3xl font-bold text-center text-gray-700 mb-3">
            Admin Login
          </h2>

          <p className="text-base text-gray-400 text-center mb-8">
            สำหรับผู้ดูแลระบบเท่านั้น
          </p>

          <input
            type="text"
            placeholder="Username"
            className="w-full p-4 text-lg mb-5 border rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-300"
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full p-4 text-lg mb-6 border rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-300"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            onClick={handleLogin}
            className="w-full py-4 text-lg rounded-xl bg-pink-400 text-white hover:bg-pink-500 transition"
          >
            เข้าสู่ระบบ
          </button>

        </div>

      </div>
    </div>
  );
}