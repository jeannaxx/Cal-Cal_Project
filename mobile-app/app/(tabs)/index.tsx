import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { PieChart, BarChart } from 'react-native-gifted-charts';
import { Sidebar } from '../component/home/Sidebar';
import { CalendarModal } from '../component/home/CalendarModal';
import { Header } from '../component/home/Header';
import { useUser } from '../context/usecontext';

export default function HomeScreen() {
  const router = useRouter();
  const { userData } = useUser();
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [calendarVisible, setCalendarVisible] = useState(false);
  const [summaryMode, setSummaryMode] = useState<'cal' | 'weight'>('cal');

  // คำนวณแคลอรี่ (ดึงเป้าหมายจาก userData หรือตั้ง Default ไว้ที่ 2000)
  const targetCal = 2000; 
  const consumedCal = 1250; // ในอนาคตดึงจาก DB
  const remainingCal = targetCal - consumedCal;

  const pieData = [
    { value: consumedCal, color: '#f472a0', focused: true },
    { value: remainingCal > 0 ? remainingCal : 0, color: '#FFE5EC' },
  ];

  // ข้อมูลสมมติสำหรับกราฟรายสัปดาห์ (ย้อนหลัง 7 วัน)
  const barData = [
    { value: 1800, label: 'จ' },
    { value: 2100, label: 'อ' },
    { value: 1900, label: 'พ' },
    { value: 2200, label: 'พฤ' },
    { value: 1500, label: 'ศ' },
    { value: 2000, label: 'ส' },
    { value: 1850, label: 'อา', frontColor: '#f472a0' }, // สีชมพูเข้มสำหรับเน้นวันปัจจุบัน
  ];

  // ข้อมูลสมมติสำหรับกราฟน้ำหนักรายสัปดาห์ (ย้อนหลัง 7 วัน)
  const weightBarData = [
    { value: 66, label: 'จ' },
    { value: 65.8, label: 'อ' },
    { value: 66.2, label: 'พ' },
    { value: 65.5, label: 'พฤ' },
    { value: 65.2, label: 'ศ' },
    { value: 65, label: 'ส' },
    { value: 64.8, label: 'อา', frontColor: '#f472a0' },
  ];

  const meals = [
    { id: 'Breakfast', label: 'อาหารเช้า', icon: 'sunny-outline', color: '#FFB7B2', cal: 450 },
    { id: 'Lunch', label: 'อาหารเที่ยง', icon: 'partly-sunny-outline', color: '#FFDAC1', cal: 600 },
    { id: 'Dinner', label: 'อาหารเย็น', icon: 'moon-outline', color: '#B2CEFE', cal: 200 },
    { id: 'Snack', label: 'ของว่าง/อื่น ๆ', icon: 'fast-food-outline', color: '#E2F0CB', cal: 0 },
  ];

  return (
    <View style={styles.container}>
      <SafeAreaView edges={['top']} style={styles.headerContainer}>
        <Header 
          onOpenMenu={() => setSidebarVisible(true)} 
          onOpenCalendar={() => setCalendarVisible(true)} 
        />
      </SafeAreaView>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* 1. Dashboard ส่วนวงกลมแคลอรี่แบบใหม่ */}
        <View style={styles.dashboardCard}>
          <Text style={styles.dateText}>17 ก.พ. 2569</Text>
          
          <View style={styles.chartWrapper}>
            <PieChart
              data={pieData}
              donut
              radius={90}
              innerRadius={70}
              centerLabelComponent={() => (
                <View style={styles.centerLabel}>
                  <Text style={styles.mainCal}>{remainingCal}</Text>
                  <Text style={styles.unitText}>คงเหลือ (kcal)</Text>
                </View>
              )}
            />
            
            <View style={styles.statsSide}>
              <View style={styles.miniStat}>
                <Text style={styles.miniLabel}>เป้าหมาย</Text>
                <Text style={styles.miniValue}>{targetCal}</Text>
              </View>
              <View style={styles.miniStat}>
                <Text style={styles.miniLabel}>กินแล้ว</Text>
                <Text style={[styles.miniValue, {color: '#f472a0'}]}>{consumedCal}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* 2. รายการมื้ออาหาร (ที่กดแล้วเด้งไป food-search) */}
        <View style={styles.mealSection}>
          <Text style={styles.sectionTitle}>วันนี้กินอะไรดี?</Text>
          {meals.map((item) => (
            <TouchableOpacity 
              key={item.id} 
              style={styles.mealCard}
              onPress={() => router.push({ pathname: "/food-search", params: { meal: item.id } })}
            >
              <View style={[styles.iconBox, { backgroundColor: item.color }]}>
                <Ionicons name={item.icon as any} size={24} color="#fff" />
              </View>
              <View style={styles.mealInfo}>
                <Text style={styles.mealLabel}>{item.label}</Text>
                <Text style={styles.mealSubText}>
                  {item.cal > 0 ? `บันทึกแล้ว ${item.cal} kcal` : 'ยังไม่ได้บันทึก'}
                </Text>
              </View>
              <Ionicons name="add-circle" size={30} color="#f472a0" />
            </TouchableOpacity>
          ))}
        </View>

        {/* 3. ส่วนสรุปแคลอรี่รายสัปดาห์ */}
        <View style={styles.weeklyCard}>
          <View style={styles.weeklyHeader}>
            <Text style={[styles.sectionTitle, { marginBottom: 0 }]}>
              สถิติรายสัปดาห์ ({summaryMode === 'cal' ? 'kcal' : 'kg'})
            </Text>
            <View style={styles.toggleContainer}>
              <TouchableOpacity 
                style={[styles.toggleBtn, summaryMode === 'cal' && styles.toggleBtnActive]} 
                onPress={() => setSummaryMode('cal')}
              >
                <Text style={[styles.toggleText, summaryMode === 'cal' && styles.toggleTextActive]}>Cal</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.toggleBtn, summaryMode === 'weight' && styles.toggleBtnActive]} 
                onPress={() => setSummaryMode('weight')}
              >
                <Text style={[styles.toggleText, summaryMode === 'weight' && styles.toggleTextActive]}>Kg</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.barChartContainer}>
            <BarChart
              data={summaryMode === 'cal' ? barData : weightBarData}
              barWidth={22}
              noOfSections={3}
              barBorderRadius={6}
              frontColor="#FFC2D1"
              yAxisThickness={0}
              xAxisThickness={0}
              hideRules
              height={150}
              labelStyle={{ color: '#999', fontSize: 12 }}
            />
          </View>
        </View>

        {/* 4. ส่วนบันทึกน้ำหนัก (ดีไซน์เดิมที่คุณทำไว้) */}
        <View style={styles.weightCard}>
           <View style={styles.weightHeader}>
             <Ionicons name="scale-outline" size={20} color="#666" />
             <Text style={styles.weightTitle}>น้ำหนักตัว</Text>
           </View>
           <Text style={styles.weightDisplay}>
             {userData.weight || '--'} <Text style={styles.targetText}>/ {userData.goalWeight || '--'} กก.</Text>
           </Text>
           <TouchableOpacity style={styles.saveWeightBtn}>
              <Text style={styles.saveWeightText}>บันทึกน้ำหนัก</Text>
           </TouchableOpacity>
        </View>
      </ScrollView>

      <Sidebar visible={sidebarVisible} onClose={() => setSidebarVisible(false)} />
      <CalendarModal visible={calendarVisible} onClose={() => setCalendarVisible(false)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF9FB' },
  headerContainer: { backgroundColor: '#f472a0' },
  scrollContent: { padding: 20, paddingBottom: 100 },
  
  // Dashboard
  dashboardCard: { backgroundColor: '#fff', borderRadius: 30, padding: 20, elevation: 5, shadowColor: '#f472a0', shadowOpacity: 0.1, shadowRadius: 10, marginBottom: 25 },
  dateText: { color: '#f472a0', fontSize: 16, fontWeight: '700', textAlign: 'center', marginBottom: 20 },
  chartWrapper: { flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' },
  centerLabel: { alignItems: 'center', justifyContent: 'center' },
  mainCal: { fontSize: 32, fontWeight: 'bold', color: '#f472a0' },
  unitText: { fontSize: 12, color: '#999' },
  statsSide: { gap: 15 },
  miniStat: { alignItems: 'flex-start' },
  miniLabel: { fontSize: 12, color: '#aaa' },
  miniValue: { fontSize: 18, fontWeight: 'bold', color: '#444' },

  // Meals
  mealSection: { marginBottom: 25 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#444', marginBottom: 15, marginLeft: 5 },
  mealCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 15,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5
  },
  iconBox: { width: 45, height: 45, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginRight: 15 },
  mealInfo: { flex: 1 },
  mealLabel: { fontSize: 16, fontWeight: 'bold', color: '#444' },
  mealSubText: { fontSize: 12, color: '#999', marginTop: 2 },

  // Weekly Summary Styles
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
  barChartContainer: { alignItems: 'center', marginTop: 10, marginLeft: -15 },
  weeklyHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 },
  toggleContainer: { flexDirection: 'row', backgroundColor: '#F5F5F5', borderRadius: 20, padding: 3 },
  toggleBtn: { paddingHorizontal: 12, paddingVertical: 4, borderRadius: 15 },
  toggleBtnActive: { backgroundColor: '#f472a0' },
  toggleText: { fontSize: 11, fontWeight: 'bold', color: '#999' },
  toggleTextActive: { color: '#fff' },

  // Weight Card
  weightCard: { 
    backgroundColor: '#fff', 
    borderRadius: 20, 
    padding: 20, 
    elevation: 3, 
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  weightHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 10, gap: 5 },
  weightTitle: { fontSize: 14, color: '#666', fontWeight: '600' },
  weightDisplay: { fontSize: 28, fontWeight: 'bold', color: '#444' },
  targetText: { fontSize: 16, color: '#999' },
  saveWeightBtn: { backgroundColor: '#FFE5EC', paddingVertical: 8, paddingHorizontal: 20, borderRadius: 12, marginTop: 15 },
  saveWeightText: { fontWeight: 'bold', color: '#f472a0', fontSize: 13 },
});