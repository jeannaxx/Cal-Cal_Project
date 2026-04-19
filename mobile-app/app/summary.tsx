import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useUser } from "./context/usecontext"; 
import { StepDots } from "./component/onboarding/dots"; 
import ResultModal from "./component/onboarding/resulmodel"; 
import { Ionicons } from "@expo/vector-icons";
import { supabase } from "../lib/supabase";
import { useRouter } from "expo-router";
import CustomAlert from "../app/component/ui/CustomAlert";
import { API_URL } from '../constants/Config';
import Colors from '../constants/Colors';

export default function SummaryScreen() {
  const { userData } = useUser(); 
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [calories, setCalories] = useState<number | null>(null);

  const [alertConfig, setAlertConfig] = useState({ 
    visible: false, 
    title: '', 
    message: '', 
    icon: 'information-circle' as keyof typeof Ionicons.glyphMap 
  });

  const showAlert = (title: string, message: string, icon: keyof typeof Ionicons.glyphMap = 'information-circle') => {
    setAlertConfig({ visible: true, title, message, icon });
  };

  const hideAlert = () => {
    setAlertConfig({ ...alertConfig, visible: false });
  };

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

  const handleFinish = async () => {
    // เช็คว่าคำนวณค่าแคลอรี่ได้สำเร็จหรือไม่
    if (calories !== null && calories > 0) {
      setIsLoading(true);
      try {
        // 1. ดึง Token สำหรับยืนยันตัวตนกับ Backend
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) throw new Error("กรุณาเข้าสู่ระบบใหม่อีกครั้งจ้า");

        // 2. เตรียมข้อมูลและเช็คความถูกต้อง (ป้องกัน NaN)
        const profileData = {
          gender: userData.gender,
          age: parseInt(userData.age) || 0,
          height: parseFloat(userData.height) || 0,
          weight: parseFloat(userData.weight) || 0,
          goal_weight: parseFloat(userData.goalWeight) || 0,
          suggested_calories: calories,
        };

        if (profileData.age === 0 || profileData.height === 0) {
          throw new Error("ข้อมูลร่างกายไม่ถูกต้อง กรุณากลับไปตรวจสอบอีกครั้งจ้า");
        }

        // 3. ส่งข้อมูลไปที่ Backend (Express Server)
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000); // ตั้งเวลา 10 วินาที

        const response = await fetch(`${API_URL}/profiles`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session.access_token}`
          },
          body: JSON.stringify(profileData),
          signal: controller.signal // ส่ง signal เข้าไปใน fetch
        });
        
        clearTimeout(timeoutId); // ล้างค่า timeout ถ้า fetch สำเร็จก่อนเวลา
        
        console.log("Fetching to:", `${API_URL}/profiles`);

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.error || "บันทึกข้อมูลไม่สำเร็จ");
        }

        setModalVisible(true);
      } catch (error: any) {
        if (error.name === 'AbortError') {
          showAlert("อุ๊ปส์!", "การเชื่อมต่อหมดเวลา (Timeout) กรุณาตรวจสอบอินเทอร์เน็ตหรือเลข IP นะจ๊ะ", 'alert-circle');
        } else {
          showAlert("อุ๊ปส์!", error.message, 'alert-circle');
        }
      } finally {
        setIsLoading(false);
      }
    } else {
      showAlert('ข้อมูลหายไปไหนนะ?', 'ลูลู่คำนวณให้ไม่ได้ เพราะข้อมูลไม่ครบจ้า\nรบกวนลองกลับไปกรอกใหม่อีกทีนะ', 'heart-dislike');
    }
  };

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
            style={[styles.btnFinish, isLoading && styles.btnDisabled]} 
            onPress={handleFinish}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color={Colors.accent} />
            ) : (
              <Text style={styles.btnFinishText}>พร้อมแล้ว</Text>
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.dotsWrapper}>
          <StepDots currentStep={3} />
        </View>
      </View>

      <CustomAlert 
        visible={alertConfig.visible}
        title={alertConfig.title}
        message={alertConfig.message}
        icon={alertConfig.icon}
        onClose={hideAlert}
      />

      <ResultModal 
        visible={modalVisible} 
        onClose={() => setModalVisible(false)} 
        suggestedCal={calories || 0} 
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  content: { flex: 1, paddingHorizontal: 30, paddingTop: 50, alignItems: 'center' },
  headerText: { fontSize: 18, fontWeight: "700", color: Colors.textDark, textAlign: 'center', marginBottom: 50 },
  resultCard: { backgroundColor: Colors.cardBg, width: '100%', paddingVertical: 50, borderRadius: 25, alignItems: 'center', elevation: 3 },
  calorieRow: { flexDirection: 'row', alignItems: 'baseline', marginBottom: 15 },
  cardLabel:{},
  calorieText: { fontSize: 55, fontWeight: 'bold', color: Colors.accent },
  unitText: { fontSize: 22, color: Colors.accent, marginLeft: 8 },
  cardSubLabel: { fontSize: 14, color: Colors.textLight },
  targetLabel: { fontSize: 16, color: Colors.textMedium, fontWeight: '600', marginTop: 5 },
  footer: { marginTop: 50, alignItems: 'center' },
  btnFinish: { backgroundColor: Colors.cardBg, width: 220, paddingVertical: 14, borderRadius: 30, elevation: 3, alignItems: 'center' },
  btnFinishText: { color: Colors.accent, fontWeight: 'bold', fontSize: 16 },
  btnDisabled: { opacity: 0.7 },
  dotsWrapper: { position: 'absolute', bottom: 50, left: 0, right: 0, alignItems: 'center' },
});