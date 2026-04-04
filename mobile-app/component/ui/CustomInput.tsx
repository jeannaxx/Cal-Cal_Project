import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';

interface CustomButtonProps {
  title: string;
  onPress: () => void;
  isLoading?: boolean; // เพิ่มไว้สำหรับตอนกดแล้วให้หมุน Loading
}

export const CustomButton = ({ title, onPress, isLoading = false }: CustomButtonProps) => {
  return (
    <TouchableOpacity 
      style={styles.button} 
      onPress={onPress}
      disabled={isLoading} // ป้องกันการกดซ้ำตอนกำลังบันทึกข้อมูล
      activeOpacity={0.8}
    >
      {isLoading ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <Text style={styles.buttonText}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#FF8FB1', // สีชมพูตามดีไซน์
    paddingVertical: 14,
    borderRadius: 25,           // ทำขอบให้โค้ดมนสวย
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
    width: '80%',               // ปรับความกว้างตามความเหมาะสม
    alignSelf: 'center',        // จัดให้อยู่กลางหน้าจอ
    // เพิ่มเงาให้ปุ่มดูมีมิติ
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  buttonText: {
    color: '#FFFFFF',           // ตัวหนังสือสีขาว
    fontSize: 18,
    fontWeight: '600',
  },
});