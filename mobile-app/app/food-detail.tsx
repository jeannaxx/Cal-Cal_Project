import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Modal } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function FoodDetailScreen() {
  const router = useRouter();
  const [amount, setAmount] = useState("1");
  const [showError, setShowError] = useState(false);
  const baseCal = 260; // สมมติค่าจาก Supabase

  const handleSave = () => {
    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      setShowError(true); // โชว์ Pop-up "จำนวนไม่ถูกต้อง"
    } else {
      alert("บันทึกสำเร็จ!");
      router.replace("/(tabs)");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}><Ionicons name="arrow-back" size={24} color="#fff" /></TouchableOpacity>
        <Text style={styles.headerTitle}>ข้าวสวย 100 กรัม</Text>
        <Ionicons name="star" size={24} color="#ff9f43" />
      </View>

      <View style={styles.card}>
        <View style={styles.calBox}>
           <Text style={styles.calValue}>{baseCal * (Number(amount) || 0)}</Text>
           <Text style={styles.calUnit}>Kcal</Text>
        </View>
        <TextInput 
          style={styles.amountInput}
          value={amount}
          onChangeText={setAmount}
          keyboardType="numeric"
        />
      </View>

      <View style={styles.btnRow}>
         <TouchableOpacity style={[styles.btn, {backgroundColor: '#f4a4bc'}]}><Text style={styles.btnText}>บันทึก/ค้นหาต่อ</Text></TouchableOpacity>
         <TouchableOpacity style={[styles.btn, {backgroundColor: '#a8e6cf'}]} onPress={handleSave}><Text style={styles.btnText}>บันทึกลงไดอารี่</Text></TouchableOpacity>
      </View>

      {/* Modal แจ้งเตือนจำนวนไม่ถูกต้อง */}
      <Modal visible={showError} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>จำนวนไม่ถูกต้อง</Text>
            <TouchableOpacity style={styles.btnModal} onPress={() => setShowError(false)}>
              <Text style={{fontWeight: 'bold'}}>ปิด</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff5f7" },
  header: { backgroundColor: "#f472a0", height: 100, flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 15, paddingTop: 40 },
  headerTitle: { color: "#fff", fontSize: 18, fontWeight: "bold" },
  card: { backgroundColor: "#fff", margin: 25, borderRadius: 20, padding: 30, flexDirection: "row", alignItems: "center", elevation: 3 },
  calBox: { flex: 1, borderRightWidth: 1, borderRightColor: "#eee", alignItems: "center" },
  calValue: { fontSize: 32, fontWeight: "bold", color: "#666" },
  calUnit: { color: "#999" },
  amountInput: { flex: 1, fontSize: 40, textAlign: "center", fontWeight: "bold" },
  btnRow: { flexDirection: "row", justifyContent: "center", gap: 10 },
  btn: { paddingHorizontal: 20, paddingVertical: 10, borderRadius: 20 },
  btnText: { fontWeight: "bold", fontSize: 12 },
  sectionTitle: { textAlign: "center", marginTop: 40, color: "#666" },
  activityRow: { flexDirection: "row", justifyContent: "space-around", marginTop: 20 },
  actItem: { alignItems: "center" },
  actCircle: { width: 50, height: 50, borderRadius: 25, backgroundColor: "#fff", elevation: 2, justifyContent: "center", alignItems: "center", marginBottom: 5 },
  actText: { fontSize: 10, color: "#ccc" },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.2)', justifyContent: 'center', alignItems: 'center' },
  modalContent: { backgroundColor: '#fff', padding: 40, borderRadius: 20, alignItems: 'center' },
  modalText: { fontSize: 20, marginBottom: 20 },
  btnModal: { backgroundColor: '#a8e6cf', paddingHorizontal: 30, paddingVertical: 10, borderRadius: 15 }
});