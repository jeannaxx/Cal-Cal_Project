import { supabase } from './supabase';

/**
 * ฟังก์ชันสำหรับออกจากระบบ
 */
export const logout = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error('Error logging out:', error.message);
    return { success: false, error };
  }
  return { success: true };
};

/**
 * ฟังก์ชันสำหรับเข้าสู่ระบบ
 */
export const login = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  return { data, error };
};

/**
 * ฟังก์ชันสำหรับสมัครสมาชิก
 */
export const register = async (email: string, password: string, displayName: string) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { display_name: displayName },
    },
  });
  return { data, error };
};

/**
 * ฟังก์ชันสำหรับส่งอีเมลรีเซ็ตรหัสผ่าน
 */
export const sendResetPasswordEmail = async (email: string, redirectTo: string) => {
  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo,
  });
  if (error) {
    console.error('Error sending reset email:', error.message);
    return { success: false, error };
  }
  return { success: true, data };
};

/**
 * ฟังก์ชันสำหรับอัปเดตรหัสผ่านใหม่
 */
export const updatePassword = async (password: string) => {
  const { data, error } = await supabase.auth.updateUser({ password });
  return { data, error };
};