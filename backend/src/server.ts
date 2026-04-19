import dotenv from 'dotenv';
dotenv.config(); // เรียกใช้เป็นลำดับแรกสุด

import express, { Request, Response } from 'express';
import cors from 'cors';
import os from 'os';
import { supabase } from './lib/supabase';
import authRoutes from './routes/auth';
import { authenticate } from './middleware/auth';

const app = express();

// ปรับ CORS ให้รองรับการเรียกจากมือถือได้กว้างขึ้น
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// เพิ่ม Middleware สำหรับเช็คว่ามี Request เข้ามาหรือไม่
app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`\n--- Incoming Request ---`);
  console.log(`Time: ${timestamp}`);
  console.log(`Method: ${req.method}`);
  console.log(`Path: ${req.url}`);
  console.log(`IP: ${req.ip}`);
  console.log(`Headers: ${JSON.stringify(req.headers['user-agent'])}`);
  console.log(`------------------------`);
  next();
});

// Health Check Endpoint สำหรับทดสอบการเชื่อมต่อจากมือถือ (ไม่ต้อง Login)
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', message: 'Backend is reachable!' });
});

// ใช้ Routes สำหรับ Auth (Register/Login)
app.use('/api/auth', authRoutes);

// --- Tasks & Categories ---
app.get('/api/tasks', authenticate, async (req: Request, res: Response) => {
  const { data, error } = await supabase
    .from('tasks')
    .select('*, categories(name, color)')
    .eq('user_id', req.user?.id)
    .order('created_at', { ascending: false });
  
  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
});

app.post('/api/tasks', authenticate, async (req: Request, res: Response) => {
  const { data, error } = await supabase
    .from('tasks')
    .insert([{ ...req.body, user_id: req.user?.id }])
    .select();
  
  if (error) return res.status(400).json({ error: error.message });
  res.status(201).json(data[0]);
});

// --- Meals & Nutrition ---
app.get('/api/meals', authenticate, async (req: Request, res: Response) => {
  const date = req.query.date || new Date().toISOString().split('T')[0];
  const { data, error } = await supabase
    .from('meals')
    .select('*, food_categories(name, icon)')
    .eq('user_id', req.user?.id)
    .eq('log_date', date);

  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
});

// --- Food Categories ---
app.get('/api/food-categories', async (req: Request, res: Response) => {
  const { data, error } = await supabase.from('food_categories').select('*');
  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
});

// --- Profile Management ---
app.get('/api/profiles/me', authenticate, async (req: Request, res: Response) => {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', req.user?.id)
    .single();

  if (error) {
    if (error.code === 'PGRST116') return res.status(404).json({ error: 'Profile not found' });
    return res.status(400).json({ error: error.message });
  }
  res.json(data);
});

app.post('/api/meals', authenticate, async (req: Request, res: Response) => {
  const { data, error } = await supabase
    .from('meals')
    .insert([{ ...req.body, user_id: req.user?.id }])
    .select();

  if (error) return res.status(400).json({ error: error.message });
  res.status(201).json(data[0]);
});

// --- Health Logs (Weight & Water) ---
app.get('/api/weight', authenticate, async (req: Request, res: Response) => {
  const { data, error } = await supabase
    .from('weight_logs')
    .select('*')
    .eq('user_id', req.user?.id)
    .order('log_date', { ascending: false })
    .limit(7); // ดึงข้อมูล 7 วันล่าสุด

  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
});

app.post('/api/weight', authenticate, async (req: Request, res: Response) => {
  const { weight, log_date } = req.body;
  const { data, error } = await supabase
    .from('weight_logs')
    .insert([{ weight, log_date, user_id: req.user?.id }])
    .select();

  if (error) return res.status(400).json({ error: error.message });
  res.json(data[0]);
});

app.get('/api/water', authenticate, async (req: Request, res: Response) => {
  const date = req.query.date || new Date().toISOString().split('T')[0];
  const { data, error } = await supabase
    .from('water_logs')
    .select('*')
    .eq('user_id', req.user?.id)
    .eq('log_date', date);

  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
});

app.post('/api/water', authenticate, async (req: Request, res: Response) => {
  const { amount_ml, log_date } = req.body;
  const { data, error } = await supabase
    .from('water_logs')
    .insert([{ amount_ml, log_date, user_id: req.user?.id }])
    .select();

  if (error) return res.status(400).json({ error: error.message });
  res.json(data[0]);
});

