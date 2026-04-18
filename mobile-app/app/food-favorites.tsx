import React, { useState, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { supabase } from "./component/common/supabase";
import { FoodListItem } from "./component/food/FoodListItem";
import { EmptyState } from "./component/common/EmptyState";

export default function FoodFavoritesScreen() {
  const router = useRouter();
  const [favorites, setFavorites] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // ดึงข้อมูลรายการโปรด (สมมติว่าดึงจากตาราง Food โดยกรอง is_favorite: true)
  // ในระบบจริงอาจจะดึงจากตาราง Join ระหว่าง User และ Food
  const fetchFavorites = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from("Food")
      .select("*")
      .eq("is_favorite", true); // กรองเฉพาะรายการโปรด
    
    if (!error) setFavorites(data || []);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>รายการโปรดของฉัน</Text>
        <TouchableOpacity onPress={fetchFavorites}>
          <Ionicons name="refresh" size={22} color="#fff" />
        </TouchableOpacity>
      </View>

      {isLoading ? (
        <View style={styles.center}>
          <Text style={{ color: "#999" }}>กำลังโหลดรายการโปรด...</Text>
        </View>
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <FoodListItem 
              item={item} 
              onPress={() => router.push({ pathname: "/food-detail", params: { id: item.id } })} 
            />
          )}
          ListEmptyComponent={
            <EmptyState message="ยังไม่มีรายการโปรดเลยจ้า" />
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
  center: { flex: 1, justifyContent: "center", alignItems: "center", marginTop: 50 },
});