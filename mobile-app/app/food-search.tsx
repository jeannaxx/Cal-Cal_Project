import React, { useState, useEffect } from "react";
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet, Image } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { supabase } from "../app/component/common/supabase"; // ไฟล์ที่เราสร้างไว้คราวก่อน

export default function FoodSearchScreen() {
  const router = useRouter();
  const { meal } = useLocalSearchParams(); // รับค่ามื้ออาหาร (เช้า/เที่ยง/เย็น)
  const [searchQuery, setSearchQuery] = useState("");
  const [foods, setFoods] = useState<any[]>([]);

  // ฟังก์ชันค้นหาข้อมูลจาก Supabase
  const handleSearch = async (text: string) => {
    setSearchQuery(text);
    const { data, error } = await supabase
      .from("Food") // ชื่อตารางใน Prisma
      .select("*")
      .ilike("name", `%${text}%`);
    
    if (!error) setFoods(data);
  };

  useEffect(() => { handleSearch(""); }, []);

  return (
    <View style={styles.container}>
      {/* Header สีชมพู */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>อาหาร{meal === "Breakfast" ? "เช้า" : "เที่ยง"}</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* ช่องค้นหา */}
      <View style={styles.searchSection}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color="#ccc" />
          <TextInput 
            placeholder="ค้นหาจากชื่อ..." 
            style={styles.input}
            value={searchQuery}
            onChangeText={handleSearch}
          />
        </View>
        <View style={styles.tabRow}>
          <Text style={styles.activeTab}>ค้นหา</Text>
          <Text style={styles.tab}>รายการโปรด</Text>
          <Text style={styles.tab}>รายการของฉัน</Text>
        </View>
      </View>

      {/* แถบไอคอน 4 อัน */}
      <View style={styles.iconMenu}>
        {[
          { label: "หมวดหมู่", icon: "grid-outline" },
          { label: "ไดอารี่", icon: "book-outline" },
          { label: "ถ่ายรูป", icon: "camera-outline", action: () => alert("เปิดกล้อง AI") },
          { label: "เปลี่ยนมื้อ", icon: "swap-horizontal-outline" }
        ].map((item, index) => (
          <TouchableOpacity key={index} style={styles.iconBtn} onPress={item.action}>
            <View style={styles.iconBox}><Ionicons name={item.icon as any} size={24} color="#f472a0" /></View>
            <Text style={styles.iconLabel}>{item.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* รายการอาหาร */}
      <FlatList
        data={foods}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.foodItem} 
            onPress={() => router.push({ pathname: "/food-detail", params: { id: item.id } })}
          >
            <View style={styles.foodImgPlaceholder} />
            <View style={{ flex: 1 }}>
              <Text style={styles.foodName}>{item.name}</Text>
              <Text style={styles.foodSub}>10% ของแคลอรี่ที่ควรบริโภคต่อวัน</Text>
            </View>
            <Text style={styles.foodCal}>{item.calories} <Text style={{ fontSize: 10 }}>kcal</Text></Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: { backgroundColor: "#f472a0", height: 100, flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 15, paddingTop: 40 },
  headerTitle: { color: "#fff", fontSize: 20, fontWeight: "bold" },
  searchSection: { backgroundColor: "#f472a0", paddingHorizontal: 20, paddingBottom: 10 },
  searchBar: { backgroundColor: "#fff", borderRadius: 25, flexDirection: "row", alignItems: "center", paddingHorizontal: 15, height: 45 },
  input: { flex: 1, marginLeft: 10 },
  tabRow: { flexDirection: "row", justifyContent: "space-around", marginTop: 15 },
  tab: { color: "#fff", opacity: 0.7 },
  activeTab: { color: "#fff", fontWeight: "bold", borderBottomWidth: 2, borderBottomColor: "#fff" },
  iconMenu: { flexDirection: "row", justifyContent: "space-around", paddingVertical: 20, borderBottomWidth: 1, borderBottomColor: "#eee" },
  iconBtn: { alignItems: "center" },
  iconBox: { width: 50, height: 50, backgroundColor: "#fff", elevation: 2, borderRadius: 10, justifyContent: "center", alignItems: "center", marginBottom: 5 },
  iconLabel: { fontSize: 12, color: "#666" },
  foodItem: { flexDirection: "row", alignItems: "center", padding: 15, borderBottomWidth: 1, borderBottomColor: "#f9f9f9" },
  foodImgPlaceholder: { width: 50, height: 50, backgroundColor: "#eee", borderRadius: 25, marginRight: 15 },
  foodName: { fontSize: 16, fontWeight: "bold" },
  foodSub: { fontSize: 10, color: "#999" },
  foodCal: { fontSize: 18, fontWeight: "bold", color: "#f472a0" }
});