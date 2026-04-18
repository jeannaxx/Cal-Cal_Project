import React, { useState, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Modal, TextInput, Alert } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { supabase } from "./component/common/supabase";
import { FoodListItem } from "./component/food/FoodListItem";

export default function MyMenuScreen() {
  const router = useRouter();
  const [myFoods, setMyFoods] = useState<any[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [newName, setNewName] = useState("");
  const [newCal, setNewCal] = useState("");
  const [newImage, setNewImage] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);

  // ดึงรายการอาหารที่ผู้ใช้สร้างเอง
  const fetchMyMenu = async () => {
    const { data, error } = await supabase
      .from("Food")
      .select("*")
      .eq("is_custom", true) // สมมติว่าใช้ column นี้ระบุว่าเป็นอาหารที่สร้างเอง
      .order('id', { ascending: false });
    
    if (!error) setMyFoods(data || []);
  };

  useEffect(() => {
    fetchMyMenu();
  }, []);

  // ฟังก์ชันปิด Modal และล้างค่า
  const closeModal = () => {
    setModalVisible(false);
    setEditingId(null);
    setNewName("");
    setNewCal("");
    setNewImage("");
  };

  // ฟังก์ชันเตรียมข้อมูลก่อนแก้ไข
  const handleEditPress = (item: any) => {
    setEditingId(item.id);
    setNewName(item.name);
    setNewCal(item.calories.toString());
    setNewImage(item.image_url || "");
    setModalVisible(true);
  };

  // ฟังก์ชันบันทึกข้อมูล (ทั้งเพิ่มและแก้ไข)
  const handleSaveFood = async () => {
    if (!newName || !newCal) {
      Alert.alert("ข้อมูลไม่ครบ", "กรุณากรอกชื่ออาหารและแคลอรี่ให้ครบถ้วนจ้า");
      return;
    }

    const foodData = {
      name: newName,
      calories: parseInt(newCal),
      image_url: newImage,
      is_custom: true,
      is_favorite: false,
    };

    let error;
    if (editingId) {
      // กรณีแก้ไข
      const { error: updateError } = await supabase
        .from("Food")
        .update(foodData)
        .eq("id", editingId);
      error = updateError;
    } else {
      // กรณีเพิ่มใหม่
      const { error: insertError } = await supabase.from("Food").insert([foodData]);
      error = insertError;
    }

    if (!error) {
      closeModal();
      fetchMyMenu(); // โหลดข้อมูลใหม่
    } else {
      Alert.alert("เกิดข้อผิดพลาด", editingId ? "ไม่สามารถแก้ไขเมนูได้" : "ไม่สามารถเพิ่มเมนูได้");
    }
  };

  // ฟังก์ชันลบเมนู
  const handleDeleteFood = (id: number) => {
    Alert.alert("ยืนยันการลบ", "คุณแน่ใจหรือไม่ว่าต้องการลบเมนูนี้ออกจากรายการของฉัน?", [
      { text: "ยกเลิก", style: "cancel" },
      { 
        text: "ลบ", 
        style: "destructive", 
        onPress: async () => {
          const { error } = await supabase.from("Food").delete().eq("id", id);
          if (!error) {
            setMyFoods(prev => prev.filter(food => food.id !== id));
          } else {
            Alert.alert("เกิดข้อผิดพลาด", "ไม่สามารถลบเมนูได้ในขณะนี้");
          }
        }
      }
    ]);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>รายการของฉัน</Text>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Ionicons name="add-circle" size={28} color="#fff" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={myFoods}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <FoodListItem 
            item={item} 
            onPress={() => router.push({ pathname: "/food-detail", params: { id: item.id } })} 
            onDelete={handleDeleteFood}
            onEdit={handleEditPress}
          />
        )}
        ListEmptyComponent={
          <View style={styles.center}>
            <Ionicons name="restaurant-outline" size={60} color="#eee" />
            <Text style={styles.emptyText}>ยังไม่มีเมนูที่คุณเพิ่มเองเลย</Text>
            <TouchableOpacity style={styles.addBtnEmpty} onPress={() => setModalVisible(true)}>
                <Text style={styles.addBtnText}>เพิ่มเมนูแรกเลย!</Text>
            </TouchableOpacity>
          </View>
        }
      />

      {/* Modal สำหรับเพิ่มเมนูใหม่ */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{editingId ? "แก้ไขเมนู" : "เพิ่มเมนูใหม่"}</Text>
            
            <TextInput 
              style={styles.input} 
              placeholder="ชื่ออาหาร (เช่น ราดหน้า)" 
              value={newName}
              onChangeText={setNewName}
            />
            
            <TextInput 
              style={styles.input} 
              placeholder="จำนวนแคลอรี่ (kcal)" 
              keyboardType="numeric"
              value={newCal}
              onChangeText={setNewCal}
            />

            <TextInput 
              style={styles.input} 
              placeholder="URL รูปภาพอาหาร" 
              value={newImage}
              onChangeText={setNewImage}
            />

            <View style={styles.modalButtons}>
              <TouchableOpacity style={[styles.btn, styles.btnCancel]} onPress={closeModal}>
                <Text style={styles.btnTextCancel}>ยกเลิก</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.btn, styles.btnSave]} onPress={handleSaveFood}>
                <Text style={styles.btnTextSave}>{editingId ? "ตกลง" : "บันทึกเมนู"}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: { backgroundColor: "#f472a0", height: 100, flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 15, paddingTop: 40 },
  headerTitle: { color: "#fff", fontSize: 20, fontWeight: "bold" },
  center: { flex: 1, justifyContent: "center", alignItems: "center", marginTop: 100 },
  emptyText: { color: "#ccc", marginTop: 10, fontSize: 16 },
  addBtnEmpty: { marginTop: 20, backgroundColor: '#f472a0', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 20 },
  addBtnText: { color: '#fff', fontWeight: 'bold' },
  
  // Modal Styles
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' },
  modalContent: { backgroundColor: '#fff', width: '85%', padding: 25, borderRadius: 25, elevation: 10 },
  modalTitle: { fontSize: 20, fontWeight: 'bold', color: '#f472a0', marginBottom: 20, textAlign: 'center' },
  input: { borderBottomWidth: 1, borderBottomColor: '#eee', paddingVertical: 10, marginBottom: 20, fontSize: 16 },
  modalButtons: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 },
  btn: { flex: 1, paddingVertical: 12, borderRadius: 15, alignItems: 'center', marginHorizontal: 5 },
  btnCancel: { backgroundColor: '#f5f5f5' },
  btnSave: { backgroundColor: '#f472a0' },
  btnTextCancel: { color: '#999', fontWeight: 'bold' },
  btnTextSave: { color: '#fff', fontWeight: 'bold' }
});