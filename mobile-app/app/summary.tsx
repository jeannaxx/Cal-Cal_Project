import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from "react-native";
import { useRouter } from "expo-router";
import { useUser } from "./context/usecontext";

export default function SummaryScreen() {
  const router = useRouter();
  const { userData } = useUser();

  const calculateCal = () => {
    const w = parseFloat(userData.weight);
    const h = parseFloat(userData.height);
    const a = parseFloat(userData.age);
    if (!w || !h || !a) return 0;

    // สูตร Mifflin-St Jeor
    let bmr = (10 * w) + (6.25 * h) - (5 * a);
    bmr = userData.gender === 'M' ? bmr + 5 : bmr - 161;
    
    const tdee = bmr * 1.2; // พลังงานพื้นฐาน
    const deficit = (userData.rate * 7700) / 7; // ส่วนต่างที่ต้องลด
    return Math.round(tdee - deficit);
  };

  const calories = calculateCal();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.header}>มาเริ่มนับแคลอรี่เพื่อไปให้ถึงเป้าหมายกัน!</Text>
        <View style={styles.box}>
          <Text style={styles.label}>ปริมาณแคลอรี่ที่ควรบริโภคต่อวันคือ</Text>
          <Text style={styles.calText}>{calories || "---"} <Text style={styles.unit}>kcal</Text></Text>
          <Text style={styles.sub}>และสามารถทำให้ได้น้ำหนักตามเป้าหมาย</Text>
        </View>
        <TouchableOpacity style={styles.btnStart} onPress={() => router.replace("/(tabs)")}>
          <Text style={styles.btnStartText}>พร้อมแล้ว</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff5f7" },
  content: { flex: 1, paddingHorizontal: 30, paddingTop: 100, alignItems: 'center' },
  header: { fontSize: 18, fontWeight: "700", color: "#c23b6a", textAlign: 'center', marginBottom: 50 },
  box: { width: '100%', backgroundColor: '#fff', paddingVertical: 50, borderRadius: 30, alignItems: 'center', elevation: 4 },
  label: { color: '#f9a8c0', fontSize: 14, marginBottom: 15 },
  calText: { fontSize: 50, fontWeight: '900', color: '#f472a0' },
  unit: { fontSize: 20 },
  sub: { textAlign: 'center', color: '#f9a8c0', marginTop: 25 },
  btnStart: { marginTop: 60, backgroundColor: '#fff', paddingHorizontal: 60, paddingVertical: 15, borderRadius: 30, elevation: 2 },
  btnStartText: { color: '#f472a0', fontWeight: '800' }
});