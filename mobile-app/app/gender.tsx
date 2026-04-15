import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from "react-native";
import { useRouter } from "expo-router";
import { StepDots } from "./component/onboarding/dots";

export default function GenderScreen() {
  const router = useRouter();
  const [selected, setSelected] = useState<'M' | 'F' | null>(null);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>เพื่อคำนวณแคลอรี่ที่เหมาะสมสำหรับคุณ</Text>
        <Text style={styles.subtitle}>กรุณาบอกเราเกี่ยวกับตัวคุณ</Text>

        <View style={styles.row}>
          <TouchableOpacity 
            style={[styles.genderBox, selected === 'M' && styles.selected]} 
            onPress={() => setSelected('M')} 
          />
          <TouchableOpacity 
            style={[styles.genderBox, selected === 'F' && styles.selected]} 
            onPress={() => setSelected('F')} 
          />
        </View>

        <TouchableOpacity style={styles.btnNext} onPress={() => router.push("/info-input")}>
          <Text style={styles.btnText}>ถัดไป</Text>
        </TouchableOpacity>

        <StepDots currentStep={0} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff5f7" },
  content: { flex: 1, paddingHorizontal: 30, alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 18, fontWeight: "700", color: "#c23b6a", textAlign: 'center' },
  subtitle: { fontSize: 14, color: "#f9a8c0", marginVertical: 10, marginBottom: 50 },
  row: { flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginBottom: 50 },
  genderBox: { width: '46%', aspectRatio: 1, backgroundColor: '#fff', borderRadius: 24, elevation: 2 },
  selected: { backgroundColor: '#f472a0', borderWidth: 3, borderColor: '#fff' },
  btnNext: { backgroundColor: "#fff", paddingHorizontal: 50, paddingVertical: 12, borderRadius: 25, elevation: 3 },
  btnText: { color: "#f472a0", fontWeight: "700" }
});