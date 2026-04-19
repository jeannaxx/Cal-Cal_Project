import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, RefreshControl, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { supabase } from '../../lib/supabase';
import { useRouter, useFocusEffect } from 'expo-router';
import { Header } from '../component/home/Header';
import { Sidebar } from '../component/home/Sidebar';
import { CalendarModal } from '../component/home/CalendarModal';
import { API_URL } from '../../constants/Config';
import Colors from '../../constants/Colors';

export default function DashboardScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [isSidebarVisible, setSidebarVisible] = useState(false);
  const [isCalendarVisible, setCalendarVisible] = useState(false);
  const [profile, setProfile] = useState<any>(null);
  const [meals, setMeals] = useState<any[]>([]);
  const [summary, setSummary] = useState({ consumed: 0, protein: 0, carbs: 0, fat: 0 });

  const fetchData = async () => {
    try {
      setLoading(true);
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      const token = session.access_token;
      const today = new Date().toISOString().split('T')[0];

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 seconds timeout

      // 1. ดึงข้อมูล Profile (เป้าหมายแคลอรี่)
      const profileRes = await fetch(`${API_URL}/profiles/me`, {
        headers: { 
          Authorization: `Bearer ${token}`,
          'ngrok-skip-browser-warning': 'true'
        },
        signal: controller.signal
      });
      const profileData = await profileRes.json();
      setProfile(profileData);

      // 2. ดึงข้อมูลมื้ออาหารของวันนี้
      const mealRes = await fetch(`${API_URL}/meals?date=${today}`, {
        headers: { 
          Authorization: `Bearer ${token}`,
          'ngrok-skip-browser-warning': 'true'
        },
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      const mealData = await mealRes.json();
      setMeals(mealData);

      // 3. คำนวณผลรวม
      const total = mealData.reduce((acc: any, meal: any) => ({
        consumed: acc.consumed + (meal.calories || 0),
        protein: acc.protein + (meal.protein || 0),
        carbs: acc.carbs + (meal.carbs || 0),
        fat: acc.fat + (meal.fat || 0),
      }), { consumed: 0, protein: 0, carbs: 0, fat: 0 });

      setSummary(total);
    } catch (error) {
      console.error("Dashboard error:", error);
    } finally {
      setLoading(false);
    }
  };

  // ใช้ useFocusEffect เพื่อให้ข้อมูลอัปเดตทุกครั้งที่กลับมาหน้านี้
  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [])
  );

  const targetCal = profile?.daily_calorie_goal || 2000;
  const remainingCal = targetCal - summary.consumed;
  const progressWidth = Math.min((summary.consumed / targetCal) * 100, 100);

  if (loading && !profile) {
    return (
      <View style={[styles.container, { justifyContent: 'center' }]}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header 
        onOpenMenu={() => setSidebarVisible(true)} 
        onOpenCalendar={() => setCalendarVisible(true)} 
      />
      
      <ScrollView 
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={loading} onRefresh={fetchData}  />}
      >
        <View style={styles.welcomeSection}>
          <Text style={styles.greeting}>สวัสดี, {profile?.full_name || 'เพื่อนเก่ง'}</Text>
          <Text style={styles.subGreeting}>วันนี้คุณทานอะไรไปแล้วบ้าง?</Text>
        </View>

        {/* Main Calorie Card */}
        <View style={styles.mainCard}>
          <View style={styles.calRow}>
            <View>
              <Text style={styles.calTitle}>คงเหลือ</Text>
              <Text style={styles.calRemaining}>{remainingCal.toLocaleString()}</Text>
              <Text style={styles.calUnit}>kcal</Text>
            </View>
            <Ionicons name="restaurant-outline" size={80} color={Colors.primaryLight} style={styles.bgIcon} />
          </View>
          
          <View style={styles.progressBarBg}>
            <View style={[styles.progressBarFill, { width: `${progressWidth}%` }]} />
          </View>
          
          <View style={styles.statsRow}>
            <Text style={styles.statsLabel}>กินไปแล้ว {summary.consumed} kcal</Text>
            <Text style={styles.statsLabel}>เป้าหมาย {targetCal} kcal</Text>
          </View>
        </View>

        {/* Macros */}
        <View style={styles.macroRow}>
          <MacroBox label="Protein" value={`${summary.protein}g`} color={Colors.accent} />
          <MacroBox label="Carbs" value={`${summary.carbs}g`} color={Colors.border} />
          <MacroBox label="Fat" value={`${summary.fat}g`} color={Colors.secondary} />
        </View>

        {/* Today's Meals */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>มื้ออาหารวันนี้</Text>
          <TouchableOpacity onPress={() => router.push('/add-meal')}>
            <Text style={styles.addText}>+ เพิ่มอาหาร</Text>
          </TouchableOpacity>
        </View>

        {meals.length === 0 ? (
          <View style={styles.emptyBox}>
            <Text style={styles.emptyText}>ยังไม่มีบันทึกอาหารของวันนี้เลย</Text>
          </View>
        ) : (
          meals.map((meal) => (
            <View key={meal.id} style={styles.mealItem}>
              <View style={styles.mealInfo}>
                <Text style={styles.mealName}>{meal.name}</Text>
                <Text style={styles.mealSub}>{meal.meal_type} • {meal.food_categories?.name}</Text>
              </View>
              <Text style={styles.mealCal}>{meal.calories} kcal</Text>
            </View>
          ))
        )}
      </ScrollView>

      {/* เชื่อมต่อ Sidebar */}
      <Sidebar 
        visible={isSidebarVisible} 
        onClose={() => setSidebarVisible(false)} 
        userProfile={profile}
      />

      {/* เชื่อมต่อ CalendarModal */}
      <CalendarModal 
        visible={isCalendarVisible} 
        onClose={() => setCalendarVisible(false)} 
      />
    </SafeAreaView>
  );
}

