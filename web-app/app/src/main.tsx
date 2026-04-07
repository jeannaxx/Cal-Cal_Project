//โชว์ทั้งหมดในนหน้านี้ ตัวหลักกก เรียกใช้ขึ้นเว็บ 

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './css/index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
