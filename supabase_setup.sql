-- 1. ลบของเก่าออกก่อน (เพื่อความสะอาดและมั่นใจว่าโครงสร้างใหม่จะทำงานได้)
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user();
DROP TABLE IF EXISTS tasks CASCADE;
DROP TABLE IF EXISTS categories CASCADE;
DROP TABLE IF EXISTS meals CASCADE;
DROP TABLE IF EXISTS weight_logs CASCADE;
DROP TABLE IF EXISTS water_logs CASCADE;
DROP TABLE IF EXISTS food_categories CASCADE;
DROP TABLE IF EXISTS articles CASCADE;
DROP TABLE IF EXISTS profiles CASCADE;

-- 2. สร้างตาราง Profiles (เพิ่ม email เข้าไปแล้ว)
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  display_name TEXT,
  email TEXT,
  gender TEXT,
  age INTEGER,
  height FLOAT,
  weight FLOAT,
  goal_weight FLOAT,
  suggested_calories INTEGER,
  avatar_url TEXT,
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 3. สร้างตารางหมวดหมู่และงาน
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  color TEXT DEFAULT '#4F46E5',
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  description TEXT,
  is_completed BOOLEAN DEFAULT false,
  due_date TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 4. ระบบติดตามสุขภาพ
CREATE TABLE food_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  icon TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE meals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  food_category_id UUID REFERENCES food_categories(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  calories INTEGER DEFAULT 0,
  protein FLOAT DEFAULT 0,
  carbs FLOAT DEFAULT 0,
  fat FLOAT DEFAULT 0,
  meal_type TEXT, 
  log_date DATE DEFAULT CURRENT_DATE,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE weight_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  weight FLOAT NOT NULL,
  log_date DATE DEFAULT CURRENT_DATE,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE water_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  amount_ml INTEGER NOT NULL,
  log_date DATE DEFAULT CURRENT_DATE,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 5. บทความ
CREATE TABLE articles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  image_url TEXT,
  category TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 6. เปิดใช้งาน RLS และสร้าง Policies
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE food_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE meals ENABLE ROW LEVEL SECURITY;
ALTER TABLE weight_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE water_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Manage own profile" ON profiles FOR ALL USING (auth.uid() = id);
CREATE POLICY "Manage own categories" ON categories FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Manage own tasks" ON tasks FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Manage own meals" ON meals FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Manage own weight" ON weight_logs FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Manage own water" ON water_logs FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Public food categories" ON food_categories FOR SELECT USING (true);
CREATE POLICY "Public articles" ON articles FOR SELECT USING (true);

-- 7. ระบบ Automation Trigger (แก้ไขตัวดำเนินการ ->> เรียบร้อย)
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, display_name, email, avatar_url, updated_at)
  VALUES (new.id, new.raw_user_meta_data->>'display_name', new.email, new.raw_user_meta_data->>'avatar_url', now());
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();