//วงกลมสัดส่วนอาหาร
import React, { useState, useEffect, useMemo } from 'react';
import { View, Text, StyleSheet, Dimensions,TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useUser } from '../../context/usecontext';

interface MainCircleProps {
  consumed?: number;
  target?: number;
  protein?: number;
  carbs?: number;
  fat?: number;
}

const { width } = Dimensions.get('window');
const CIRCLE_SIZE = width * 0.65;

export const MainCircle = ({ 
  consumed = 0, 
  target, 
  protein = 0, 
  carbs = 0, 
  fat = 0 
}: MainCircleProps) => {
  const { userData } = useUser();
  const router = useRouter();

  // แสดงวันที่ปัจจุบันในรูปแบบภาษาไทย
  const dateDisplay = useMemo(() => {
    return new Date().toLocaleDateString('th-TH', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  }, []);

  // คำนวณเป้าหมายแคลอรี่จาก Context (userData) ให้ตรงกับหน้า summary.tsx
  const calculatedTarget = useMemo(() => {
    const weight = parseFloat(userData.weight);
    const height = parseFloat(userData.height);
    const age = parseFloat(userData.age);
    const gender = userData.gender;
    const deficit = userData.deficit || 0;

    if (weight && height && age && gender) {
      let bmr = 0;
      if (gender === 'M') {
        bmr = (10 * weight) + (6.25 * height) - (5 * age) + 5;
      } else {
        bmr = (10 * weight) + (6.25 * height) - (5 * age) - 161;
      }
      const tdee = bmr * 1.2;
      return Math.max(Math.round(tdee - deficit), 1000);
    }
    return 2000; // ค่า Default กรณีข้อมูลไม่ครบ
  }, [userData]);

  const finalTarget = target !== undefined ? target : calculatedTarget;

  // State สำหรับเก็บค่าที่จะแสดงผล (ค่าที่กำลังวิ่ง)
  const [displayConsumed, setDisplayConsumed] = useState(0);
  const [displayTarget, setDisplayTarget] = useState(0);
  const [displayProtein, setDisplayProtein] = useState(0);
  const [displayCarbs, setDisplayCarbs] = useState(0);
  const [displayFat, setDisplayFat] = useState(0);

  // Counting Animation Logic
  useEffect(() => {
    let frame = 0;
    const duration = 1000; // ปรับให้เร็วขึ้นเล็กน้อย (1 วินาที)
    const frameRate = 1000 / 60; // 60 FPS
    const totalFrames = duration / frameRate;

    const timer = setInterval(() => {
      frame += 1;
      const progress = frame / totalFrames;
      
      if (frame >= totalFrames) {
        setDisplayConsumed(consumed);
        setDisplayTarget(finalTarget);
        setDisplayProtein(protein);
        setDisplayCarbs(carbs);
        setDisplayFat(fat);
        clearInterval(timer);
      } else {
        setDisplayConsumed(Math.floor(consumed * progress));
        setDisplayTarget(Math.floor(finalTarget * progress));
        setDisplayProtein(Math.floor(protein * progress));
        setDisplayCarbs(Math.floor(carbs * progress));
        setDisplayFat(Math.floor(fat * progress));
      }
    }, frameRate);

    return () => clearInterval(timer);
    // เพิ่ม userData เพื่อให้คำนวณใหม่ถ้ามีการเปลี่ยนโปรไฟล์
  }, [consumed, finalTarget, protein, carbs, fat, userData]);

  const remaining = displayTarget - displayConsumed;
  const isOverLimit = consumed > finalTarget;
  const calorieColor = isOverLimit ? '#FF4D4D' : '#f472a0';
  const remainingLabel = isOverLimit ? 'เกินเป้าหมาย' : 'คงเหลือ';

  return (
    <View style={styles.container}>
      {/* ส่วนแสดงวันที่ */}
      <Text style={styles.dateText}>{dateDisplay}</Text>

      {/* ส่วนวงกลมหลัก */}
      <View style={styles.circleOuter}>
        <LinearGradient
          colors={['#FF85A2', '#f472a0']}
          style={styles.circleInner}
        >
          <View style={styles.whiteHole}>
            <Text style={styles.remainingLabel}>{remainingLabel}</Text>
            <Text style={[styles.caloriesNum, { color: calorieColor }]}>
              {Math.abs(remaining).toLocaleString()}
            </Text>
            <Text style={styles.unitLabel}>kcal</Text>
          </View>
        </LinearGradient>
      </View>

      {/* ส่วนสรุปตัวเลขด้านล่างวงกลม */}
      <View style={styles.summaryRow}>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryValue}>{displayConsumed.toLocaleString()}</Text>
          <Text style={styles.summaryLabel}>กินแล้ว</Text>
        </View>
        <View style={[styles.summaryItem, styles.borderLeft]}>
          <Text style={styles.summaryValue}>{displayTarget.toLocaleString()}</Text>
          <Text style={styles.summaryLabel}>เป้าหมาย</Text>
        </View>
      </View>

      {/* ส่วนแถบสารอาหาร (Macros) */}
      <View style={styles.macroContainer}>
        <MacroItem label="โปรตีน" value={displayProtein} unit="ก." color="#FFB7B2" />
        <MacroItem label="คาร์บ" value={displayCarbs} unit="ก." color="#FFDAC1" />
        <MacroItem label="ไขมัน" value={displayFat} unit="ก." color="#E2F0CB" />
      </View>

      {/* ปุ่มบันทึกอาหาร */}
      <TouchableOpacity 
        style={styles.recordButton} 
        onPress={() => router.push('/food-search' as any)}
      >
        <LinearGradient
          colors={['#FF85A2', '#f472a0']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.recordButtonInner}
        >
          <Ionicons name="restaurant" size={20} color="#fff" style={{ marginRight: 8 }} />
          <Text style={styles.recordButtonText}>บันทึกอาหาร</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

const MacroItem = ({ label, value, unit, color }: any) => (
  <View style={styles.macroItem}>
    <View style={[styles.macroDot, { backgroundColor: color }]} />
    <Text style={styles.macroText}>{label} {value}{unit}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { alignItems: 'center', marginVertical: 10 },
  dateText: { 
    fontSize: 16, 
    fontWeight: '700', 
    color: '#f472a0', 
    marginBottom: 20,
    opacity: 0.8 
  },
  circleOuter: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    backgroundColor: '#fff',
    elevation: 15,
    shadowColor: '#f472a0',
    shadowOpacity: 0.3,
    shadowRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
  },
  circleInner: {
    width: '100%',
    height: '100%',
    borderRadius: CIRCLE_SIZE,
    justifyContent: 'center',
    alignItems: 'center',
  },
  whiteHole: {
    width: '85%',
    height: '85%',
    backgroundColor: '#fff',
    borderRadius: CIRCLE_SIZE,
    justifyContent: 'center',
    alignItems: 'center',
  },
  remainingLabel: { fontSize: 16, color: '#888', fontWeight: '600' },
  caloriesNum: { fontSize: 42, fontWeight: '900', color: '#f472a0', marginVertical: 2 },
  unitLabel: { fontSize: 16, color: '#888', fontWeight: '600' },
  summaryRow: { flexDirection: 'row', marginTop: 25, width: '80%', justifyContent: 'center' },
  summaryItem: { flex: 1, alignItems: 'center' },
  borderLeft: { borderLeftWidth: 1, borderLeftColor: '#eee' },
  summaryValue: { fontSize: 18, fontWeight: '700', color: '#555' },
  summaryLabel: { fontSize: 12, color: '#999', marginTop: 2 },
  macroContainer: { flexDirection: 'row', marginTop: 20, backgroundColor: '#fff', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 20, elevation: 2 },
  macroItem: { flexDirection: 'row', alignItems: 'center', marginHorizontal: 10 },
  macroDot: { width: 8, height: 8, borderRadius: 4, marginRight: 6 },
  macroText: { fontSize: 12, color: '#666', fontWeight: '600' },
  recordButton: {
    marginTop: 30,
    width: '65%',
    height: 50,
    borderRadius: 25,
    elevation: 5,
    shadowColor: '#f472a0',
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  recordButtonInner: {
    flex: 1,
    borderRadius: 25,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  recordButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '800',
  }
});