import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { StepDots } from "./component/onboarding/dots";
import { useUser } from "./context/usecontext";

export default function GenderScreen() {
  const router = useRouter();
  const { userData, setUserData } = useUser();
  const [selected, setSelected] = useState<'M' | 'F' | null>(null);

  const handleNext = () => {
    if (selected) {
      setUserData({ ...userData, gender: selected });
      router.push("/info-input");
    } else {
      Alert.alert("กรุณาเลือกเพศ", "โปรดเลือกเพศเพื่อให้เราคำนวณแคลอรี่ได้แม่นยำขึ้น");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>เพื่อคำนวณแคลอรี่ที่เหมาะสมสำหรับคุณ</Text>
        <Text style={styles.subtitle}>กรุณาบอกเราเกี่ยวกับตัวคุณ</Text>

        {/* ส่วนสำหรับใส่รูปภาพ ตรงกลางหน้าจอ */}
        <View style={styles.imageContainer}>
           {/* <Image source={require('../assets/lulu-gender.png')} style={styles.image} /> */}
           <Text style={{color: '#f9c4d0'}}>พื้นที่สำหรับใส่รูปภาพ</Text>
        </View>

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

        <TouchableOpacity style={styles.btnNext} onPress={handleNext}>
          <Text style={styles.btnText}>ถัดไป</Text>
        </TouchableOpacity>

      <View style={styles.dotsWrapper}>
        <StepDots currentStep={0} />
      </View>
    </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff5f7" },
  content: { flex: 1, paddingHorizontal: 30, paddingTop: 50, alignItems: 'center' },
  title: { fontSize: 18, fontWeight: "700", color: "#c23b6a", textAlign: 'center' },
  subtitle: { fontSize: 14, color: "#f9a8c0", marginVertical: 10, marginBottom: 20 },
  imageContainer: { height: 150, width: '100%', justifyContent: 'center', alignItems: 'center', marginBottom: 20 },
  row: { flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginBottom: 50 },
  genderBox: { width: '46%', aspectRatio: 1, backgroundColor: '#fff', borderRadius: 24, elevation: 2 },
  selected: { backgroundColor: '#f472a0', borderWidth: 3, borderColor: '#fff' },
  btnNext: { backgroundColor: "#fff", width: 220, paddingVertical: 14, borderRadius: 30, elevation: 3, alignItems: 'center', marginTop: 50 },
  btnText: { color: "#f472a0", fontWeight: "bold", fontSize: 16 },
  dotsWrapper:{
    position: 'absolute', 
    bottom: 50, 
    left: 0,
    right: 0,
    alignItems: 'center'
  }
});