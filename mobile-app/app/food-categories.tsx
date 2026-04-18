import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Dimensions } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

const categories = [
  { id: "1", name: "จานเดียว", icon: "restaurant-outline", color: "#FFB7B2" },
  { id: "2", name: "เส้น/ก๋วยเตี๋ยว", icon: "infinite-outline", color: "#FFDAC1" },
  { id: "3", name: "ต้ม/แกง", icon: "water-outline", color: "#E2F0CB" },
  { id: "4", name: "ผัด/ทอด", icon: "flame-outline", color: "#B5EAD7" },
  { id: "5", name: "ของหวาน", icon: "ice-cream-outline", color: "#C7CEEA" },
  { id: "6", name: "เครื่องดื่ม", icon: "cafe-outline", color: "#FF9AA2" },
  { id: "7", name: "โปรตีน", icon: "egg-outline", color: "#E5A5A5" },
  { id: "8", name: "แป้ง/ธัญพืช", icon: "nutrition-outline", color: "#F3E5AB" },
  { id: "9", name: "ไขมัน", icon: "color-fill-outline", color: "#FFE4B5" },
  { id: "10", name: "ผลไม้", icon: "leaf-outline", color: "#98d7fb" },
  { id: "11", name: "เบเกอรี่", icon: "pizza-outline", color: "#DEB887" },
  { id: "12", name: "ซุป", icon: "water-outline", color: "#a6d7e9" },
  { id: "13", name: "ขนม", icon: "fast-food-outline", color: "#FFB347" },
  { id: "14", name: "ผัก", icon: "leaf-outline", color: "#82c582" },
  { id: "15", name: "KFC", icon: "fast-food-outline", color: "#FF6961" },
  { id: "16", name: "Dairy Queen", icon: "ice-cream-outline", color: "#779ECB" },
  { id: "17", name: "อื่นๆ", icon: "ellipsis-horizontal-outline", color: "#CFCFCF" },
];

export default function FoodCategoriesScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>หมวดหมู่เนื้อหา</Text>
        <View style={{ width: 24 }} />
      </View>

      <FlatList
        data={categories}
        numColumns={2}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.card}
            onPress={() => router.push({ pathname: "/food-search", params: { category: item.name } })}
          >
            <View style={[styles.iconBox, { backgroundColor: item.color }]}>
              <Ionicons name={item.icon as any} size={35} color="#fff" />
            </View>
            <Text style={styles.cardText}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff5f7" },
  header: { backgroundColor: "#f472a0", height: 100, flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 15, paddingTop: 40 },
  headerTitle: { color: "#fff", fontSize: 20, fontWeight: "bold" },
  list: { padding: 15 },
  card: { 
    flex: 1, 
    backgroundColor: "#fff", 
    margin: 8, 
    borderRadius: 20, 
    padding: 20, 
    alignItems: "center",
    elevation: 3,
    shadowColor: "#f472a0",
    shadowOpacity: 0.1,
    shadowRadius: 5
  },
  iconBox: { width: 60, height: 60, borderRadius: 30, justifyContent: "center", alignItems: "center", marginBottom: 10 },
  cardText: { fontSize: 14, fontWeight: "bold", color: "#666" }
});