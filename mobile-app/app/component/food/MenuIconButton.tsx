import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface MenuIconButtonProps {
  label: string;
  icon: string;
  onPress?: () => void;
}

export const MenuIconButton = ({ label, icon, onPress }: MenuIconButtonProps) => (
  <TouchableOpacity style={styles.iconBtn} onPress={onPress}>
    <View style={styles.iconBox}>
      <Ionicons name={icon as any} size={24} color="#f472a0" />
    </View>
    <Text style={styles.iconLabel}>{label}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  iconBtn: { alignItems: "center" },
  iconBox: { 
    width: 50, 
    height: 50, 
    backgroundColor: "#fff", 
    elevation: 2, 
    borderRadius: 10, 
    justifyContent: "center", 
    alignItems: "center", 
    marginBottom: 5 
  },
  iconLabel: { fontSize: 12, color: "#666" },
});