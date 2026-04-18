import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";

type Food = {
  id: number; // 🔥 ต้องมี
  name: string;
  cal: number;
  meal: string;
};

export default function Dashboard() {
  // 🔥 เริ่มเป็น array ว่าง (ไม่ใช้ mock แล้ว)
  const [foods, setFoods] = useState<Food[]>([]);

  const [name, setName] = useState("");
  const [cal, setCal] = useState("");
  const [meal, setMeal] = useState("breakfast");

  const [target, setTarget] = useState(1400);

  // 🔥 โหลดข้อมูลจาก DB ตอนเปิดหน้า
  useEffect(() => {
    fetchFoods();
  }, []);

  const fetchFoods = async () => {
    const { data, error } = await supabase.from("foods").select("*");

    if (error) {
      console.log(error);
    } else {
      setFoods(data || []);
    }
  };

  // 🔥 เพิ่มอาหาร → ลง DB จริง
  const addFood = async () => {
    if (!name || !cal) return;

    const { data, error } = await supabase
      .from("foods")
      .insert([{ name, cal: Number(cal), meal }])
      .select();

    if (error) {
      console.log(error);
    } else {
      setFoods([...foods, ...(data || [])]);
      setName("");
      setCal("");
    }
  };

  // 🔥 ลบอาหาร → ลบจาก DB จริง
  const deleteFood = async (id: number) => {
    const { error } = await supabase.from("foods").delete().eq("id", id);

    if (error) {
      console.log(error);
    } else {
      setFoods(foods.filter((f) => f.id !== id));
    }
  };

  const totalCal = foods.reduce((sum, f) => sum + f.cal, 0);
  const percent = target ? Math.min((totalCal / target) * 100, 100) : 0;

  const meals = ["breakfast", "lunch", "dinner", "snack"];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-pink-200 p-6">

      <h1 className="text-3xl font-bold text-pink-600 mb-6">
        Dashboard 💖
      </h1>

      <div className="bg-white/80 p-4 rounded-2xl shadow mb-4 flex items-center gap-3">
        <p>เป้าหมาย:</p>

        <input
          type="number"
          value={target || ""}
          onChange={(e) => setTarget(Number(e.target.value))}
          className="px-3 py-1 rounded-full border w-24"
        />

        <span>kcal</span>
      </div>

      {/* ➕ เพิ่มอาหาร */}
      <div className="bg-white/80 p-4 rounded-2xl shadow mb-4 flex gap-2 flex-wrap">
        <input
          placeholder="ชื่ออาหาร"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="px-3 py-2 rounded-full border"
        />

        <input
          placeholder="แคล"
          value={cal}
          onChange={(e) => setCal(e.target.value)}
          className="px-3 py-2 rounded-full border"
        />

        <select
          value={meal}
          onChange={(e) => setMeal(e.target.value)}
          className="px-3 py-2 rounded-full border"
        >
          <option value="breakfast">เช้า</option>
          <option value="lunch">กลางวัน</option>
          <option value="dinner">เย็น</option>
          <option value="snack">ของว่าง</option>
        </select>

        <button
          onClick={addFood}
          className="bg-pink-500 text-white px-4 rounded-full"
        >
          เพิ่ม
        </button>
      </div>

      {/* 🔥 แคลรวม */}
      <div className="bg-white/80 p-5 rounded-2xl shadow mb-4">
        <p className="mb-2">
          {totalCal} / {target} kcal
        </p>

        <div className="w-full bg-pink-100 rounded-full h-3">
          <div
            className="bg-pink-500 h-3 rounded-full"
            style={{ width: `${percent}%` }}
          />
        </div>
      </div>

      {/* 🍽 แยกมื้อ */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        {meals.map((m) => {
          const sum = foods
            .filter((f) => f.meal === m)
            .reduce((s, f) => s + f.cal, 0);

          return (
            <div key={m} className="bg-white/80 p-4 rounded-2xl shadow">
              <p className="font-semibold capitalize">{m}</p>
              <p>{sum} kcal</p>
            </div>
          );
        })}
      </div>

      {/* 📋 รายการ */}
      <div className="bg-white/80 p-5 rounded-2xl shadow">
        <h2 className="text-pink-500 font-semibold mb-2">
          รายการอาหาร
        </h2>

        {foods.map((f) => (
          <div
            key={f.id}
            className="flex justify-between items-center border-b py-2"
          >
            <span>{f.name}</span>

            <div className="flex gap-3 items-center">
              <span>{f.cal} kcal</span>

              <button
                onClick={() => deleteFood(f.id)}
                className="bg-pink-400 text-white px-3 py-1 rounded-full hover:bg-pink-500 text-sm"
              >
                delete
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}