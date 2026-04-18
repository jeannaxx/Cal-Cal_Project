import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import foodRoutes from './routes/foodRoutes'; 
// ตรวจสอบว่าไฟล์ foodLogRoutes.ts อยู่ในโฟลเดอร์ src หรือ src/routes
// ถ้าอยู่ใน src/routes ให้แก้เป็น './routes/foodLogRoutes'
import foodLogRoutes from './foodLogRoutes'; 
import { MOCK_ARTICLES } from './data';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors()); //อนุญาติให้Frontend ดึงข้อมูล 
app.use(express.json());

//Api สำหรับดึวบทความทั้วหมด
app.get('/api/articles', (req: Request, res: Response) => {
  console.log("GET /api/articles called"); // เพิ่ม Log เพื่อเช็คว่ามีการเรียกมาจริงไหม
  res.json(MOCK_ARTICLES);
});

// API สำหรับดึงบทความตาม ID (เผื่อทำหน้ารายละเอียด)
app.get('/api/articles/:id', (req: Request, res: Response) => {
  // แปลง req.params.id เป็นตัวเลขหาก id ใน MOCK_ARTICLES เป็นตัวเลข
  const article = MOCK_ARTICLES.find(a => String(a.id) === req.params.id);
  if (article) {
    res.json(article);
  } else {
    res.status(404).json({ message: 'ไม่พบบทความ' });
  }
});

//  ใช้งาน Routes
app.use('/api/foods', foodRoutes);
app.use('/api/food-logs', foodLogRoutes);



//Port
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});