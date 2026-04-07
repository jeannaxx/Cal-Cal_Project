//ตัวขึ้นหน้าโมบาย ตัวหลัก
import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import { View } from 'react-native';

import { Redirect } from 'expo-router';

export default function Index() {
  return <Redirect href={'/introduce' as any} />;
}