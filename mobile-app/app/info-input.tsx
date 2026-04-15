//อายุส่วนสุง น้ำหนัก เพื่อคำนวณ นชหน้าต่อไปคือ เบือกเลเวลการลดน้ำหนัก

import React from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView } from "react-native";
import { useRouter } from "expo-router";
import { useUser } from "./context/usecontext"; // ใช้ context จากโปรเจกต์คุณ
import { BackButton } from "./component/ui/BackButtom";

export default function InfoInputScreen() {
  const router = useRouter();
  const { userData, setUserData } = useUser();

  const handleNext = () => {
    // ตรวจสอบความถูกต้องก่อนไปหน้าถัดไป
    if (userData.age && userData.height && userData.weight) {
      router.push("/goal"); // ต้องสะกดตรงกับไฟล์ goal.tsx
    } else {
      alert("กรุณากรอกข้อมูลให้ครบถ้วน");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>เพื่อคำนวณแคลอรี่ที่เหมาะสมสำหรับคุณ</Text>

        <View style={styles.form}>
          {[
            { label: "อายุ", field: "age", unit: "ปี" },
            { label: "ส่วนสูง", field: "height", unit: "ชม." },
            { label: "น้ำหนัก", field: "weight", unit: "กก." },
            { label: "เป้าหมายน้ำหนัก", field: "goalWeight", unit: "กก." }
          ].map((item, index) => (
            <View key={index} style={styles.inputRow}>
              <Text style={styles.label}>{item.label}</Text>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                // ใช้ (userData as any)[item.field] เพื่อแก้โค้ดแดงเบื้องต้น
                value={(userData as any)[item.field]}
                onChangeText={(v) => setUserData({ ...userData, [item.field]: v })}
              />
              <Text style={styles.unit}>{item.unit}</Text>
            </View>
          ))}
        </View>

        <View style={styles.footer}>
          <BackButton />
          <TouchableOpacity style={styles.btnNext} onPress={handleNext}>
            <Text style={styles.btnNextText}>ถัดไป</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff5f7" },
  content: { flex: 1, paddingHorizontal: 30, paddingTop: 60 },
  title: { fontSize: 18, fontWeight: "700", color: "#c23b6a", textAlign: 'center', marginBottom: 40 },
  form: { width: '100%' },
  inputRow: { flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#f9c4d0', paddingVertical: 15, alignItems: 'center' },
  label: { flex: 1.5, color: '#f9a8c0' },
  input: { flex: 1, textAlign: 'right', color: '#c23b6a', fontWeight: 'bold', fontSize: 18 },
  unit: { width: 40, textAlign: 'right', color: '#f9a8c0' },
  footer: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 40, alignItems: 'center' },
  btnNext: { backgroundColor: '#fff', paddingHorizontal: 40, paddingVertical: 10, borderRadius: 20, elevation: 2 },
  btnNextText: { color: '#f472a0', fontWeight: 'bold' }
});