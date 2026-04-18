import { useNavigate } from "react-router-dom";
import girlImg from "../assets/welcome.png";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="flex h-screen bg-pink-100">

      {/* LEFT - รูป */}
      <div className="w-1/2 flex items-center justify-center">
        <img src={girlImg} alt="girl" className="w-[80%]" />
      </div>

      {/* RIGHT - content */}
      <div className="w-1/2 flex flex-col items-center justify-center">

        <h1 className="text-3xl font-bold mb-2">Cal-Cal Website</h1>

        <p className="text-gray-500 text-center mb-6">
          เว็บไซต์สำหรับดูแลสุขภาพ <br />
          และติดตามความก้าวหน้าของคุณทุกวัน
        </p>

        {/* ปุ่ม */}
        <div className="flex flex-col gap-4 w-60">

          <button
            onClick={() => navigate("/login")}
            className="bg-pink-500 text-white py-2 rounded-full"
          >
            เข้าสู่ระบบ
          </button>

          <button
            onClick={() => navigate("/register")}
            className="bg-white text-pink-500 border border-pink-300 py-2 rounded-full"
          >
            สมัครสมาชิก
          </button>

        </div>

      </div>
    </div>
  );
}