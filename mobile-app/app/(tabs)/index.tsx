import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Sidebar } from '../component/home/Sidebar';
import { CalendarModal } from '../component/home/CalendarModal'; // ตรวจสอบ path ให้ถูก

export default function HomeScreen() {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [calendarVisible, setCalendarVisible] = useState(false); // เพิ่มสถานะเปิด/ปิดปฏิทิน

  return (
    <View style={styles.container}>
      {/* Header ส่วนบนสีชมพู */}
      <SafeAreaView edges={['top']} style={{ backgroundColor: '#f472a0' }}>
        <View style={styles.headerRow}>
          <TouchableOpacity onPress={() => setSidebarVisible(true)} style={styles.iconBtn}>
            <Ionicons name="menu" size={32} color="#fff" />
          </TouchableOpacity>
          
          <Text style={styles.headerTitle}>CAL-CAL</Text>

          {/* จิ้มตรงนี้เพื่อไปหน้าภาพที่สอง (Calendar) */}
          <TouchableOpacity onPress={() => setCalendarVisible(true)} style={styles.iconBtn}>
            <Ionicons name="calendar-outline" size={28} color="#fff" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* 1. ส่วนวงกลมแคลอรี่ */}
        <View style={styles.circleSection}>
           <Text style={styles.dateText}>17 ก.พ. 2569</Text>
           <View style={styles.progressCircle}>
              <Text style={styles.mainCal}>1300</Text>
              <Text style={styles.unitText}>kcal</Text>
           </View>
           <View style={styles.mealLabelRow}>
              <Text style={styles.mealText}>อาหารเช้า</Text>
              <Text style={styles.mealText}>อาหารเที่ยง</Text>
              <Text style={styles.mealText}>อาหารว่าง</Text>
              <Text style={styles.mealText}>อาหารเย็น</Text>
           </View>
        </View>

        {/* 2. ส่วนบันทึกน้ำหนัก */}
        <View style={styles.weightCard}>
           <Text style={styles.weightDisplay}>
             65 <Text style={styles.targetText}>/ 60 กก.</Text>
           </Text>
           <TouchableOpacity style={styles.saveWeightBtn}>
              <Text style={styles.saveWeightText}>บันทึกน้ำหนัก</Text>
           </TouchableOpacity>
        </View>

        {/* 3. ส่วนสถิติ BMI/BMR */}
        <View style={styles.statsContainer}>
            <View style={styles.statBox}><Text style={styles.statText}>BMI 19</Text></View>
            <View style={styles.statBox}><Text style={styles.statText}>BMR 1113</Text></View>
        </View>
      </ScrollView>

      {/* เรียกใช้งาน Sidebar และ CalendarModal */}
      <Sidebar visible={sidebarVisible} onClose={() => setSidebarVisible(false)} />
      <CalendarModal visible={calendarVisible} onClose={() => setCalendarVisible(false)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  headerRow: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  headerTitle: { color: '#fff', fontSize: 22, fontWeight: 'bold' },
  iconBtn: { width: 40, alignItems: 'center' },
  scrollContent: { paddingBottom: 100 },
  circleSection: { alignItems: 'center', marginTop: 25 },
  dateText: { color: '#888', fontSize: 16, marginBottom: 15 },
  progressCircle: {
    width: 220,
    height: 220,
    borderRadius: 110,
    borderWidth: 12,
    borderColor: '#f472a0',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
  },
  mainCal: { fontSize: 50, fontWeight: 'bold', color: '#f472a0' },
  unitText: { fontSize: 18, color: '#f472a0' },
  mealLabelRow: { flexDirection: 'row', gap: 15, marginTop: 20 },
  mealText: { color: '#333', fontWeight: '500', fontSize: 12 },
  weightCard: { 
    backgroundColor: '#fff', 
    margin: 25, 
    borderRadius: 20, 
    padding: 20, 
    elevation: 4, 
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  weightDisplay: { fontSize: 32, fontWeight: 'bold', color: '#333' },
  targetText: { fontSize: 16, color: '#999' },
  saveWeightBtn: { backgroundColor: '#a8e6cf', paddingVertical: 10, paddingHorizontal: 25, borderRadius: 15, marginTop: 15 },
  saveWeightText: { fontWeight: 'bold', color: '#333' },
  statsContainer: { flexDirection: 'row', justifyContent: 'center', gap: 40, paddingVertical: 20, backgroundColor: '#fdfdfd' },
  statBox: { paddingHorizontal: 20 },
  statText: { color: '#666', fontSize: 16, fontWeight: '600' }
});