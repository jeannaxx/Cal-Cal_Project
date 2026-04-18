import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Modal, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { StepDots } from "./component/onboarding/dots";
import { useUser } from "./context/usecontext";
import { Ionicons } from "@expo/vector-icons";

export default function GenderScreen() {
  const router = useRouter();
  const { userData, setUserData } = useUser();
  const [selected, setSelected] = useState<'M' | 'F' | null>(null);
  const [alertVisible, setAlertVisible] = useState(false);

  const handleNext = () => {
    if (selected) {
      setUserData({ ...userData, gender: selected });
      router.push("/info-input");
    } else {
      setAlertVisible(true);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>เพื่อคำนวณแคลอรี่ที่เหมาะสมสำหรับคุณ</Text>
        <Text style={styles.subtitle}>กรุณาบอกเราเกี่ยวกับตัวคุณ</Text>

        <View style={styles.imageContainer}>
           <Image source={require('../assets/Look.png')} style={styles.image} resizeMode="contain" />
        </View>

        <View style={styles.row}>
          <TouchableOpacity 
            style={[styles.genderBox, selected === 'M' && styles.selected]} 
            onPress={() => setSelected('M')}
          >
            <Ionicons name="male" size={60} color={selected === 'M' ? "#fff" : "#f472a0"} />
            <Text style={[styles.genderText, selected === 'M' && styles.selectedText]}>ชาย</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.genderBox, selected === 'F' && styles.selected]} 
            onPress={() => setSelected('F')}
          >
            <Ionicons name="female" size={60} color={selected === 'F' ? "#fff" : "#f472a0"} />
            <Text style={[styles.genderText, selected === 'F' && styles.selectedText]}>หญิง</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.btnNext} onPress={handleNext}>
          <Text style={styles.btnText}>ถัดไป</Text>
        </TouchableOpacity>

        <View style={styles.dotsWrapper}>
          <StepDots currentStep={0} />
        </View>
      </View>

      {/* Cute Alert Modal */}
      <Modal visible={alertVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.alertIconBox}>
              <Ionicons name="heart" size={40} color="#FF85A2" />
            </View>
            <Text style={styles.modalTitle}>อุ๊ปส์! ลืมเลือกเพศ</Text>
            <Text style={styles.modalSub}>โปรดเลือกเพศก่อนไปต่อหน้านะคะ{'\n'}เพื่อความแม่นยำในการคำนวณค่ะ</Text>
            <TouchableOpacity style={styles.modalBtn} onPress={() => setAlertVisible(false)}>
              <Text style={styles.modalBtnText}>เข้าใจแล้วจ้า</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff5f7" },
  content: { flex: 1, paddingHorizontal: 30, paddingTop: 50, alignItems: 'center' },
  title: { fontSize: 18, fontWeight: "700", color: "#c23b6a", textAlign: 'center' },
  subtitle: { fontSize: 14, color: "#f9a8c0", marginVertical: 10, marginBottom: 20 },
  imageContainer: { height: 250, width: '100%', justifyContent: 'center', alignItems: 'center', marginBottom: 20 },
  image: { width: '100%', height: '100%' },
  row: { flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginBottom: 50 },
  genderBox: { width: '46%', aspectRatio: 1, backgroundColor: '#fff', borderRadius: 24, elevation: 2, justifyContent: 'center', alignItems: 'center',marginTop:20},
  selected: { backgroundColor: '#f472a0', borderWidth: 3, borderColor: '#fff' },
  genderText: { marginTop: 10, fontSize: 18, fontWeight: 'bold', color: '#f472a0' },
  selectedText: { color: '#fff' },
  btnNext: { backgroundColor: "#fff", width: 220, paddingVertical: 14, borderRadius: 30, elevation: 3, alignItems: 'center', marginTop: 50 },
  btnText: { color: "#f472a0", fontWeight: "bold", fontSize: 16 },
  dotsWrapper:{
    position: 'absolute', 
    bottom: 50, 
    left: 0,
    right: 0,
    alignItems: 'center'
  },
  // Modal Styles
  modalOverlay: { flex: 1, backgroundColor: 'rgba(255, 133, 162, 0.2)', justifyContent: 'center', alignItems: 'center' },
  modalContent: { backgroundColor: '#fff', width: '80%', padding: 30, borderRadius: 40, alignItems: 'center', elevation: 10, shadowColor: '#FF85A2', shadowOpacity: 0.2, shadowRadius: 15 },
  alertIconBox: { width: 70, height: 70, borderRadius: 35, backgroundColor: '#FFF0F3', justifyContent: 'center', alignItems: 'center', marginBottom: 20 },
  modalTitle: { fontSize: 20, fontWeight: '800', color: '#c23b6a', marginBottom: 10 },
  modalSub: { fontSize: 14, color: '#888', textAlign: 'center', lineHeight: 20, marginBottom: 25 },
  modalBtn: { backgroundColor: '#FF85A2', paddingVertical: 12, paddingHorizontal: 40, borderRadius: 25 },
  modalBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});