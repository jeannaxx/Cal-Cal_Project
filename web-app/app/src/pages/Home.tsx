import { useNavigate } from "react-router-dom";
import Button from "../component/Button";
import girlImg from "../assets/welcome.png";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="flex h-screen bg-pink-100">

      {/* LEFT */}
      <div className="w-1/2 flex items-center justify-center">
        <img
          src={girlImg}
          className="w-[65%] max-w-[400px]"
        />
      </div>

      {/* RIGHT */}
      <div className="w-1/2 flex flex-col items-center justify-center gap-4">

        <h1 className="text-3xl font-bold text-gray-700">
          Cal-Cal Website
        </h1>

        <p className="text-sm text-gray-500 text-center">
          เว็บไซต์สำหรับคำนวณแคลอรี่เพื่อสุขภาพของคุณ
        </p>

        <Button onClick={() => navigate("/login")}>
          Admin Login
        </Button>

        <Button onClick={() => navigate("/calculator")}>
          คำนวณแคล
       </Button>

      </div>
    </div>
  );
}