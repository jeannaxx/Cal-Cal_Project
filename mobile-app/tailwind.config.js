/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./component/**/*.{js,jsx,ts,tsx}", // ให้ครอบคลุมโฟลเดอร์ไฟล์ของคุณ
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}