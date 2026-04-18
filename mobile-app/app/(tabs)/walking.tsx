import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { PieChart, BarChart } from 'react-native-gifted-charts';
import { Header } from '../component/home/Header';
import { Sidebar } from '../component/home/Sidebar';
import { CalendarModal } from '../component/home/CalendarModal';

export default function WalkingScreen() {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [calendarVisible, setCalendarVisible] = useState(false);

  // ข้อมูลตั้งต้นเป็น 0 ตามที่ต้องการ
  const stepsCount = 0;
  const stepTarget = 10000;
  const distanceKm = 0.0;
  const caloriesBurn = 0;

  // ข้อมูลสำหรับวงกลม (Donut Chart)
  const pieData = [
    { value: stepsCount, color: '#f472a0' },
    { value: Math.max(0, stepTarget - stepsCount), color: '#FFE5EC' },
  ];

  // ข้อมูลกราฟแท่งรายสัปดาห์
  const rawWeeklyData = [
    { value: 0, label: 'จ' },
    { value: 0, label: 'อ' },
    { value: 0, label: 'พ' },
    { value: 0, label: 'พฤ' },
    { value: 0, label: 'ศ' },
    { value: 0, label: 'ส' },
    { value: 0, label: 'อา' },
  ];

  // วิธีเปลี่ยนสีตามจำนวนก้าว: ใช้ .map เพื่อเช็คเงื่อนไขของค่า value
  const weeklyData = rawWeeklyData.map(item => ({
    ...item,
    // หากค่า value (ก้าวเดิน) >= 5000 ให้ใช้สีชมพูเข้ม ถ้าไม่ถึงใช้สีชมพูอ่อน
    frontColor: item.value >= 5000 ? '#f472a0' : '#FFC2D1',
  }));

  return (
    <View style={styles.container}>
      <SafeAreaView edges={['top']} style={styles.headerArea}>
        <Header 
          onOpenMenu={() => setSidebarVisible(true)} 
          onOpenCalendar={() => setCalendarVisible(true)}
        />
      </SafeAreaView>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* ส่วนสรุปจำนวนก้าวหลัก */}
        <View style={styles.mainCard}>
          <Text style={styles.cardTitle}>จำนวนก้าววันนี้</Text>
          <View style={styles.chartContainer}>
            <PieChart
              data={pieData}
              donut
              radius={100}
              innerRadius={80}
              centerLabelComponent={() => (
                <View style={styles.centerLabel}>
                  <Ionicons name="walk" size={32} color="#f472a0" />
                  <Text style={styles.stepNum}>{stepsCount.toLocaleString()}</Text>
                  <Text style={styles.stepTarget}>เป้าหมาย {stepTarget.toLocaleString()}</Text>
                </View>
              )}
            />
          </View>

          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{distanceKm.toFixed(1)}</Text>
              <Text style={styles.statLabel}>กิโลเมตร</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{caloriesBurn}</Text>
              <Text style={styles.statLabel}>แคลอรี่</Text>
            </View>
          </View>
        </View>

        {/* กราฟแท่งรายสัปดาห์ */}
        <View style={styles.weeklyCard}>
          <Text style={styles.sectionTitle}>สถิติรายสัปดาห์</Text>
          <View style={styles.barChartWrapper}>
            <BarChart
              data={weeklyData}
              barWidth={20}
              noOfSections={4}
              barBorderRadius={6}
              frontColor="#FFC2D1"
              yAxisThickness={0}
              xAxisThickness={0}
              hideRules
              height={180}
              labelStyle={{ color: '#999', fontSize: 12 }}
            />
          </View>
        </View>

        {/* ปุ่มกระตุ้นการเดิน */}
        <TouchableOpacity style={styles.syncBtn}>
          <Ionicons name="refresh-outline" size={20} color="#fff" style={{ marginRight: 8 }} />
          <Text style={styles.syncBtnText}>ซิงค์ข้อมูลจากโทรศัพท์</Text>
        </TouchableOpacity>
      </ScrollView>

      <Sidebar visible={sidebarVisible} onClose={() => setSidebarVisible(false)} />
      <CalendarModal visible={calendarVisible} onClose={() => setCalendarVisible(false)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF9FB' },
  headerArea: { backgroundColor: '#f472a0' },
  scrollContent: { padding: 20, paddingBottom: 40 },
  
  // Main Card (Donut Chart)
  mainCard: { 
    backgroundColor: '#fff', 
    borderRadius: 30, 
    padding: 25, 
    alignItems: 'center', 
    elevation: 8, 
    shadowColor: '#f472a0', 
    shadowOpacity: 0.15, 
    shadowRadius: 15,
    marginBottom: 20
  },
  cardTitle: { fontSize: 18, fontWeight: 'bold', color: '#444', marginBottom: 20 },
  chartContainer: { marginBottom: 20 },
  centerLabel: { alignItems: 'center' },
  stepNum: { fontSize: 36, fontWeight: 'bold', color: '#f472a0', marginTop: 5 },
  stepTarget: { fontSize: 13, color: '#aaa', marginTop: 2 },
  
  // Daily Stats Row
  statsRow: { flexDirection: 'row', width: '100%', marginTop: 10, borderTopWidth: 1, borderTopColor: '#f0f0f0', paddingTop: 20 },
  statItem: { flex: 1, alignItems: 'center' },
  statValue: { fontSize: 22, fontWeight: 'bold', color: '#444' },
  statLabel: { fontSize: 12, color: '#999', marginTop: 4 },
  divider: { width: 1, height: '80%', backgroundColor: '#eee' },

  // Weekly Card
  weeklyCard: { 
    backgroundColor: '#fff', 
    borderRadius: 30, 
    padding: 20, 
    marginBottom: 25, 
    elevation: 3, 
    shadowColor: '#000', 
    shadowOpacity: 0.05, 
    shadowRadius: 10 
  },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#444', marginBottom: 20 },
  barChartWrapper: { alignItems: 'center', marginLeft: -15 },

  // Sync Button
  syncBtn: { 
    backgroundColor: '#f472a0', 
    flexDirection: 'row', 
    justifyContent: 'center', 
    alignItems: 'center', 
    padding: 15, 
    borderRadius: 20,
    elevation: 5
  },
  syncBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 16 }
});
