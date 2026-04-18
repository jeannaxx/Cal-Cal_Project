import React, { useState, useEffect, useMemo } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { supabase } from "./component/common/supabase";
import { FoodListItem } from "./component/food/FoodListItem";
import { EmptyState } from "./component/common/EmptyState";

export default function FoodDiaryScreen() {
  const router = useRouter();
  const [logs, setLogs] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // จัดการวันที่ปัจจุบัน (ใช้สำหรับกรองข้อมูล)
  const today = new Date().toLocaleDateString('th-TH', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  const fetchDiaryLogs = async () => {
    setIsLoading(true);
    // ดึงข้อมูลจากตาราง FoodLog (สมมติว่าคุณมีตารางนี้เพื่อเก็บประวัติการกิน)
    // ในขั้นต้นเราจะดึงข้อมูลทั้งหมดมาแสดงก่อน
    const { data, error } = await supabase
      .from("FoodLog") 
      .select("*")
      .order("created_at", { ascending: false });

    if (!error) {
      setLogs(data || []);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchDiaryLogs();
  }, []);

  // คำนวณแคลอรี่รวมของรายการที่แสดง
  const totalCalories = useMemo(() => {
    return logs.reduce((sum, item) => sum + (item.calories || 0), 0);
  }, [logs]);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>ไดอารี่อาหาร</Text>
        <TouchableOpacity onPress={fetchDiaryLogs}>
          <Ionicons name="refresh" size={22} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Summary Card */}
      <View style={styles.summaryCard}>
        <Text style={styles.dateText}>{today}</Text>
        <Text style={styles.totalLabel}>รวมแคลอรี่ที่ทานไปวันนี้</Text>
        <Text style={styles.totalValue}>{totalCalories.toLocaleString()} <Text style={styles.unit}>kcal</Text></Text>
      </View>

      {isLoading ? (
        <ActivityIndicator size="large" color="#f472a0" style={{ marginTop: 50 }} />
      ) : (
        <FlatList
          data={logs}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{ paddingBottom: 30 }}
          renderItem={({ item }) => (
            <FoodListItem 
              item={item} 
              onPress={() => router.push({ pathname: "/food-detail", params: { id: item.food_id || item.id } })} 
            />
          )}
          ListEmptyComponent={
            <EmptyState message="วันนี้ยังไม่ได้บันทึกเมนูไหนเลย" />
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: { backgroundColor: "#f472a0", height: 100, flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 15, paddingTop: 40 },
  headerTitle: { color: "#fff", fontSize: 20, fontWeight: "bold" },
  summaryCard: {
    backgroundColor: "#fff5f7",
    margin: 20,
    padding: 20,
    borderRadius: 25,
    alignItems: "center",
    elevation: 2,
  },
  dateText: { fontSize: 14, color: "#f472a0", fontWeight: "600", marginBottom: 5 },
  totalLabel: { fontSize: 16, color: "#666" },
  totalValue: { fontSize: 36, fontWeight: "bold", color: "#f472a0" },
  unit: { fontSize: 16, fontWeight: "normal" },
});