import { createClient } from '@supabase/supabase-js'

// เอาค่ามาจากหน้า Dashboard ของ Supabase (Project Settings > API)
const supabaseUrl = 'https://wgbilymvzgqluaklddhu.supabase.co'
const supabaseKey = 'sb_publishable_9FNq8cdoRiFSNWUd9m3nrA_u0jKxapR'

export const supabase = createClient(supabaseUrl, supabaseKey)