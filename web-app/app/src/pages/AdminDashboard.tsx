import { useState } from "react";

export default function AdminDashboard() {
  const [filterMeal, setFilterMeal] = useState("all");

  const [foods, setFoods] = useState([
    { name: "ข้าวผัด", calories: 500, meal: "lunch" },
    { name: "ไข่ต้ม", calories: 150, meal: "breakfast" },
  ]);

  const [newFood, setNewFood] = useState("");
  const [newCal, setNewCal] = useState("");
  const [meal, setMeal] = useState("breakfast");

  const deleteFood = (index: number) => {
    const updated = [...foods];
    updated.splice(index, 1);
    setFoods(updated);
  };

  const addFood = () => {
    if (!newFood || !newCal) return;

    setFoods([
      ...foods,
      { name: newFood, calories: Number(newCal), meal },
    ]);

    setNewFood("");
    setNewCal("");
  };

  const editFood = (index: number) => {
    const f = foods[index];

    const newName = prompt("แก้ชื่ออาหาร", f.name);
    const newCalories = prompt("แก้แคลอรี่", String(f.calories));

    if (!newName || !newCalories) return;

    const updated = [...foods];
    updated[index] = {
      ...f,
      name: newName,
      calories: Number(newCalories),
    };

    setFoods(updated);
  };

  return (
    <div className="flex min-h-screen bg-pink-50">

      {/* SIDEBAR */}
      <div className="w-64 bg-pink-200 p-6">
        <h2 className="text-2xl font-bold mb-6">Admin</h2>

        <ul className="space-y-4">
          <li className="cursor-pointer">🍔 Foods</li>
        </ul>
      </div>

      {/* MAIN */}
      <div className="flex-1 p-10 relative">

        {/* LOGOUT */}
        <button
          onClick={() => (window.location.href = "/login")}
          className="absolute top-5 right-5 bg-pink-400 text-white px-4 py-2 rounded"
        >
          Logout
        </button>

        <h1 className="text-2xl font-bold mb-4">Food Management</h1>

        {/* ADD */}
        <div className="flex gap-2 mb-4">
          <input
            placeholder="Food name"
            value={newFood}
            onChange={(e) => setNewFood(e.target.value)}
            className="border px-2 py-1"
          />

          <input
            placeholder="Calories"
            value={newCal}
            onChange={(e) => setNewCal(e.target.value)}
            className="border px-2 py-1"
          />

          <select
            value={meal}
            onChange={(e) => setMeal(e.target.value)}
            className="border px-2 py-1"
          >
            <option value="breakfast">เช้า</option>
            <option value="lunch">กลางวัน</option>
            <option value="dinner">เย็น</option>
            <option value="snack">ของว่าง</option>
          </select>

          <button
            onClick={addFood}
            className="bg-green-400 text-white px-3 rounded"
          >
            Add
          </button>
        </div>

        {/* FILTER */}
        <div className="flex gap-2 mb-4">
          <button onClick={() => setFilterMeal("all")} className="bg-gray-300 px-3 py-1 rounded">ทั้งหมด</button>
          <button onClick={() => setFilterMeal("breakfast")} className="bg-yellow-300 px-3 py-1 rounded">เช้า</button>
          <button onClick={() => setFilterMeal("lunch")} className="bg-green-300 px-3 py-1 rounded">กลางวัน</button>
          <button onClick={() => setFilterMeal("dinner")} className="bg-blue-300 px-3 py-1 rounded">เย็น</button>
          <button onClick={() => setFilterMeal("snack")} className="bg-pink-300 px-3 py-1 rounded">ของว่าง</button>
        </div>

        {/* TABLE */}
        <table className="w-full bg-white rounded shadow">
          <thead>
            <tr className="border-b">
              <th>Food</th>
              <th>Calories</th>
              <th>Meal</th>
              <th className="text-right pr-2">Action</th>
            </tr>
          </thead>

          <tbody>
            {foods
              .filter(f => filterMeal === "all" || f.meal === filterMeal)
              .map((f, index) => (
                <tr key={index} className="border-b">
                  <td>{f.name}</td>
                  <td>{f.calories} kcal</td>
                  <td>{f.meal}</td>

                  {/* 🔥 ACTION ชิดขวา */}
                  <td className="flex justify-end gap-2 pr-2">
                    <button
                      onClick={() => editFood(index)}
                      className="bg-blue-400 text-white px-2 py-1 rounded"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => deleteFood(index)}
                      className="bg-red-400 text-white px-2 py-1 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}