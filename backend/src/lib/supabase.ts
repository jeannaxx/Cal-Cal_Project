import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL || '';
// แนะนำให้ใช้ SERVICE_ROLE_KEY ในฝั่ง Backend เพื่อข้ามข้อจำกัด RLS
// อย่าลืมเพิ่ม SUPABASE_SERVICE_ROLE_KEY ในไฟล์ .env ของคุณ
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseServiceKey);