//วงกลมสัดส่วนอาหาร

// component/home/Header.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export const Header = ({ onOpenMenu, onOpenCalendar }: any) => (
  <View style={styles.header}>
    <TouchableOpacity onPress={onOpenMenu}>
      <Ionicons name="menu" size={28} color="#fff" />
    </TouchableOpacity>
    
    <Text style={styles.title}>CAL-CAL</Text>
    
    <TouchableOpacity onPress={onOpenCalendar}>
      <Ionicons name="calendar-outline" size={26} color="#fff" />
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  header: {
    height: 60,
    backgroundColor: '#f472a0',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  title: { color: '#fff', fontSize: 20, fontWeight: 'bold' }
});