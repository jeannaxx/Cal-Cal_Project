//หน้าโชว์เว็บ ที่เป้นเเม่พิมพ์ ที่ใช่ให้โดนดึง หน้าดึง




import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from "./pages/Dashboard";


export default function App() {
 return (
   <Routes>
     <Route path="/"         element={<Home />} />
     <Route path="/login"    element={<Login />} />
     <Route path="/register" element={<Register />} />
    <Route path="/dashboard" element={<Dashboard />} />
   </Routes>
 )
}