const MacroBox = ({ label, value, color }: any) => (
  <View style={styles.macroBox}>
    <View style={[styles.macroDot, { backgroundColor: color }]} />
    <Text style={styles.macroLabel}>{label}</Text>
    <Text style={styles.macroValue}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF9FB' },
  welcomeSection: { paddingHorizontal: 25, paddingTop: 20, marginBottom: 15 },
  greeting: { fontSize: 24, fontWeight: '900', color: Colors.primary },
  subGreeting: { fontSize: 14, color: '#888', fontWeight: '600' },
  mainCard: { backgroundColor: Colors.primary, marginHorizontal: 25, borderRadius: 30, padding: 25, elevation: 8, shadowColor: Colors.primary, shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.3, shadowRadius: 10 },
  calRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  calTitle: { color: Colors.primaryLight, fontSize: 18, fontWeight: '600', opacity: 0.9 },
  calRemaining: { color: Colors.cardBg, fontSize: 48, fontWeight: '900' },
  calUnit: { color: Colors.cardBg, fontSize: 16, fontWeight: '600' },
  bgIcon: { position: 'absolute', right: -10, opacity: 0.2 },
  progressBarBg: { height: 12, backgroundColor: 'rgba(255,255,255,0.3)', borderRadius: 6, marginVertical: 20 },
  progressBarFill: { height: '100%', backgroundColor: Colors.cardBg, borderRadius: 6 },
  statsRow: { flexDirection: 'row', justifyContent: 'space-between' },
  statsLabel: { color: Colors.cardBg, fontSize: 12, fontWeight: '600' },
  macroRow: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 25, marginTop: 25 },
  macroBox: { backgroundColor: Colors.cardBg, width: '30%', padding: 15, borderRadius: 20, alignItems: 'center', elevation: 2 },
  macroDot: { width: 8, height: 8, borderRadius: 4, marginBottom: 5 },
  macroLabel: { fontSize: 10, color: Colors.textLight, fontWeight: '700', textTransform: 'uppercase' },
  macroValue: { fontSize: 14, fontWeight: '800', color: Colors.textDeep },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 25, marginTop: 30, marginBottom: 15 },
  sectionTitle: { fontSize: 18, fontWeight: '800', color: Colors.textDeep },
  addText: { color: Colors.primary, fontWeight: '700' },
  mealItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: Colors.cardBg, marginHorizontal: 25, padding: 15, borderRadius: 20, marginBottom: 10, elevation: 1 },
  mealInfo: { flex: 1 },
  mealName: { fontSize: 16, fontWeight: '700', color: Colors.textDeep },
  mealSub: { fontSize: 12, color: Colors.textLight, marginTop: 2 },
  mealCal: { fontSize: 16, fontWeight: '800', color: Colors.primary },
  emptyBox: { alignItems: 'center', padding: 40 },
  emptyText: { color: Colors.border, fontWeight: '600' }
});