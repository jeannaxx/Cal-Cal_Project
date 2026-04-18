import React, { useEffect, useRef } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Animated } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

interface SearchHeaderProps {
  title: string;
  searchQuery: string;
  onSearchChange: (text: string) => void;
  onBack: () => void;
  meal?: string;
  category?: string;
  onClearCategory?: () => void;
}

export const SearchHeader = ({ title, searchQuery, onSearchChange, onBack, meal, category, onClearCategory }: SearchHeaderProps) => {
  const router = useRouter();
  const colorAnim = useRef(new Animated.Value(1)).current; // เริ่มต้นที่ค่า 1 (Lunch)

  useEffect(() => {
    let toValue = 1;
    switch (meal) {
      case "Breakfast": toValue = 0; break;
      case "Lunch": toValue = 1; break;
      case "Dinner": toValue = 2; break;
      case "Snack": toValue = 3; break;
    }

    Animated.timing(colorAnim, {
      toValue,
      duration: 400,
      useNativeDriver: false, // การเปลี่ยนสีพื้นหลังไม่รองรับ native driver
    }).start();
  }, [meal]);

  const backgroundColor = colorAnim.interpolate({
    inputRange: [0, 1, 2, 3],
    outputRange: [
      "#f472a0", // Breakfast: ชมพูอ่อน
      "#b774cd", // Lunch: ชมพูหลัก
      "rgb(123, 167, 237)", // Dinner: ชมพูเข้ม
      "#72bcf4", // Snack: พีช
    ],
  });

  return (
    <Animated.View style={[styles.container, { backgroundColor }]}>
      <View style={styles.headerTop}>
        <TouchableOpacity onPress={onBack}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <View style={styles.titleContainer}>
          <Text style={styles.headerTitle}>{title}</Text>
          {category && (
            <TouchableOpacity onPress={onClearCategory} style={styles.clearBadge}>
              <Ionicons name="close-circle" size={18} color="#fff" />
            </TouchableOpacity>
          )}
        </View>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.searchSection}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color="#ccc" />
          <TextInput
            placeholder="ค้นหาจากชื่อ..."
            style={styles.input}
            value={searchQuery}
            onChangeText={onSearchChange}
          />
        </View>
        <View style={styles.tabRow}>
          <Text style={styles.activeTab}>ค้นหา</Text>
          <TouchableOpacity onPress={() => router.push('/food-favorites' as any)}>
            <Text style={styles.tab}>รายการโปรด</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push('/food-my-menu' as any)}>
            <Text style={styles.tab}>รายการของฉัน</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: { },
  headerTop: { height: 100, flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 15, paddingTop: 40 },
  titleContainer: { flexDirection: 'row', alignItems: 'center' },
  clearBadge: { marginLeft: 8, opacity: 0.8 },
  headerTitle: { color: "#fff", fontSize: 20, fontWeight: "bold" },
  searchSection: { paddingHorizontal: 20, paddingBottom: 15 },
  searchBar: { backgroundColor: "#fff", borderRadius: 25, flexDirection: "row", alignItems: "center", paddingHorizontal: 15, height: 45 },
  input: { flex: 1, marginLeft: 10 },
  tabRow: { flexDirection: "row", justifyContent: "space-around", marginTop: 15 },
  tab: { color: "#fff", opacity: 0.7 },
  activeTab: { color: "#fff", fontWeight: "bold", borderBottomWidth: 2, borderBottomColor: "#fff", paddingBottom: 5 },
});