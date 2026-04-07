//หน้าควบคุมหลัก โครงส่ร้างบ้านที่ควบคุมทุกห้อง  หน้าไหนมีเเถบ หน้าไหนจอว่าง
//ไม่ต้องแก้บ่อย แต่ต้องมีเพื่อให้ระบบรู้ว่ามีหน้าอะไรบ้างในบ้านหลังนี้
//จัดอันดับหน้ ตรงนี้ ว่าหน้าไหนไปหน้าไหน 
import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="introduce" />
      <Stack.Screen name="(auth)" />
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}