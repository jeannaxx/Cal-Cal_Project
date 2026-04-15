///← verify JWT จาก Supabase

import { Request, Response, NextFunction } from 'express'
import { supabase } from '../supabaseClient'

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'ไม่มี token' })
  }

  const token = authHeader.split(' ')[1]

  // ตรวจสอบ token กับ Supabase
  const { data, error } = await supabase.auth.getUser(token)

  if (error || !data.user) {
    return res.status(401).json({ error: 'Token ไม่ถูกต้อง' })
  }

  // แนบ userId ไปกับ request
  ;(req as any).userId = data.user.id
  next()
}