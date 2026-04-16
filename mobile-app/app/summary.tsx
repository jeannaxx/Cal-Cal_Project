import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useUser } from "./context/usecontext"; 
import { StepDots } from "./component/onboarding/dots"; 
import ResultModal from "./component/onboarding/resulmodel"; 

export default function SummaryScreen() {
  const { userData } = useUser(); 
  const [modalVisible, setModalVisible] = useState(false);
  const [calories, setCalories] = useState<number | null>(null);

  useEffect(() => {
    const weight = parseFloat(userData.weight);
    const height = parseFloat(userData.height);
    const age = parseFloat(userData.age);
    const gender = userData.gender; 
    const deficit = userData.deficit || 0;

    // คำนวณเมื่อข้อมูลครบเท่านั้น
    if (weight && height && age && gender) {
      let bmr = 0;
      if (gender === 'M') {
        bmr = (10 * weight) + (6.25 * height) - (5 * age) + 5;
      } else {
        bmr = (10 * weight) + (6.25 * height) - (5 * age) - 161;
      }
      // TDEE เบื้องต้น (BMR * 1.2)
      const tdee = bmr * 1.2;
      
      // เป้าหมายแคลอรี่ = TDEE - ความเร็วในการลดที่เลือกมา
      // ป้องกันไม่ให้แคลอรี่ต่ำเกินไป (เช่น ไม่ควรต่ำกว่า 1000-1200 kcal)
      const netCalories = Math.max(Math.round(tdee - deficit), 1000);
      
      setCalories(netCalories);
    }
  }, [userData]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.headerText}>มาเริ่มนับแคลอรี่เพื่อไปให้ถึงเป้าหมายกัน!</Text>

        <View style={styles.resultCard}>
          <Text style={styles.cardLabel}>ปริมาณแคลอรี่ที่ควรบริโภคต่อวันคือ</Text>
          <View style={styles.calorieRow}>
            <Text style={styles.calorieText}>
              {calories !== null ? calories : "--"}
            </Text>
            <Text style={styles.unitText}>kcal</Text>
          </View>
          <Text style={styles.cardSubLabel}>และสามารถทำให้ได้น้ำหนักตามเป้าหมาย</Text>
          <Text style={styles.targetLabel}>ใน 30 วัน</Text>
        </View>

        <View style={styles.footer}>
          <TouchableOpacity 
            style={styles.btnFinish} 
            onPress={() => setModalVisible(true)}
          >
            <Text style={styles.btnFinishText}>พร้อมแล้ว</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.dotsWrapper}>
          <StepDots currentStep={3} />
        </View>
      </View>

      <ResultModal 
        visible={modalVisible} 
        onClose={() => setModalVisible(false)} 
        suggestedCal={calories || 0} 
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff5f7" },
  content: { flex: 1, paddingHorizontal: 30, paddingTop: 50, alignItems: 'center' },
  headerText: { fontSize: 18, fontWeight: "700", color: "#333", textAlign: 'center', marginBottom: 50 },
  resultCard: { backgroundColor: '#fff', width: '100%', paddingVertical: 50, borderRadius: 25, alignItems: 'center', elevation: 3 },
  calorieRow: { flexDirection: 'row', alignItems: 'baseline', marginBottom: 15 },
  cardLabel:{},
  calorieText: { fontSize: 55, fontWeight: 'bold', color: '#f472a0' },
  unitText: { fontSize: 22, color: '#f472a0', marginLeft: 8 },
  cardSubLabel: { fontSize: 14, color: "#999" },
  targetLabel: { fontSize: 16, color: "#444", fontWeight: '600', marginTop: 5 },
  footer: { marginTop: 50, alignItems: 'center' },
  btnFinish: { backgroundColor: '#fff', width: 220, paddingVertical: 14, borderRadius: 30, elevation: 3, alignItems: 'center' },
  btnFinishText: { color: '#f472a0', fontWeight: 'bold', fontSize: 16 },
  dotsWrapper: { position: 'absolute', bottom: 50, left: 0, right: 0, alignItems: 'center' }
});