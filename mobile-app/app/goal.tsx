//เลือกความเร็วในการลดน้ำหนัก หลายอย่าง เร็ว ช้า ปกติ ช้ามาก

import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context"; // ใช้ตัวใหม่ไม่โดนขีดฆ่า
import { useRouter } from "expo-router";
import { useUser } from "./context/usecontext";
import { StepDots } from "./component/onboarding/dots";

export default function GoalSetting() {
  const router = useRouter();
  const { userData, setUserData } = useUser();
  const [active, setActive] = useState(3);

  const options = [
    { id: 1, t: "แบบรวดเร็วมาก", d: "ลดอาทิตย์ละ 1 กก.", val: 1100 },
    { id: 2, t: "แบบเร็ว", d: "ลดอาทิตย์ละ 0.5 กก.", val: 550 },
    { id: 3, t: "แบบธรรมดา(แนะนำ)", d: "ลดอาทิตย์ละ 0.33 กก.", val: 360 },
    { id: 4, t: "แบบค่อยๆ", d: "ลดอาทิตย์ละ 0.25 กก.", val: 275 },
  ];

  const handleResult = () => {
    const choice = options.find(o => o.id === active);
    // บันทึกค่า deficit เข้า context
    setUserData({ ...userData, deficit: choice?.val || 0 });
    router.push("/summary");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>ผลลัพธ์ที่ต้องการเห็นในแต่ละอาทิตย์</Text>
        {options.map((opt) => (
          <TouchableOpacity
            key={opt.id}
            style={[styles.card, active === opt.id && styles.activeCard]}
            onPress={() => setActive(opt.id)}
          >
            <Text style={[styles.cardT, active === opt.id && styles.whiteText]}>{opt.t}</Text>
            <Text style={[styles.cardD, active === opt.id && styles.whiteText]}>{opt.d}</Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity style={styles.btnResult} onPress={handleResult}>
          <Text style={styles.btnResultText}>ดูผลการคำนวณ</Text>
        </TouchableOpacity>
        <View style={styles.dotsWrapper}><StepDots currentStep={2} /></View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff5f7" },
  content: { flex: 1, paddingHorizontal: 30, paddingTop: 50, alignItems: 'center' },
  title: { fontSize: 17, fontWeight: "700", color: "#c23b6a", marginBottom: 30 },
  card: { width: '100%', backgroundColor: '#fff', padding: 20, borderRadius: 15, marginBottom: 12, alignItems: 'center' },
  activeCard: { backgroundColor: '#f472a0' },
  cardT: { fontWeight: '700', color: '#c23b6a' },
  cardD: { fontSize: 12, color: '#f9a8c0', marginTop: 10 },
  whiteText: { color: '#fff' },
  btnResult: { marginTop: 50, backgroundColor: '#fff', width: 220, paddingVertical: 14, borderRadius: 30, elevation: 3, alignItems: 'center' }, // Standardized marginTop
  btnResultText: { color: '#f472a0', fontWeight: 'bold', fontSize: 16 }, // Standardized fontWeight
  dotsWrapper: {
    position: 'absolute',
    bottom: 50, 
    left: 0,
    right: 0,
    alignItems: 'center'
  }
});