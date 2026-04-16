//เทนูด้านข้าง
// component/home/Header.tsx
import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export const Sidebar = ({ visible, onClose }: { visible: boolean; onClose: () => void }) => {
  const menuItems = [
    { label: "โปรไฟล์ของฉัน", path: "/profile" }, // กำหนด Path หลอกไว้ก่อน
    { label: "อาหารของฉัน", path: "/my-foods" },
    { label: "ออกกำลังกาย", path: "/exercises" },
    { label: "ตั้งค่า", path: "/settings" }
  ];

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        {/* ส่วนเมนูหลัก */}
        <View style={styles.sidebarContainer}>
          
          {/* 1. ปุ่มกากบาทปิดเมนู */}
          <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
            <Ionicons name="close" size={30} color="#fff" />
          </TouchableOpacity>

          {/* 2. ช่องสี่เหลี่ยมสีขาวไว้ใส่รูป + รายการเมนู */}
          {menuItems.map((item, index) => (
            <TouchableOpacity key={index} style={styles.menuItem}>
              {/* ช่องสี่เหลี่ยมสีขาว */}
              <View style={styles.iconPlaceholder} />
              <Text style={styles.menuText}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* ส่วนพื้นหลังที่เหลือ (แตะเพื่อปิด) */}
        <TouchableOpacity style={styles.flexArea} onPress={onClose} />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: { flex: 1, flexDirection: 'row' },
  sidebarContainer: { width: '70%', backgroundColor: '#f472a0', padding: 20, paddingTop: 50 },
  flexArea: { width: '30%' }, // พื้นหลังโปร่งใสฝั่งขวา
  closeBtn: { alignSelf: 'flex-start', marginBottom: 30 },
  menuItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 25 },
  iconPlaceholder: { width: 45, height: 45, backgroundColor: '#fff', borderRadius: 10, marginRight: 15 },
  menuText: { color: '#fff', fontSize: 18, fontWeight: 'bold' }
});