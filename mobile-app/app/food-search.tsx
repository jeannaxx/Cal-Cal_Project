import React, { useState, useEffect, useMemo } from "react";
import { View, Text, SectionList, StyleSheet } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { supabase } from "../app/component/common/supabase"; // ไฟล์ที่เราสร้างไว้คราวก่อน
import { FoodListItem } from "./component/food/FoodListItem";
import { SearchHeader } from "./component/food/SearchHeader";
import { ActionMenu } from "./component/food/ActionMenu";
import { EmptyState } from "./component/common/EmptyState";

export default function FoodSearchScreen() {
  const router = useRouter();
  const { meal, category } = useLocalSearchParams(); // รับค่ามื้ออาหาร และหมวดหมู่
  const [searchQuery, setSearchQuery] = useState("");
  const [foods, setFoods] = useState<any[]>([]);

  // ฟังก์ชันค้นหาข้อมูลจาก Supabase
  const handleSearch = async (text: string) => {
    setSearchQuery(text);
    let query = supabase.from("Food").select("*").ilike("name", `%${text}%`);
    
    // ถ้ามีการเลือกหมวดหมู่มา ให้กรองเพิ่ม
    if (category) {
      query = query.eq("category", category);
    }

    const { data, error } = await query;
    
    if (!error) setFoods(data);
  };

  useEffect(() => { handleSearch(""); }, [category]); // โหลดใหม่เมื่อหมวดหมู่เปลี่ยน

  // ฟังก์ชันล้างการกรองหมวดหมู่
  const clearCategory = () => {
    router.setParams({ category: undefined });
  };

  // ฟังก์ชันสลับมื้ออาหาร
  const handleMealChange = () => {
    const mealOrder = ["Breakfast", "Lunch", "Dinner", "Snack"];
    const currentMeal = (meal as string) || "Breakfast";
    const currentIndex = mealOrder.indexOf(currentMeal);
    
    // หา Index ถัดไปในรายการ (ถ้าถึงอันสุดท้ายจะวนกลับไป 0)
    const nextIndex = (currentIndex === -1 || currentIndex === mealOrder.length - 1) ? 0 : currentIndex + 1;
    router.setParams({ meal: mealOrder[nextIndex] });
  };

  // แปลงชื่อมื้ออาหารเป็นภาษาไทยสำหรับหัวข้อ
  const getMealTitle = () => {
    if (category) return category as string;
    switch (meal) {
      case "Breakfast": return "อาหารเช้า";
      case "Lunch": return "อาหารเที่ยง";
      case "Dinner": return "อาหารเย็น";
      case "Snack": return "ของว่าง/อื่นๆ";
      default: return "ค้นหาอาหาร";
    }
  };

  // จัดกลุ่มข้อมูลอาหารแยกตามหมวดหมู่สำหรับ SectionList
  const sections = useMemo(() => {
    const groups: { [key: string]: any[] } = {};
    
    foods.forEach((item) => {
      const cat = item.category || "ทั่วไป";
      if (!groups[cat]) groups[cat] = [];
      groups[cat].push(item);
    });

    return Object.keys(groups).sort().map((key) => ({
      title: key,
      data: groups[key],
    }));
  }, [foods]);

  return (
    <View style={styles.container}>
      {/* ส่วนหัวและช่องค้นหา (Component แยก) */}
      <SearchHeader
        title={getMealTitle()}
        searchQuery={searchQuery}
        onSearchChange={handleSearch}
        onBack={() => router.back()}
        meal={meal as string}
        category={category as string}
        onClearCategory={clearCategory}
      />

      {/* แถบเมนูไอคอน (Component แยก) */}
      <ActionMenu onChangeMeal={handleMealChange} />

      {/* รายการอาหาร */}
      <SectionList
        sections={sections}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={
          <View style={styles.listHeader}>
            <Text style={styles.listHeaderTitle}>
              {searchQuery ? "ผลการค้นหา" : "เมนูอาหารทั่วไป"}
            </Text>
          </View>
        }
        ListEmptyComponent={
          <EmptyState 
            message={searchQuery 
              ? `ลูลู่หา "${searchQuery}" ไม่เจอเลยค่ะ\nลองเปลี่ยนคำค้นหาดูนะคะ` 
              : "ยังไม่มีรายการอาหารในส่วนนี้จ้า"} 
          />
        }
        renderSectionHeader={({ section: { title } }) => (
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionHeaderTitle}>{title}</Text>
          </View>
        )}
        renderItem={({ item }) => (
          <FoodListItem 
            item={item} 
            onPress={() => router.push({ pathname: "/food-detail", params: { id: item.id } })} 
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  listHeader: { paddingHorizontal: 20, paddingTop: 20, paddingBottom: 10 },
  listHeaderTitle: { fontSize: 18, fontWeight: "bold", color: "#f472a0" },
  sectionHeader: { backgroundColor: "#f9f9f9", paddingHorizontal: 20, paddingVertical: 8 },
  sectionHeaderTitle: { fontSize: 14, fontWeight: "bold", color: "#888" },
});