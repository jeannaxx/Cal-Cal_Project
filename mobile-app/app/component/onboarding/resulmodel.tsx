import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Modal } from "react-native";
import { useRouter } from "expo-router"; //

interface ResultModalProps {
  visible: boolean;
  onClose: () => void; // ฟังก์ชันนี้จะมาจากหน้า Summary เพื่อปิด Modal
  suggestedCal: number;
}

const ResultModal = ({ visible, onClose, suggestedCal }: ResultModalProps) => {
  // 1. ย้ายมาไว้ภายในฟังก์ชัน Component
  const router = useRouter(); 

  const handlePressOK = () => {
    onClose(); // สั่งปิด Modal ผ่าน Props
    // 2. สั่งเปลี่ยนหน้าไปยังหน้า Home Page (ใน (tabs))
    router.replace("/(tabs)"); //
  };

  return (
    <Modal animationType="fade" transparent={true} visible={visible}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>ปริมาณแคลอรี่ที่ควรบริโภค</Text>
          <Text style={styles.modalDetail}>
            ปริมาณ {suggestedCal} แคลอรี่ต่อวัน {"\n"}
            คำนวณตามเป้าหมายที่คุณเลือกไว้ค่ะ
          </Text>
          
         <View style={styles.modalButtonRow}>
            <TouchableOpacity style={styles.btnCancel} onPress={onClose}>
              <Text style={styles.btnCancelText}>ยกเลิก</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnOk} onPress={handlePressOK}> 
              <Text style={styles.btnOkText}>โอเค</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ResultModal;

// สไตล์ (ส่วนนี้คุณมีอยู่แล้ว ปรับแก้ตามความสวยงาม)
const styles = StyleSheet.create({
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' },
  modalContent: { backgroundColor: '#fff', width: '80%', padding: 30, borderRadius: 25, alignItems: 'center' },
  modalTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 15, color: '#f472a0' },
  modalDetail: { textAlign: 'center', fontSize: 14, color: '#666', marginBottom: 25 },
  modalButtonRow: {
    flexDirection: 'row',
    gap: 12,
  },
  btnOk: {
    backgroundColor: '#a8e6cf',
    paddingHorizontal: 40,
    paddingVertical: 12,
    borderRadius: 15,
  },
  btnOkText: {
    color: '#444',
    fontWeight: 'bold',
  },
  btnCancel: {
    backgroundColor: '#ffaaa5',
    paddingHorizontal: 35,
    paddingVertical: 12,
    borderRadius: 15,
  },
  btnCancelText: {
    color: '#444',
    fontWeight: 'bold',
  },
});