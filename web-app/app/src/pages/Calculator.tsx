import { useState } from "react";

export default function Calculator() {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("male");
  const [result, setResult] = useState<number | null>(null);

  const calculate = () => {
    const w = Number(weight);
    const h = Number(height);
    const a = Number(age);

    if (!w || !h || !a) return;

    let bmr = 0;

    if (gender === "male") {
      bmr = 10 * w + 6.25 * h - 5 * a + 5;
    } else {
      bmr = 10 * w + 6.25 * h - 5 * a - 161;
    }

    const tdee = bmr * 1.55; // activity level ปานกลาง

    setResult(Math.round(tdee));
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-pink-100 to-pink-200 flex items-center justify-center">

      <div className="bg-white p-10 rounded-2xl shadow-xl w-[450px]">

        <h1 className="text-2xl font-bold text-center mb-6 text-gray-700">
          คำนวณแคลอรี่ (BMR / TDEE)
        </h1>

        <input
          placeholder="น้ำหนัก (kg)"
          className="w-full p-3 mb-3 border rounded-lg"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
        />

        <input
          placeholder="ส่วนสูง (cm)"
          className="w-full p-3 mb-3 border rounded-lg"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
        />

        <input
          placeholder="อายุ"
          className="w-full p-3 mb-3 border rounded-lg"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />

        <select
          className="w-full p-3 mb-4 border rounded-lg"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
        >
          <option value="male">ชาย</option>
          <option value="female">หญิง</option>
        </select>


        {result && (
          <div className="mt-6 text-center">
            <p className="text-lg text-gray-600">พลังงานที่ควรได้รับต่อวัน</p>
            <p className="text-2xl font-bold text-pink-500">
              {result} kcal
            </p>
          </div>
        )}

      </div>
    </div>
  );
}