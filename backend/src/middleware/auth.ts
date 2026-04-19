import { Request, Response, NextFunction } from 'express';
import { supabase } from '../lib/supabase';

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'ต้องการ Token สำหรับการเข้าถึง' });
    }

    const token = authHeader.split(' ')[1];
    const { data: { user }, error } = await supabase.auth.getUser(token);

    if (error || !user) {
      return res.status(401).json({ error: 'Token ไม่ถูกต้องหรือหมดอายุ' });
    }

    req.user = user; // เก็บข้อมูล user ไว้ใช้ใน route ต่อไป
    next();
  } catch (err) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};
