import { useState } from "react";

type Food = {
  name: string;
  cal: number;
};

export default function Dashboard() {
  const [foods, setFoods] = useState<Food[]>([
    { name: "ข้าวมันไก่", cal: 600 },
    { name: "ส้มตำ", cal: 120 },
  ]);

  const [newFood, setNewFood] = useState("");
  const [newCal, setNewCal] = useState("");

  const addFood = () => {
    if (!newFood || !newCal) return;
    setFoods([...foods, { name: newFood, cal: Number(newCal) }]);
    setNewFood("");
    setNewCal("");
  };

  const deleteFood = (index: number) => {
    const updated = foods.filter((_, i) => i !== index);
    setFoods(updated);
  };

  return (
    <div className="min-h-screen bg-pink-100 p-10">

      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      {/* ADD FOOD */}
      <div className="bg-white p-6 rounded-xl shadow mb-6">
        <h2 className="text-xl mb-4">เพิ่มอาหาร</h2>

        <input
          placeholder="ชื่ออาหาร"
          className="border p-2 mr-2 rounded"
          value={newFood}
          onChange={(e) => setNewFood(e.target.value)}
        />

        <input
          placeholder="แคลอรี่"
          className="border p-2 mr-2 rounded"
          value={newCal}
          onChange={(e) => setNewCal(e.target.value)}
        />

        <button
          onClick={addFood}
          className="bg-pink-400 text-white px-4 py-2 rounded"
        >
          เพิ่ม
        </button>
      </div>

      {/* LIST */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl mb-4">รายการอาหาร</h2>

        {foods.map((food: Food, index: number) => (
          <div
            key={index}
            className="flex justify-between items-center mb-2 border-b pb-2"
          >
            <span>
              {food.name} - {food.cal} kcal
            </span>

            <button
              onClick={() => deleteFood(index)}
              className="bg-red-400 text-white px-3 py-1 rounded"
            >
              ลบ
            </button>
          </div>
        ))}
      </div>

    </div>
  );
}