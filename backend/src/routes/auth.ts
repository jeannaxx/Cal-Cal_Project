import { Router, Request, Response } from 'express';
import { supabase } from '../lib/supabase';

const router = Router();

// สมัครสมาชิก (Register)
router.post('/register', async (req: Request, res: Response) => {
  const { email, password, display_name, avatar_url } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      // ส่งข้อมูลไปยัง raw_user_meta_data เพื่อให้ Trigger ใน SQL ดึงไปใส่ตาราง profiles
      data: { 
        display_name: display_name || email.split('@')[0],
        avatar_url: avatar_url || null
      }
    }
  });

  if (error) return res.status(400).json({ error: error.message });
  return res.status(201).json({ message: 'ลงทะเบียนสำเร็จ!', user: data.user });
});

// เข้าสู่ระบบ (Login)
router.post('/login', async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error) return res.status(401).json({ error: error.message });
  return res.json({ message: 'Login สำเร็จ', session: data.session });
});

export default router;
