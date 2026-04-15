import axios from 'axios'
import { supabase } from '../lib/supabase'

const API_URL = process.env.EXPO_PUBLIC_API_URL

// Register ผ่าน backend
export const register = async (username: string, email: string, password: string) => {
  const res = await axios.post(`${API_URL}/api/auth/register`, {
    username, email, password,
  })
  return res.data
}

// Login ผ่าน backend
export const login = async (email: string, password: string) => {
  const res = await axios.post(`${API_URL}/api/auth/login`, { email, password })
  const { session } = res.data

  // เก็บ session ไว้ใน Supabase client ฝั่ง mobile ด้วย
  await supabase.auth.setSession(session)
  return res.data
}

// ดึง profile (ส่ง token ไปกับ header)
export const getProfile = async () => {
  const { data: { session } } = await supabase.auth.getSession()
  const token = session?.access_token

  const res = await axios.get(`${API_URL}/api/auth/profile`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  return res.data
}

// Logout
export const logout = async () => {
  await supabase.auth.signOut()
}