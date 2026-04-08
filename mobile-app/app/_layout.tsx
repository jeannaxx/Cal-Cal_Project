//หน้าควบคุมหลัก โครงส่ร้างบ้านที่ควบคุมทุกห้อง  หน้าไหนมีเเถบ หน้าไหนจอว่าง
//ไม่ต้องแก้บ่อย แต่ต้องมีเพื่อให้ระบบรู้ว่ามีหน้าอะไรบ้างในบ้านหลังนี้
//จัดอันดับหน้ ตรงนี้ ว่าหน้าไหนไปหน้าไหน 
import { Stack } from 'expo-router';

export default function OnboardingLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
        contentStyle: { backgroundColor: '#fff5f7' },
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="info" />
      <Stack.Screen name="activity" />
      <Stack.Screen name="result" />
      <Stack.Screen name="confirm" />
      <Stack.Screen name="done" />
    </Stack>
  );
}