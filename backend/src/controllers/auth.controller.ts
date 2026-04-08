import { Request, Response } from 'express';
import { prisma, supabase } from '../index';
import { PrismaClient } from '../../generated/prisma'; // แก้ตรงนี้
// ─── Register ───────────────────────────────────────────
export const register = async (req: Request, res: Response) => {
  const { email, password, userName } = req.body;

  // validate
  if (!email || !password) {
    return res.status(400).json({ message: 'กรุณากรอก email และ password' });
  }

  try {
    // 1. สร้าง user ใน Supabase Auth
    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true, // ไม่ต้องยืนยัน email
    });

    if (error) throw error;

    // 2. บันทึก profile ลง Prisma (PostgreSQL)
    const user = await prisma.user.create({
      data: {
        user_Id: data.user.id, // ใช้ id เดียวกับ Supabase Auth
        email,
        userName: userName ?? null,
        password: '',   // Supabase จัดการ password เอง ไม่เก็บซ้ำ
        gender: '',
        age: 0,
        weight: 0,
        height: 0,
        targetWeight: 0,
        planType: '',
        weeklyGoal: 0,
        calculatedCal: 0,
      },
    });

    return res.status(201).json({
      message: 'สมัครสมาชิกสำเร็จ',
      user: {
        id: user.user_Id,
        email: user.email,
        userName: user.userName,
      },
    });

  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
};

// ─── Login ───────────────────────────────────────────────
export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'กรุณากรอก email และ password' });
  }

  try {
    // 1. login ผ่าน Supabase Auth → ได้ JWT token กลับมา
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;

    // 2. ดึง profile จาก Prisma
    const profile = await prisma.user.findUnique({
      where: { user_Id: data.user.id },
    });

    return res.status(200).json({
      message: 'เข้าสู่ระบบสำเร็จ',
      token: data.session.access_token,   // ส่ง JWT กลับไปให้ mobile
      user: profile,
    });

  } catch (err: any) {
    return res.status(401).json({ message: 'อีเมลหรือรหัสผ่านไม่ถูกต้อง' });
  }
};