// --- Public Data (Articles) ---
app.get('/api/articles', async (req: Request, res: Response) => {
  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
});

// --- Profile Management ---
// ปรับให้เป็น /api/profiles/me ให้ตรงกับ GET และเรียกใช้งานได้ง่ายขึ้น
// เพิ่ม /api/profiles เป็น fallback กรณีมือถือเรียกผิด
app.put(['/api/profiles/me', '/api/profiles'], authenticate, async (req: Request, res: Response) => {
  console.log(`Updating profile for user: ${req.user?.id}, Data:`, req.body);
  
  // แยกข้อมูลออกมาเพื่อป้องกันการส่ง column ที่ไม่มีอยู่จริงเข้าไปใน Supabase
  const { 
    full_name, weight, height, age, gender, 
    activity_level, daily_calorie_goal, avatar_url,
    goal_weight, suggested_calories 
  } = req.body;

  const updateData: any = {
    updated_at: new Date().toISOString(),
  };

  // ตรวจสอบว่ามีค่าส่งมาจริงไหมก่อนจะใส่ใน object ที่จะ update
  if (full_name !== undefined) updateData.full_name = full_name;
  if (weight !== undefined) updateData.weight = weight;
  if (height !== undefined) updateData.height = height;
  if (age !== undefined) updateData.age = age;
  if (gender !== undefined) updateData.gender = gender;
  if (activity_level !== undefined) updateData.activity_level = activity_level;
    
    // แมป suggested_calories จากมือถือเข้า daily_calorie_goal ใน DB (ถ้ามี)
    if (daily_calorie_goal !== undefined) updateData.daily_calorie_goal = daily_calorie_goal;
    else if (suggested_calories !== undefined) updateData.daily_calorie_goal = suggested_calories;

    if (goal_weight !== undefined) updateData.goal_weight = goal_weight;
  if (avatar_url !== undefined) updateData.avatar_url = avatar_url;

  const { data, error } = await supabase
    .from('profiles')
    .upsert({
      id: req.user?.id, // ระบุ id เพื่อให้ Supabase รู้ว่าต้องจัดการที่แถวของใคร
      ...updateData
    })
    .select();

  if (error) {
    console.error('❌ Supabase Update Error:', error);
    // แจ้งเตือนกรณีลืมเพิ่ม column ใน Database
    if (error.message.includes('column') && error.message.includes('not found')) {
      return res.status(400).json({ error: `ไม่พบคอลัมน์ในฐานข้อมูล: ${error.message}. กรุณาตรวจสอบตาราง profiles ใน Supabase` });
    }
    return res.status(400).json({ error: error.message });
  }

  // ตรวจสอบว่ามีข้อมูลถูกอัปเดตจริงหรือไม่ เพื่อป้องกันการส่งค่า undefined กลับไป
  if (!data || data.length === 0) {
    return res.status(404).json({ error: 'ไม่พบข้อมูลโปรไฟล์ที่ต้องการอัปเดต' });
  }

  res.json(data[0]);
});

app.get('/api/me', authenticate, (req: Request, res: Response) => {
  res.json({ user: req.user });
});

// --- Catch-all 404 Route ---
// เพิ่มไว้ท้ายสุดของ Route ทั้งหมด เพื่อให้ส่ง JSON แทน HTML เมื่อหา Path ไม่เจอ
app.use((req, res) => {
  res.status(404).json({ 
    error: 'Not Found', 
    message: `Cannot ${req.method} ${req.url}`,
    suggestion: 'ตรวจสอบว่าใส่ /api นำหน้าและตัวสะกดถูกต้องหรือไม่'
  });
});

const PORT = Number(process.env.PORT) || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`\n🚀 Backend Server Started!`);
  console.log(`-----------------------------------------`);
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    for (const net of interfaces[name]!) {
      if (net.family === 'IPv4' && !net.internal) {
        console.log(`📡 Access via ${name}: http://${net.address}:${PORT}/api`);
      }
    }
  }
  console.log(`🏠 Local: http://localhost:${PORT}/api`);
  console.log(`-----------------------------------------\n`);
});
