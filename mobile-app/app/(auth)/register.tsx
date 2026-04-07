//หนา้สมัครสมากชิก พวกหลาบๆช่องฌแพาะคนไม่มีในระบบ 
//หน้าสุดทา้ย
import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import TextFields from '../../app/component/ui/TextFields'; 

export default function RegisterScreen() {
  const router = useRouter();

  return (
    // SafeAreaView เเเต่เลิกใช้เเล้ว ช่วยให้เนื้อหาไม่จมไปกับรอยบากของหน้าจอมือถือ
    <SafeAreaView className="flex-1 bg-[#FDE2E4]"> 
      
      {/* ส่วนหัว ปุ่มย้อนกลับ */}
      <View className="flex-row items-center px-4 py-2">
        <TouchableOpacity 
          onPress={() => router.back()} 
          className="p-2 rounded-full active:bg-pink-200"
        >
          <Ionicons name="chevron-back" size={28} color="#A9A9A9" />
        </TouchableOpacity>
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <View className="flex-1 px-8 pt-5">
          {/* หัวข้อหน้า */}
          <Text className="text-3xl font-bold text-gray-700 text-center mb-2">
            Member
          </Text>
          <Text className="text-gray-500 text-center mb-10">
            สร้างบัญชีใหม่เพื่อเริ่มต้นใช้งาน
          </Text>

          {/* ดึง TextFields */}
          <TextFields />
          
        </View>
      </ScrollView>

    </SafeAreaView>
  );
}