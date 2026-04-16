// เเถบบน โลโก้ ปฏิทิน
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // ใช้ Icon Library

export const Header = ({ onOpenMenu }: { onOpenMenu?: () => void }) => {
  return (
    <View style={styles.header}>
      {/* 1. ปุ่มเมนูด้านซ้าย */}
      {onOpenMenu && (
        <TouchableOpacity onPress={onOpenMenu} style={styles.menuBtn}>
          <Ionicons name="menu" size={30} color="#fff" />
        </TouchableOpacity>
      )}

      {/* 2. ชื่อแอปอยู่ตรงกลาง */}
      <Text style={styles.headerTitle}>CAL-CAL</Text>
      
      {/* 3. ไอคอนปฏิทินทางขวา */}
      <TouchableOpacity style={styles.calendarBtn}>
        <Ionicons name="calendar-outline" size={26} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 60,
    backgroundColor: '#f472a0', // สีชมพูหลัก
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 15,
  },
  menuBtn: { position: 'absolute', left: 15 },
  headerTitle: { color: '#fff', fontSize: 22, fontWeight: 'bold' },
  calendarBtn: { position: 'absolute', right: 15 }, // จัดไอคอนไว้ริมขวา
});