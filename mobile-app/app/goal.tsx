//เลือกความเร็วในการลดน้ำหนัก หลายอย่าง เร็ว ช้า ปกติ ช้ามาก

import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from "react-native";
import { useRouter } from "expo-router";
import { StepDots } from "./component/onboarding/dots";

export default function GoalSetting() {
  const router = useRouter();
  const [active, setActive] = useState(3);

  const options = [
    { id: 1, t: "แบบรวดเร็วมาก", d: "น้ำหนักลดอาทิตย์ละ 1 กก." },
    { id: 2, t: "แบบเร็ว", d: "น้ำหนักลดอาทิตย์ละ 0.5 กก." },
    { id: 3, t: "แบบธรรมดา(แนะนำ)", d: "น้ำหนักลดอาทิตย์ละ 0.33 กก." },
    { id: 4, t: "แบบค่อยๆ", d: "น้ำหนักลดอาทิตย์ละ 0.25 กก." },
  ];

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

        <TouchableOpacity style={styles.btnResult} 
          onPress={() => router.push("/summary")}>
          <Text style={styles.btnResultText}>ดูผลการคำนวณ</Text>
        </TouchableOpacity>
        <StepDots currentStep={2} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff5f7" },
  content: { flex: 1, paddingHorizontal: 25, paddingTop: 60, alignItems: 'center' },
  title: { fontSize: 17, fontWeight: "700", color: "#c23b6a", marginBottom: 30 },
  card: { width: '100%', backgroundColor: '#fff', padding: 20, borderRadius: 15, marginBottom: 12, alignItems: 'center' },
  activeCard: { backgroundColor: '#f472a0' },
  cardT: { fontWeight: '700', color: '#c23b6a' },
  cardD: { fontSize: 12, color: '#f9a8c0', marginTop: 4 },
  whiteText: { color: '#fff' },
  btnResult: { marginTop: 20, backgroundColor: '#fff', paddingHorizontal: 30, paddingVertical: 12, borderRadius: 25, elevation: 2 },
  btnResultText: { color: '#f472a0', fontWeight: '700' }
});