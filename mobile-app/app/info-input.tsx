import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useRouter } from "expo-router";
// นำเข้า SafeAreaView จากตัวนี้แทน (ตัวที่อาจารย์จะไม่ขีดฆ่า)
import { SafeAreaView } from "react-native-safe-area-context";
import { useUser } from "./context/usecontext"; 
import { StepDots } from "./component/onboarding/dots"; 

export default function InfoInputScreen() {
  const router = useRouter();
  const { userData, setUserData } = useUser();
  
  // ใช้ local state เพื่อความไหลลื่นในการพิมพ์
  const [localInfo, setLocalInfo] = useState({
    age: userData.age || "",
    height: userData.height || "",
    weight: userData.weight || "",
    goalWeight: userData.goalWeight || ""
  });

  const inputFields = [
    { label: "อายุ", field: "age", unit: "ปี" },
    { label: "ส่วนสูง", field: "height", unit: "ชม." },
    { label: "น้ำหนัก", field: "weight", unit: "กก." },
    { label: "เป้าหมายน้ำหนัก", field: "goalWeight", unit: "กก." }
  ] as const;

  const handleNext = () => {
    // เช็คว่ากรอกครบไหม (ไม่รวม goalWeight ก็ได้ถ้าไม่ซีเรียส)
    if (localInfo.age && localInfo.height && localInfo.weight) {
      // บันทึกเข้า Context ทันที
      setUserData({
        ...userData,
        age: localInfo.age,
        height: localInfo.height,
        weight: localInfo.weight,
        goalWeight: localInfo.goalWeight
      });
      router.push("/goal");
    } else {
      Alert.alert("กรอกข้อมูลไม่ครบ", "กรุณากรอกอายุ ส่วนสูง และน้ำหนักด้วยนะคะ");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>เพื่อคำนวณแคลอรี่ที่เหมาะสมสำหรับคุณ</Text>
        <Text style={styles.titlesec}>กรุณากรอกข้อมูลเกี่ยวกับตัวคุณ</Text>

        <View style={styles.form}>
          {inputFields.map((item, index) => (
            <View key={index} style={styles.inputRow}>
              <Text style={styles.label}>{item.label}</Text>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                placeholder="0"
                placeholderTextColor="#f9c4d0"
                value={localInfo[item.field]}
                onChangeText={(v) => setLocalInfo({ ...localInfo, [item.field]: v })}
              />
              <Text style={styles.unit}>{item.unit}</Text>
            </View>
          ))}
        </View>

        <View style={styles.footer}>
          <TouchableOpacity style={styles.btnNext} onPress={handleNext}>
            <Text style={styles.btnNextText}>ถัดไป</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.dotsWrapper}>
          <StepDots currentStep={1} />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff5f7" },
  content: { flex: 1, paddingHorizontal: 30, paddingTop: 50 },
  title: { fontSize: 18, fontWeight: "700", color: "#c23b6a", textAlign: 'center', marginBottom: 10 },
  titlesec: { fontSize: 15, color: "#888", textAlign: 'center', marginBottom: 40 },
  form: { width: '100%' },
  inputRow: { flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#f9c4d0', paddingVertical: 18, alignItems: 'center' },
  label: { flex: 1.5, color: '#f9a8c0' },
  input: { flex: 2, textAlign: 'right', color: '#c23b6a', fontWeight: 'bold', fontSize: 18, paddingRight: 10 },
  unit: { flex: 0.5, color: '#f9a8c0', textAlign: 'right' },
  footer: { marginTop: 50, alignItems: 'center' },
  btnNext: { backgroundColor: '#fff', width: 220, paddingVertical: 14, borderRadius: 30, elevation: 3, alignItems: 'center', marginTop: 50 }, // Moved marginTop from footer
  btnNextText: { color: '#f472a0', fontWeight: 'bold', fontSize: 16 }, 
  dotsWrapper: { position: 'absolute', bottom: 50, left: 0, right: 0, alignItems: 'center' }
});