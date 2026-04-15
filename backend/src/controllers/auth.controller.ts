import { Request, Response } from 'express'
import { supabase } from '../supabaseClient'

// Register
export const register = async (req: Request, res: Response) => {
  const { email, password, username } = req.body

  const { data, error } = await supabase.auth.admin.createUser({
    email,
    password,
    user_metadata: { username },
  })

  if (error) return res.status(400).json({ error: error.message })

  // บันทึก profile ลง table users
  await supabase.from('users').insert({
    id: data.user.id,
    email,
    username,
  })

  return res.status(201).json({ message: 'สมัครสมาชิกสำเร็จ', user: data.user })
}

// Login
export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) return res.status(401).json({ error: error.message })

  return res.status(200).json({
    message: 'เข้าสู่ระบบสำเร็จ',
    session: data.session,   // มี access_token อยู่ตรงนี้
    user: data.user,
  })
}

// Get user profile
export const getProfile = async (req: Request, res: Response) => {
  const userId = (req as any).userId  // มาจาก auth middleware

  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', userId)
    .single()

  if (error) return res.status(404).json({ error: 'ไม่พบผู้ใช้' })

  return res.status(200).json(data)
}