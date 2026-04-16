import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ 
      headerShown: false,
      tabBarActiveTintColor: '#f472a0', 
      tabBarInactiveTintColor: '#888',
      tabBarStyle: { height: 80, paddingBottom: 10 } // ปรับความสูงแถบด้านล่าง
    }}>
      <Tabs.Screen name="index" options={{ 
        title: "หน้าหลัก",
        tabBarIcon: ({ color }) => <Ionicons name="home" size={27} color={color} /> 
      }} />
      <Tabs.Screen name="article" options={{ 
        title: "บทความ",
        tabBarIcon: ({ color }) => <Ionicons name="book" size={27} color={color} /> 
      }} />
      <Tabs.Screen name="walking" options={{ 
        title: "การเดิน",
        tabBarIcon: ({ color }) => <Ionicons name="walk" size={27} color={color} /> 
      }} />
      <Tabs.Screen name="exercise" options={{ 
        title: "ออกกำลังกาย",
        tabBarIcon: ({ color }) => <Ionicons name="fitness" size={27} color={color} /> 
      }} />
      <Tabs.Screen name="consultant" options={{ 
        title: "ที่ปรึกษา",
        tabBarIcon: ({ color }) => <Ionicons name="chatbubble-ellipses" size={27} color={color} /> 
      }} />
    </Tabs>
  );
}