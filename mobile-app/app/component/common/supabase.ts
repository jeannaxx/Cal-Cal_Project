import { createClient } from '@supabase/supabase-js'

// เอาค่ามาจากหน้า Dashboard ของ Supabase (Project Settings > API)
const supabaseUrl = 'https://gpjtjqijgktqsglzekcl.supabase.co'
const supabaseKey = 'sb_publishable_zelOMLnTFqOGk3eXEG4qPw_AaKgLJV-'

export const supabase = createClient(supabaseUrl, supabaseKey)